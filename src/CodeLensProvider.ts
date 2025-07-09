import * as vscode from 'vscode';

export class CodeLensProvider implements vscode.CodeLensProvider {
    private _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
    public readonly onDidChangeCodeLenses: vscode.Event<void> = this._onDidChangeCodeLenses.event;

    constructor() {
        vscode.workspace.onDidChangeTextDocument(e => {
            if (e.document.languageId === 'commander') {
                this._onDidChangeCodeLenses.fire();
            }
        });
    }

    public provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {
        const codeLenses: vscode.CodeLens[] = [];
        if (vscode.workspace.getConfiguration("autorun-commander").get("enableCodeLens", true)) {
            const lines = document.getText().split('\n');
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                if (line.trim().length > 0) {
                    const range = new vscode.Range(i, 0, i, line.length);
                    const command: vscode.Command = {
                        command: 'autorun-commander.runCommand',
                        title: 'Run',
                        arguments: [line.trim()]
                    };
                    codeLenses.push(new vscode.CodeLens(range, command));
                }
            }
        }
        return codeLenses;
    }
}
