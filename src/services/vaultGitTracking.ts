import type { App } from 'obsidian';
import { Notice } from 'obsidian';

export type VaultGitTrackingMode = 'off' | 'remind' | 'commit-local';

const COMMIT_COMMAND = 'obsidian-git:commit';
const COMMIT_PUSH_COMMAND = 'obsidian-git:commit-push';

const REMINDER =
    'Vault files changed. Commit them locally with Obsidian Git. Remote push stays off unless you enable it in Perplexed settings.';

function hasCommand(app: App, id: string): boolean {
    return app.commands.listCommands().some(command => command.id === id);
}

/**
 * After a vault write, remind the user to commit locally, or ask Obsidian Git
 * to commit. Remote push runs only when alsoPush is on, and only together
 * with a local commit.
 */
export function trackVaultChanges(
    app: App,
    mode: VaultGitTrackingMode,
    alsoPush: boolean,
): void {
    if (mode === 'off') return;

    if (mode === 'commit-local') {
        const commandId = alsoPush ? COMMIT_PUSH_COMMAND : COMMIT_COMMAND;
        if (hasCommand(app, commandId) && app.commands.executeCommandById(commandId)) {
            const where = alsoPush ? 'locally and push them' : 'locally';
            new Notice(`Asked Obsidian Git to commit vault changes ${where}.`);
            return;
        }
        new Notice(`Obsidian Git is not available, so Perplexed could not commit. ${REMINDER}`);
        return;
    }

    new Notice(REMINDER);
}
