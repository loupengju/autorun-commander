import * as vscode from 'vscode';
import { CodeLensProvider } from './CodeLensProvider';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "autorun-commander" is now active!');

	const codeLensProvider = new CodeLensProvider();
	const disposable = vscode.languages.registerCodeLensProvider({ language: 'commander' }, codeLensProvider);

	const runCommand = vscode.commands.registerCommand('autorun-commander.runCommand', (command: string) => {
		const terminal = vscode.window.createTerminal("Commander");
		terminal.sendText(command);
		terminal.show();
	});

	context.subscriptions.push(disposable, runCommand);
}

export function deactivate() {}
