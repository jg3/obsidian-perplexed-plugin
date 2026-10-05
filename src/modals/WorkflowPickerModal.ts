import type { App } from 'obsidian';
import { FuzzySuggestModal } from 'obsidian';

import type { StoredWorkflow } from '../services/workflowService';

export class WorkflowPickerModal extends FuzzySuggestModal<StoredWorkflow> {
    private items: StoredWorkflow[];
    private callback: (chosen: StoredWorkflow) => void;

    constructor(
        app: App,
        items: StoredWorkflow[],
        callback: (chosen: StoredWorkflow) => void,
    ) {
        super(app);
        this.items = items;
        this.callback = callback;
        this.setPlaceholder('Pick a stored workflow…');
    }

    getItems(): StoredWorkflow[] {
        return this.items;
    }

    getItemText(item: StoredWorkflow): string {
        return `${item.title} — ${item.description}`;
    }

    onChooseItem(item: StoredWorkflow): void {
        this.callback(item);
    }
}
