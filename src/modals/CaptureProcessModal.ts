import type { App } from 'obsidian';
import { Modal, Notice } from 'obsidian';

export class CaptureProcessModal extends Modal {
    private description: string;
    private onSubmit: (description: string) => void;

    constructor(app: App, onSubmit: (description: string) => void) {
        super(app);
        this.description = '';
        this.onSubmit = onSubmit;
    }

    onOpen(): void {
        const { contentEl, modalEl } = this;
        modalEl.addClass('capture-process-modal');
        contentEl.empty();

        const header = contentEl.createDiv({ cls: 'capture-process-modal__header' });
        header.createEl('h2', { text: 'Capture a stored workflow' });
        header.createEl('p', {
            text: 'Describe a checking, editing, or modification process. Perplexed will save it as a new workflow file. Existing workflow files are left unchanged.',
        });

        const section = contentEl.createDiv({ cls: 'capture-process-modal__section' });
        section.createEl('label', {
            text: 'Process',
            attr: { for: 'capture-process-description' },
        });
        const textarea = section.createEl('textarea', {
            attr: {
                id: 'capture-process-description',
                rows: '10',
                placeholder: 'Describe the checking, editing, or modification process…',
            },
        });
        textarea.addEventListener('input', () => {
            this.description = textarea.value;
        });
        textarea.addEventListener('keydown', (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                event.preventDefault();
                this.submit();
            }
        });

        const footer = contentEl.createDiv({ cls: 'capture-process-modal__footer' });
        const cancelBtn = footer.createEl('button', { text: 'Cancel' });
        cancelBtn.addEventListener('click', () => this.close());
        const saveBtn = footer.createEl('button', { text: 'Save workflow', cls: 'mod-cta' });
        saveBtn.addEventListener('click', () => this.submit());

        window.setTimeout(() => textarea.focus(), 50);
    }

    private submit(): void {
        const trimmed = this.description.trim();
        if (!trimmed) {
            new Notice('Describe the process to store.');
            return;
        }
        const description = trimmed;
        this.close();
        this.onSubmit(description);
    }

    onClose(): void {
        this.contentEl.empty();
    }
}
