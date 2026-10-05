import type { App, Editor } from 'obsidian';
import { normalizePath, Notice, parseYaml, TFile, TFolder } from 'obsidian';

import type { PerplexityService } from './perplexityService';

export type WorkflowKind = 'review' | 'capture';

export interface StoredWorkflow {
    file: TFile;
    title: string;
    description: string;
    kind: WorkflowKind;
    model: string;
    returnCitations: boolean;
    searchRecency: string;
    instruction: string;
}

function splitFrontmatter(text: string): { frontmatter: Record<string, unknown>; body: string } {
    const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    if (!match || match[1] === undefined) {
        return { frontmatter: {}, body: text };
    }
    let parsed: unknown;
    try {
        parsed = parseYaml(match[1]);
    } catch {
        parsed = {};
    }
    const frontmatter = parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)
        ? parsed as Record<string, unknown>
        : {};
    return { frontmatter, body: text.slice(match[0].length) };
}

function asString(value: unknown, fallback: string): string {
    if (typeof value === 'string' && value.trim().length > 0) return value.trim();
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    return fallback;
}

function asBoolean(value: unknown, fallback: boolean): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
        if (value === 'true') return true;
        if (value === 'false') return false;
    }
    return fallback;
}

export function parseWorkflow(file: TFile, raw: string): StoredWorkflow {
    const { frontmatter, body } = splitFrontmatter(raw);
    const kindRaw = asString(frontmatter['kind'], 'review');
    const kind: WorkflowKind = kindRaw === 'capture' ? 'capture' : 'review';
    const title = asString(frontmatter['title'], file.basename);
    return {
        file,
        title,
        description: asString(frontmatter['description'], title),
        kind,
        model: asString(frontmatter['model'], 'sonar-pro'),
        returnCitations: asBoolean(frontmatter['return-citations'], false),
        searchRecency: asString(frontmatter['search-recency'], ''),
        instruction: body.trim(),
    };
}

export function listWorkflowFiles(app: App, root: string): TFile[] {
    const folder = app.vault.getAbstractFileByPath(normalizePath(root));
    if (!(folder instanceof TFolder)) return [];
    return folder.children
        .filter((child): child is TFile => child instanceof TFile)
        .filter(file => file.extension === 'md' && file.basename !== 'README')
        .sort((a, b) => a.basename.localeCompare(b.basename));
}

export async function loadWorkflows(app: App, root: string): Promise<StoredWorkflow[]> {
    const files = listWorkflowFiles(app, root);
    const workflows: StoredWorkflow[] = [];
    for (const file of files) {
        const raw = await app.vault.read(file);
        workflows.push(parseWorkflow(file, raw));
    }
    return workflows;
}

export function noteBody(editor: Editor): string {
    return editor.getValue().replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').trim();
}

export function reviewSubject(editor: Editor): string {
    const selection = editor.getSelection();
    if (selection.trim().length > 0) {
        editor.setCursor(editor.getCursor('to'));
        return selection;
    }
    const body = noteBody(editor);
    if (body.length === 0) return '';
    const last = editor.lastLine();
    editor.setCursor({ line: last, ch: editor.getLine(last).length });
    return body;
}

export function buildReviewPrompt(workflow: StoredWorkflow, subject: string): string {
    return `${workflow.instruction}\n\n---\n\n${subject}`;
}

export function buildCapturePrompt(workflow: StoredWorkflow, processDescription: string): string {
    return `${workflow.instruction}\n\nThe process to store:\n\n${processDescription.trim()}`;
}

export function unwrapMarkdownFence(text: string): string {
    const trimmed = text.trim();
    const fenced = trimmed.match(/^```(?:markdown|md)?\s*\r?\n([\s\S]*?)\r?\n```$/);
    return fenced?.[1]?.trim() ?? trimmed;
}

export function slugFromTitle(title: string): string {
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80);
    return slug.length > 0 ? slug : 'stored-workflow';
}

export async function saveCapturedWorkflow(
    app: App,
    root: string,
    markdown: string,
): Promise<string> {
    const unwrapped = unwrapMarkdownFence(markdown);
    const { frontmatter } = splitFrontmatter(unwrapped);
    const title = asString(frontmatter['title'], 'stored-workflow');
    const base = slugFromTitle(title);
    const normalizedRoot = normalizePath(root);
    await ensureWorkflowFolder(app, normalizedRoot);

    let filename = `${base}.md`;
    let suffix = 2;
    while (app.vault.getAbstractFileByPath(`${normalizedRoot}/${filename}`)) {
        filename = `${base}-${suffix.toString()}.md`;
        suffix++;
    }
    const path = `${normalizedRoot}/${filename}`;
    await app.vault.create(path, unwrapped.endsWith('\n') ? unwrapped : `${unwrapped}\n`);
    return path;
}

async function ensureWorkflowFolder(app: App, folderPath: string): Promise<void> {
    const segments = folderPath.split('/').filter(segment => segment.length > 0);
    let cursor = '';
    for (const segment of segments) {
        cursor = cursor ? `${cursor}/${segment}` : segment;
        if (app.vault.getAbstractFileByPath(cursor)) continue;
        try {
            await app.vault.createFolder(cursor);
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            if (!/already exists/i.test(msg)) throw err;
        }
    }
}

export async function runReviewWorkflow(
    editor: Editor,
    perplexityService: PerplexityService,
    workflow: StoredWorkflow,
    subject: string,
): Promise<boolean> {
    const prompt = buildReviewPrompt(workflow, subject);
    return perplexityService.queryPerplexity(
        prompt,
        workflow.model,
        true,
        editor,
        {
            return_citations: workflow.returnCitations,
            return_images: false,
            return_related_questions: false,
            search_recency_filter: workflow.searchRecency,
        },
    );
}

export async function captureProcessAsWorkflow(
    app: App,
    perplexityService: PerplexityService,
    workflowsRoot: string,
    workflow: StoredWorkflow,
    processDescription: string,
): Promise<string> {
    const loading = new Notice('Turning that process into a stored workflow…', 0);
    try {
        const raw = await perplexityService.completePerplexity(
            buildCapturePrompt(workflow, processDescription),
            workflow.model,
            {
                return_citations: false,
                return_images: false,
                return_related_questions: false,
                search_recency_filter: '',
            },
        );
        const path = await saveCapturedWorkflow(app, workflowsRoot, raw);
        new Notice(`Saved stored workflow to ${path}`);
        return path;
    } finally {
        loading.hide();
    }
}
