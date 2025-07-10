# autorun-commander README

"autorun-commander" is a VS Code extension designed to automatically run command-line scripts. It provides convenient run buttons via CodeLens, helping developers quickly execute commands.

![72373893-a270-458a-bd36-5ad321eae756](https://github.com/user-attachments/assets/75da799b-917b-4abb-8e18-935a4f0ed6f2)

## Features

- Directly run commands in files with the .commander suffix
- Automatically opens the terminal and executes commands
- Supports custom configuration to enable/disable CodeLens

## Requirements

- VS Code version >= 1.70.0
- File language type must be set to `commander`

## Extension Settings

This extension offers the following settings:

* `autorun-commander.enableCodeLens`: Enable/disable CodeLens feature, default value is `true`.

## Known Issues

- Currently only supports running single-line commands
- Does not support complex multi-line scripts

## Release Notes

### 0.0.3
- Add Change Log
- Updated README with more detailed information

### 0.0.2

- Updated logo and description.

### 0.0.1

- Initial version released.
- Added CodeLens support.
- Implemented command execution functionality.