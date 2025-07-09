import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import { CodeLensProvider } from '../CodeLensProvider';

suite('Extension Test Suite', () => {
    let sandbox: sinon.SinonSandbox;

    setup(() => {
        sandbox = sinon.createSandbox();
    });

    teardown(() => {
        sandbox.restore();
    });

    test('CodeLensProvider should provide CodeLenses for .commander files', async () => {
        const document = await vscode.workspace.openTextDocument({
            language: 'commander',
            content: 'echo "Hello, World!"\nls -la'
        });

        const codeLensProvider = new CodeLensProvider();
        const codeLenses = await codeLensProvider.provideCodeLenses(document, new vscode.CancellationTokenSource().token);

        assert.ok(codeLenses, "CodeLenses should not be null");
        assert.strictEqual(codeLenses.length, 2);

        const firstCodeLens = codeLenses[0];
        if (firstCodeLens && firstCodeLens.command) {
            assert.strictEqual(firstCodeLens.command.title, 'Run');
            assert.strictEqual(firstCodeLens.command.command, 'autorun-commander.runCommand');
            assert.deepStrictEqual(firstCodeLens.command.arguments, ['echo "Hello, World!"']);
        } else {
            assert.fail("First CodeLens or its command is not defined");
        }

        const secondCodeLens = codeLenses[1];
        if (secondCodeLens && secondCodeLens.command) {
            assert.strictEqual(secondCodeLens.command.title, 'Run');
            assert.strictEqual(secondCodeLens.command.command, 'autorun-commander.runCommand');
            assert.deepStrictEqual(secondCodeLens.command.arguments, ['ls -la']);
        } else {
            assert.fail("Second CodeLens or its command is not defined");
        }
    });

    test('runCommand should execute the command in a terminal', async () => {
        const sendTextStub = sandbox.stub();
        const showStub = sandbox.stub();
        const createTerminalStub = sandbox.stub(vscode.window, 'createTerminal').returns({
            sendText: sendTextStub,
            show: showStub,
            dispose: () => {}
        } as any);

        const command = 'echo "Test command"';
        await vscode.commands.executeCommand('autorun-commander.runCommand', command);

        assert.ok(createTerminalStub.calledOnce, "createTerminal should be called once");
        assert.strictEqual(createTerminalStub.getCall(0).args[0], 'Commander');
        assert.ok(sendTextStub.calledOnceWith(command));
        assert.ok(showStub.calledOnce);
    });
});