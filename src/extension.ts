import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "number-converter" is now active!');

	const commands = [
		vscode.commands.registerCommand('extension.convert', () => {
			vscode.window.showInformationMessage('Convert!');
		}),
		vscode.commands.registerCommand('extension.increment', () => {
			vscode.window.showInformationMessage('Increment!');
		}),
		vscode.commands.registerCommand('extension.decrement', () => {
			vscode.window.showInformationMessage('Decrement!');
		}),
	];

	commands.forEach(c => {
		context.subscriptions.push(c);
	});
}

export function deactivate() {}
