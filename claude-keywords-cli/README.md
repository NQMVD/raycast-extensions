# Claude Keywords CLI

A standalone CLI tool that replicates the functionality of the Raycast Claude Keywords Chooser extension, built with the `huh` library from Charm CLI for interactive forms.

## Features

- **Interactive Forms**: Select multiple Claude AI keywords through an intuitive multi-select interface
- **Custom Prompts**: Add your own base prompt before appending keywords
- **Multiple Actions**: Copy to clipboard or print to stdout
- **Fast & Simple**: Streamlined CLI experience optimized for speed

## Installation

1. Clone or download this tool
2. Install dependencies:
   ```bash
   go mod tidy
   ```
3. Build the executable:
   ```bash
   go build -o claude-keywords .
   ```
4. Optionally, move to your PATH:
   ```bash
   mv claude-keywords /usr/local/bin/
   ```

## Usage

Simply run the tool:

```bash
./claude-keywords
```

The interactive form will guide you through multiple steps:

1. **Custom Prompt**: Enter an optional base prompt
2. ** Thinking & Reasoning**: Choose one thinking mode (`think`, `think hard`, `ultrathink`) or skip
3. ** Tool Usage**: Select one tool behavior (parallel execution, tool chaining) or skip
4. ** Search**: Enable search capabilities or skip
5. ** Output Control**: Choose one response format (concise, detailed, code-only) or skip
6. ** Reasoning Modes**: Select multiple advanced reasoning approaches (step-by-step, multiple approaches, verification)
7. **Action**: Choose to copy to clipboard or print to stdout

## Keywords Available

The tool includes the same keywords as the original Raycast extension:

### Thinking & Reasoning
- Think (basic reasoning)
- Think Hard (enhanced reasoning)
- Ultrathink (maximum analysis)

### Tool Usage
- Parallel Tool Calls
- Web Search
- Tool Chaining

### Output Control
- Concise Output
- Detailed Output
- Code Only

### Reasoning Modes
- Step-by-Step Reasoning
- Multiple Approaches
- Verify Results

## Requirements

- Go 1.21 or later
- Terminal with color support (recommended)

## Dependencies

- `github.com/charmbracelet/huh` - Interactive forms
- `github.com/charmbracelet/lipgloss` - Terminal styling
- `github.com/atotto/clipboard` - Clipboard operations