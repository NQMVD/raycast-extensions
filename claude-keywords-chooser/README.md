# Claude Keywords Chooser

A Raycast extension that helps you select and append Claude AI special keywords and modifiers to your prompts for enhanced AI interactions.

## Overview

Claude AI offers various special keywords and modifiers that can significantly improve the quality and control of AI responses. This extension provides an intuitive interface to select these keywords and automatically append them to your prompts.

## Installation

1. Clone or download this extension
2. Navigate to the extension directory:
   ```bash
   cd claude-keywords-chooser
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start development mode:
   ```bash
   npx ray dev
   ```

## Features

- **Keyword Selection**: Browse and select from categorized Claude AI keywords
- **Custom Prompt Input**: Add your base prompt text
- **Multiple Selection**: Combine multiple keywords for complex interactions
- **Quick Actions**: Copy to clipboard or paste directly to active applications
- **Visual Organization**: Keywords organized by category with color-coded icons
- **Search Functionality**: Quickly find specific keywords
- **Keyboard Shortcuts**: Efficient workflow with hotkeys

## Available Keywords

### 🧠 Thinking & Reasoning

#### Think
- **Purpose**: Enables basic thinking mode for standard reasoning
- **Use Case**: General questions that benefit from some reflection
- **Keyword**: `think`
- **Example**: Use for straightforward problem-solving or analysis

#### Think Hard
- **Purpose**: Enables enhanced thinking mode for complex problems
- **Use Case**: Challenging problems requiring deeper analysis
- **Keyword**: `think hard`
- **Example**: Use for complex coding problems, strategic planning, or mathematical analysis

#### Ultrathink
- **Purpose**: Enables maximum thinking mode for very complex analysis
- **Use Case**: Extremely complex problems requiring the deepest level of reasoning
- **Keyword**: `ultrathink`
- **Example**: Use for advanced research problems, complex system design, or multi-layered analysis

### 🔨 Tools

#### Parallel Tool Calls
- **Purpose**: Enables Claude to execute multiple tools simultaneously for efficiency
- **Use Case**: Tasks requiring multiple data sources or operations
- **Keyword**: `Use tools in parallel when possible to optimize performance.`
- **Example**: When asking Claude to research multiple topics, run tests, and generate documentation simultaneously

#### Tool Chaining
- **Purpose**: Allows Claude to chain multiple tools together in sequence
- **Use Case**: Complex workflows requiring multiple steps with tool usage
- **Keyword**: `Chain multiple tools together as needed to complete this task thoroughly.`
- **Example**: Data analysis tasks that require fetching data, processing it, and generating visualizations

### 🔍 Search

#### Web Search
- **Purpose**: Enables Claude's web search capabilities for current information
- **Use Case**: Questions requiring up-to-date information, current events, recent developments
- **Keyword**: `Please search the web for current information on this topic.`
- **Example**: Asking about recent software updates, current market conditions, or latest research findings
- **Note**: Particularly useful for information beyond Claude's training cutoff date

### 📄 Output Control

#### Concise Output
- **Purpose**: Requests brief, direct responses without unnecessary elaboration
- **Use Case**: Quick answers, time-sensitive situations, when context is limited
- **Keyword**: `Please be concise and direct in your response.`
- **Example**: Getting quick syntax help, brief explanations, or yes/no answers

#### Detailed Output
- **Purpose**: Requests comprehensive, thorough responses with full explanations
- **Use Case**: Learning, documentation, complex problem analysis
- **Keyword**: `Please provide a detailed and comprehensive response.`
- **Example**: Tutorial requests, architectural decisions, or educational content

#### Code Only
- **Purpose**: Returns only code without explanations or comments
- **Use Case**: When you only need the implementation, not the explanation
- **Keyword**: `Return only the code without explanations or comments.`
- **Example**: Quick code snippets, configuration files, or when adding to existing codebases

### 💡 Reasoning

#### Step-by-Step Reasoning
- **Purpose**: Breaks down complex problems into manageable steps with clear reasoning
- **Use Case**: Learning, debugging, complex problem-solving
- **Keyword**: `Please break this down step by step and show your reasoning.`
- **Example**: Mathematical problems, algorithm design, troubleshooting issues

#### Multiple Approaches
- **Purpose**: Requests Claude to consider and compare different solutions
- **Use Case**: Architecture decisions, optimization problems, creative tasks
- **Keyword**: `Please consider multiple approaches and compare their trade-offs.`
- **Example**: Choosing between different frameworks, optimization strategies, or design patterns

#### Verify Results
- **Purpose**: Requests Claude to double-check and validate its work
- **Use Case**: Critical tasks, financial calculations, security-related work
- **Keyword**: `Please verify your results and double-check your work.`
- **Example**: Code reviews, data analysis, or any high-stakes decision making

## Usage Guide

### Basic Workflow

1. **Launch the Extension**: Open Raycast and type "Claude Keywords Chooser"
2. **Add Custom Prompt** (Optional): 
   - Select "Custom Prompt" at the top
   - Press Enter to open the form
   - Enter your base prompt text
   - Submit to save
3. **Select Keywords**:
   - Browse through categories or use the search bar
   - Click on keywords to select/deselect them
   - Selected keywords show a checkmark
4. **Generate and Use**:
   - Press `Cmd+C` to copy the complete prompt to clipboard
   - Press `Cmd+V` to paste directly to the active application
   - Press `Cmd+R` to clear all selections

### Advanced Usage

#### Combining Keywords
You can select multiple keywords from different categories to create sophisticated prompts:

**Example Combination**:
- Think Hard + Web Search + Step-by-Step Reasoning
- Result: A prompt that searches for current information, thinks through it carefully, and explains the reasoning process

#### Custom Prompt Integration
When you add a custom prompt, the extension automatically appends selected keywords:

**Input**: "Explain quantum computing to a beginner"
**Selected**: Think Hard + Detailed Output + Step-by-Step Reasoning
**Result**: 
```
Explain quantum computing to a beginner

