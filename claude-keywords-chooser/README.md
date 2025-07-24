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

#### Extended Thinking
- **Purpose**: Enables Claude's extended thinking mode for deeper, more thorough reasoning
- **Use Case**: Complex problems requiring step-by-step analysis, mathematical proofs, strategic planning
- **Keyword**: `<thinking>\nPlease think through this step by step using extended reasoning.\n</thinking>`
- **Example**: Use when asking Claude to solve complex coding problems or analyze business strategies

#### Thinking Budget
- **Purpose**: Controls the token budget allocated for Claude's thinking process
- **Use Case**: Balance between response quality and speed/cost
- **Keyword**: `<thinking_budget>1000</thinking_budget>`
- **Example**: Set to 500 tokens for quick responses, 2000+ for complex analysis
- **Note**: Higher budgets allow more thorough thinking but increase response time and cost

#### Think Tool Usage
- **Purpose**: Explicitly requests Claude to use structured thinking before responding
- **Use Case**: Policy-heavy environments, sequential decision making, error-prone tasks
- **Keyword**: `Please use your think tool to analyze this before responding.`
- **Example**: When asking Claude to review code for security vulnerabilities or make important recommendations

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
- Extended Thinking + Web Search + Step-by-Step Reasoning
- Result: A prompt that searches for current information, thinks through it carefully, and explains the reasoning process

#### Custom Prompt Integration
When you add a custom prompt, the extension automatically appends selected keywords:

**Input**: "Explain quantum computing to a beginner"
**Selected**: Extended Thinking + Detailed Output + Step-by-Step Reasoning
**Result**: 
```
Explain quantum computing to a beginner

<thinking>
Please think through this step by step using extended reasoning.
</thinking>

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
2. **Match Complexity**: Use Extended Thinking for complex tasks, Concise Output for simple ones
3. **Consider Context**: Web Search for current events, Think Tool for critical decisions
4. **Balance Cost vs Quality**: Higher thinking budgets provide better results but cost more

### Common Combinations

#### For Code Reviews
- Think Tool Usage + Verify Results + Step-by-Step Reasoning

#### For Research Tasks
- Web Search + Extended Thinking + Detailed Output

#### For Quick Help
- Concise Output + Code Only (if applicable)

#### For Learning
- Detailed Output + Step-by-Step Reasoning + Multiple Approaches

#### For Complex Analysis
- Extended Thinking + Tool Chaining + Verify Results

## Troubleshooting

### Common Issues

**Keywords Not Working**: Ensure you're using the complete generated prompt, not just the keywords
**Extension Not Loading**: Run `npx ray dev` in the extension directory
**No Response Improvement**: Try combining complementary keywords or adjusting thinking budget

### Performance Tips

- Use Thinking Budget to control response time and cost
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
| Thinking | Extended Thinking | Complex problems | Deeper analysis, longer response time |
| Thinking | Thinking Budget | Control quality/speed | Adjustable thinking depth |
| Thinking | Think Tool | Critical decisions | Structured reasoning process |
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
