import * as vscode from 'vscode';
import * as parse from './parse';

export function activate(context: vscode.ExtensionContext) {
	const commands = [
		vscode.commands.registerCommand('extension.convert-from-input', () => {
			vscode.window.showInputBox({
				placeHolder: "e.g. 256, 0xff00abcd, 0b10101100...",
			}).then(data => {
				if (typeof data === 'string') {
					const dst = parse.parse(data as string);
					dst.forEach(d => {
						vscode.window.showInformationMessage(`${d.origin} | ${d.hex} | ${d.bin}`);
					});
					// console.log(dst);
				} else {
					vscode.window.showErrorMessage(`invalid data: ${data}`);
				}
			});
			vscode.window.showInformationMessage('Convert!');
		}),
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