think hard

Please provide a detailed and comprehensive response.

Please break this down step by step and show your reasoning.
```

### Keyboard Shortcuts

- `Cmd+C`: Copy complete prompt to clipboard
- `Cmd+V`: Paste complete prompt to active app
- `Cmd+Shift+C`: Copy individual keyword only
- `Cmd+R`: Clear all selections
- `Space`: Select/deselect keyword
- `Enter`: Open custom prompt editor or select keyword

## Best Practices

### Keyword Selection Strategy

1. **Start Simple**: Begin with one or two keywords and gradually add more as needed
2. **Match Complexity**: Use Think for basic tasks, Think Hard for complex ones, Ultrathink for the most challenging
3. **Consider Context**: Web Search for current events, thinking modes for analysis depth
4. **Progressive Thinking**: Start with "think" and escalate to "think hard" or "ultrathink" as needed

### Common Combinations

#### For Code Reviews
- Think Hard + Verify Results + Step-by-Step Reasoning

#### For Research Tasks
- Web Search + Think Hard + Detailed Output

#### For Quick Help
- Think + Concise Output + Code Only (if applicable)

#### For Learning
- Think + Detailed Output + Step-by-Step Reasoning + Multiple Approaches

#### For Complex Analysis
- Ultrathink + Tool Chaining + Verify Results

## Troubleshooting

### Common Issues

**Keywords Not Working**: Ensure you're using the complete generated prompt, not just the keywords
**Extension Not Loading**: Run `npx ray dev` in the extension directory
**No Response Improvement**: Try combining complementary keywords or using a higher thinking level

### Performance Tips

- Use progressive thinking levels (think → think hard → ultrathink) based on complexity
- Combine Parallel Tool Calls with multiple tool-using keywords
- Use Concise Output when you don't need detailed explanations

## Contributing

Feel free to contribute additional keywords or improvements:

1. Add new keywords to the `claudeKeywords` array in `src/index.tsx`
2. Follow the existing structure with id, title, description, keyword, and category
3. Update this README with documentation for new keywords

## Keywords Reference Quick Guide

| Category | Keyword | Use Case | Response Impact |
|----------|---------|----------|-----------------|
| Thinking | Think | General problems | Basic reasoning |
| Thinking | Think Hard | Complex problems | Enhanced analysis |
| Thinking | Ultrathink | Very complex problems | Maximum reasoning depth |
| Tools | Parallel Tools | Multiple operations | Faster execution |
| Tools | Tool Chaining | Sequential workflows | Comprehensive task completion |
| Search | Web Search | Current information | Up-to-date data |
| Output | Concise | Quick answers | Brief, direct responses |
| Output | Detailed | Learning/documentation | Comprehensive explanations |
| Output | Code Only | Implementation needed | Clean code without explanation |
| Reasoning | Step-by-Step | Learning/debugging | Clear reasoning process |
| Reasoning | Multiple Approaches | Decision making | Comparative analysis |
| Reasoning | Verify Results | Critical tasks | Double-checked accuracy |

## License

MIT License - feel free to use and modify as needed.
