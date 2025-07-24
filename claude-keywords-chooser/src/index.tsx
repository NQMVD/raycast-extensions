import { 
  Action, 
  ActionPanel, 
  Clipboard, 
  Form, 
  Icon, 
  List, 
  Toast, 
  showToast,
  LaunchProps
} from "@raycast/api";
import { useState } from "react";

interface ClaudeKeyword {
  id: string;
  title: string;
  description: string;
  keyword: string;
  category: "thinking" | "tools" | "search" | "output" | "reasoning";
}

const claudeKeywords: ClaudeKeyword[] = [
  // Thinking & Reasoning
  {
    id: "think-basic",
    title: "Think",
    description: "Basic thinking mode for standard reasoning",
    keyword: "think",
    category: "thinking"
  },
  {
    id: "think-hard",
    title: "Think Hard",
    description: "Enhanced thinking mode for complex problems",
    keyword: "think hard",
    category: "thinking"
  },
  {
    id: "think-ultra",
    title: "Ultrathink",
    description: "Maximum thinking mode for very complex analysis",
    keyword: "ultrathink",
    category: "thinking"
  },
  
  // Tool Usage
  {
    id: "tool-parallel",
    title: "Parallel Tool Calls",
    description: "Enable parallel tool execution",
    keyword: "Use tools in parallel when possible to optimize performance.",
    category: "tools"
  },
  {
    id: "tool-web-search",
    title: "Web Search",
    description: "Enable web search capabilities",
    keyword: "Please search the web for current information on this topic.",
    category: "search"
  },
  {
    id: "tool-chain",
    title: "Tool Chaining",
    description: "Chain multiple tools together",
    keyword: "Chain multiple tools together as needed to complete this task thoroughly.",
    category: "tools"
  },
  
  // Output Control
  {
    id: "output-concise",
    title: "Concise Output",
    description: "Request concise, direct responses",
    keyword: "Please be concise and direct in your response.",
    category: "output"
  },
  {
    id: "output-detailed",
    title: "Detailed Output",
    description: "Request detailed, comprehensive responses",
    keyword: "Please provide a detailed and comprehensive response.",
    category: "output"
  },
  {
    id: "output-code-only",
    title: "Code Only",
    description: "Return only code without explanations",
    keyword: "Return only the code without explanations or comments.",
    category: "output"
  },
  
  // Reasoning Modes
  {
    id: "reason-step-by-step",
    title: "Step-by-Step Reasoning",
    description: "Break down complex problems step by step",
    keyword: "Please break this down step by step and show your reasoning.",
    category: "reasoning"
  },
  {
    id: "reason-multiple-approaches",
    title: "Multiple Approaches",
    description: "Consider multiple approaches to the problem",
    keyword: "Please consider multiple approaches and compare their trade-offs.",
    category: "reasoning"
  },
  {
    id: "reason-verify",
    title: "Verify Results",
    description: "Double-check and verify the results",
    keyword: "Please verify your results and double-check your work.",
    category: "reasoning"
  }
];

const categoryIcons: Record<string, Icon> = {
  thinking: Icon.Brain,
  tools: Icon.Hammer,
  search: Icon.MagnifyingGlass,
  output: Icon.Document,
  reasoning: Icon.Lightbulb
};

const categoryColors: Record<string, string> = {
  thinking: "#FF6B6B",
  tools: "#4ECDC4", 
  search: "#45B7D1",
  output: "#96CEB4",
  reasoning: "#FFEAA7"
};

interface FormValues {
  selectedKeywords: string[];
  customPrompt: string;
}

