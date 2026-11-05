# terminal-in-status-bar

## Features

Show a terminal icon in status bar. Click it to show and focus the integrated terminal, and click it again to hide the panel.

VS Code does not let extensions check whether the terminal is visible, so the button remembers what its previous click did. If you show or hide the terminal another way (for example with `` Ctrl+` `` or `Ctrl+J`), the next click may have no visible effect; click once more.

## Extension Settings

- `terminal-in-status-bar.statusBarAlignment`: Status bar alignment, left or right.
- `terminal-in-status-bar.statusBarPriority`: Status bar priority. Higher means more to the left.
- `terminal-in-status-bar.statusBarLabel`: If a label should be shown in the status bar next to the icon.
