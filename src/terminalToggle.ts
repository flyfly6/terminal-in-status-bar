export const SHOW_TERMINAL_COMMAND = "workbench.action.terminal.focus";
export const HIDE_PANEL_COMMAND = "workbench.action.closePanel";

export type CommandExecutor = (command: string) => Thenable<unknown>;

/**
 * Shows the integrated terminal on one click and hides it on the next.
 *
 * VS Code's `workbench.action.terminal.toggleTerminal` only hides the terminal
 * when it has focus, and clicking a status bar item takes focus away from the
 * terminal before the command runs, so that command would always show it.
 * Extensions cannot query whether the terminal is visible, so this remembers
 * what the previous click did instead.
 */
export class TerminalToggle {
  private shown = false;

  constructor(private readonly execute: CommandExecutor) {}

  async toggle(): Promise<void> {
    const command = this.shown ? HIDE_PANEL_COMMAND : SHOW_TERMINAL_COMMAND;
    this.shown = !this.shown;
    await this.execute(command);
  }

  /** Records that the terminal was hidden by something other than this toggle. */
  markHidden(): void {
    this.shown = false;
  }
}