export default function ClaudeKeywordsChooser(props: LaunchProps) {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [customPrompt, setCustomPrompt] = useState<string>("");

  const handleToggleKeyword = (keywordId: string) => {
    setSelectedKeywords(prev => 
      prev.includes(keywordId) 
        ? prev.filter(id => id !== keywordId)
        : [...prev, keywordId]
    );
  };

  const generateFinalPrompt = () => {
    const keywords = selectedKeywords
      .map(id => claudeKeywords.find(k => k.id === id)?.keyword)
      .filter(Boolean)
      .join("\n\n");
    
    if (customPrompt.trim()) {
      return `${customPrompt.trim()}\n\n${keywords}`;
    }
    return keywords;
  };

  const copyToClipboard = async () => {
    const finalPrompt = generateFinalPrompt();
    if (finalPrompt.trim()) {
      await Clipboard.copy(finalPrompt);
      await showToast({
        style: Toast.Style.Success,
        title: "Copied to Clipboard",
        message: "Prompt with Claude keywords copied!"
      });
    } else {
      await showToast({
        style: Toast.Style.Failure,
        title: "Nothing to Copy",
        message: "Please select keywords or enter a custom prompt"
      });
    }
  };

  const pasteToActiveApp = async () => {
    const finalPrompt = generateFinalPrompt();
    if (finalPrompt.trim()) {
      await Clipboard.paste(finalPrompt);
      await showToast({
        style: Toast.Style.Success,
        title: "Pasted to Active App",
        message: "Prompt with Claude keywords pasted!"
      });
    } else {
      await showToast({
        style: Toast.Style.Failure,
        title: "Nothing to Paste",
        message: "Please select keywords or enter a custom prompt"
      });
    }
  };

  const clearAll = () => {
    setSelectedKeywords([]);
    setCustomPrompt("");
  };

  const groupedKeywords = claudeKeywords.reduce((acc, keyword) => {
    if (!acc[keyword.category]) {
      acc[keyword.category] = [];
    }
    acc[keyword.category].push(keyword);
    return acc;
  }, {} as Record<string, ClaudeKeyword[]>);

  return (
    <List
      searchBarPlaceholder="Search Claude keywords..."
      actions={
        <ActionPanel>
          <Action
            title="Copy to Clipboard"
            icon={Icon.Clipboard}
            onAction={copyToClipboard}
            shortcut={{ modifiers: ["cmd"], key: "c" }}
          />
          <Action
            title="Paste to Active App"
            icon={Icon.ArrowUp}
            onAction={pasteToActiveApp}
            shortcut={{ modifiers: ["cmd"], key: "v" }}
          />
          <Action
            title="Clear All"
            icon={Icon.Trash}
            onAction={clearAll}
            shortcut={{ modifiers: ["cmd"], key: "r" }}
          />
        </ActionPanel>
      }
      navigationTitle={`Claude Keywords (${selectedKeywords.length} selected)`}
    >
      <List.Item
        title="Custom Prompt"
        subtitle="Enter your base prompt here"
        icon={Icon.Pencil}
        actions={
          <ActionPanel>
            <Action.Push
              title="Edit Custom Prompt"
              icon={Icon.Pencil}
              target={
                <Form
                  actions={
                    <ActionPanel>
                      <Action.SubmitForm
                        title="Save Prompt"
                        onSubmit={(values: FormValues) => {
                          setCustomPrompt(values.customPrompt);
                        }}
                      />
                    </ActionPanel>
                  }
                >
                  <Form.TextArea
                    id="customPrompt"
                    title="Custom Prompt"
                    placeholder="Enter your base prompt here..."
                    defaultValue={customPrompt}
                  />
                </Form>
              }
            />
          </ActionPanel>
        }
        accessories={[
          { text: customPrompt ? "✓ Set" : "Empty" }
        ]}
      />
      
      {Object.entries(groupedKeywords).map(([category, keywords]) => (
        <List.Section key={category} title={category.charAt(0).toUpperCase() + category.slice(1)}>
          {keywords.map((keyword) => (
            <List.Item
              key={keyword.id}
              title={keyword.title}
              subtitle={keyword.description}
              icon={{
                source: categoryIcons[keyword.category],
                tintColor: categoryColors[keyword.category]
              }}
              accessories={[
                { 
                  icon: selectedKeywords.includes(keyword.id) ? Icon.CheckCircle : Icon.Circle,
                  tooltip: selectedKeywords.includes(keyword.id) ? "Selected" : "Not selected"
                }
              ]}
              actions={
                <ActionPanel>
                  <Action
                    title={selectedKeywords.includes(keyword.id) ? "Deselect" : "Select"}
                    icon={selectedKeywords.includes(keyword.id) ? Icon.Minus : Icon.Plus}
                    onAction={() => handleToggleKeyword(keyword.id)}
                  />
                  <Action
                    title="Copy Keyword Only"
                    icon={Icon.Clipboard}
                    onAction={async () => {
                      await Clipboard.copy(keyword.keyword);
                      await showToast({
                        style: Toast.Style.Success,
                        title: "Copied",
                        message: keyword.title
                      });
                    }}
                    shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
                  />
                  <Action
                    title="Copy to Clipboard"
                    icon={Icon.Clipboard}
                    onAction={copyToClipboard}
                    shortcut={{ modifiers: ["cmd"], key: "c" }}
                  />
                  <Action
                    title="Paste to Active App"
                    icon={Icon.ArrowUp}
                    onAction={pasteToActiveApp}
                    shortcut={{ modifiers: ["cmd"], key: "v" }}
                  />
                  <Action
                    title="Clear All"
                    icon={Icon.Trash}
                    onAction={clearAll}
                    shortcut={{ modifiers: ["cmd"], key: "r" }}
                  />
                </ActionPanel>
              }
            />
          ))}
        </List.Section>
      ))}
    </List>
  );
}