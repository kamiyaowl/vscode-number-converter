import * as assert from 'assert';
import { before } from 'mocha';

import * as vscode from 'vscode';
import * as parse from '../../parse';

suite('Extension Test Suite', () => {
	before(() => {
		vscode.window.showInformationMessage('Start all tests.');
	});

	test('parse 0', () => {
		const inputs = ["0", "0x0", "0b0", "0x0000"];
		const expect = {
			origin: 0,
			hex: 0x0,
			bin: 0x0,
		};
		inputs.forEach(x => {
			const dst = parse.parse(x)
			assert.equal(expect, dst[0]);
		});
	});
});
