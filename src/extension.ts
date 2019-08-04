import * as vscode from 'vscode';
import * as parse from './parse';

function showResult(src: string) {
	const dst = parse.parse(src as string);
	dst.forEach(d => {
		vscode.window.showInformationMessage(`${d.origin} | ${d.hex} | ${d.bin}`);
	});
	// console.log(dst);
}
export function activate(context: vscode.ExtensionContext) {
	const commands = [
		vscode.commands.registerCommand('extension.convert-from-input', () => {
			vscode.window.showInputBox({
				placeHolder: "e.g. 256, 0xff00abcd, 0b10101100...",
			}).then(data => {
				if (typeof data === 'string') {
					showResult(data);
				} else {
					vscode.window.showErrorMessage(`invalid data: ${data}`);
				}
			});
		}),
		vscode.commands.registerCommand('extension.convert', () => {
			const editor = vscode.window.activeTextEditor;
			if(editor) {
				const selections = 
					editor.selections
						  .map(s => editor.document.getText(new vscode.Range(s.start, s.end)))
						  .reverse() // 上から処理しているのにNotifyが逆順になるため
						  .join(' ');
				if (selections) {
					// 選択範囲がある場合はそちらを優先
					showResult(selections);
				} else {
					// なければ現在の行
					const pos = editor.selection.active;
					const textLine = editor.document.lineAt(pos.line);
					showResult(textLine.text);
				}
			}
		}),
	];

	commands.forEach(c => {
		context.subscriptions.push(c);
	});
}

export function deactivate() {}
