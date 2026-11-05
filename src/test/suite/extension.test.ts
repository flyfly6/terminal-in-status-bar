import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import {
	HIDE_PANEL_COMMAND,
	SHOW_TERMINAL_COMMAND,
	TerminalToggle,
} from '../../terminalToggle';

function recordingToggle(): { toggle: TerminalToggle; executed: string[] } {
	const executed: string[] = [];
	const toggle = new TerminalToggle(async (command) => {
		executed.push(command);
	});
	return { toggle, executed };
}

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('first click shows the terminal', async () => {
		const { toggle, executed } = recordingToggle();
		await toggle.toggle();
		assert.deepStrictEqual(executed, [SHOW_TERMINAL_COMMAND]);
	});

	test('clicks alternate between showing and hiding', async () => {
		const { toggle, executed } = recordingToggle();
		await toggle.toggle();
		await toggle.toggle();
		await toggle.toggle();
		assert.deepStrictEqual(executed, [
			SHOW_TERMINAL_COMMAND,
			HIDE_PANEL_COMMAND,
			SHOW_TERMINAL_COMMAND,
		]);
	});

	test('rapid clicks alternate without waiting for the previous command', async () => {
		const { toggle, executed } = recordingToggle();
		await Promise.all([toggle.toggle(), toggle.toggle()]);
		assert.deepStrictEqual(executed, [SHOW_TERMINAL_COMMAND, HIDE_PANEL_COMMAND]);
	});

	test('after the terminal is hidden elsewhere, the next click shows it', async () => {
		const { toggle, executed } = recordingToggle();
		await toggle.toggle();
		toggle.markHidden();
		await toggle.toggle();
		assert.deepStrictEqual(executed, [SHOW_TERMINAL_COMMAND, SHOW_TERMINAL_COMMAND]);
	});

	test('the status bar command is registered', async () => {
		const commands = await vscode.commands.getCommands(true);
		assert.ok(commands.includes('terminal-in-status-bar.toggle'));
	});
});
