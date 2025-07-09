# autorun-commander README

"autorun-commander" 是一个 VS Code 扩展，用于自动运行命令行脚本。它通过 CodeLens 提供便捷的运行按钮，帮助开发者快速执行命令。

## Features

- 在支持的文件类型中显示 CodeLens 按钮，直接运行命令。
- 自动打开终端并执行命令。
- 支持自定义配置以启用或禁用 CodeLens。

## Requirements

- VS Code 版本 >= 1.70.0
- 文件语言类型需设置为 `commander`

## Extension Settings

此扩展提供以下设置：

* `autorun-commander.enableCodeLens`: 启用/禁用 CodeLens 功能，默认值为 `true`。

## Known Issues

- 目前仅支持单行命令的运行。
- 不支持复杂的多行脚本。

## Release Notes

### 1.0.0

- 初始版本发布。
- 添加 CodeLens 支持。
- 支持运行命令功能。
