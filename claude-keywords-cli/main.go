package main

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/atotto/clipboard"
	"github.com/charmbracelet/huh"
	"github.com/charmbracelet/lipgloss"
)

type ClaudeKeyword struct {
	ID          string
	Title       string
	Description string
	Keyword     string
	Category    string
}

var claudeKeywords = []ClaudeKeyword{
	// Thinking & Reasoning
	{
		ID:          "think-basic",
		Title:       "Think",
		Description: "Basic thinking mode for standard reasoning",
		Keyword:     "think",
		Category:    "thinking",
	},
	{
		ID:          "think-hard",
		Title:       "Think Hard",
		Description: "Enhanced thinking mode for complex problems",
		Keyword:     "think hard",
		Category:    "thinking",
	},
	{
		ID:          "think-ultra",
		Title:       "Ultrathink",
		Description: "Maximum thinking mode for very complex analysis",
		Keyword:     "ultrathink",
		Category:    "thinking",
	},
	// Tool Usage
	{
		ID:          "tool-parallel",
		Title:       "Parallel Tool Calls",
		Description: "Enable parallel tool execution",
		Keyword:     "Use tools in parallel when possible to optimize performance.",
		Category:    "tools",
	},
	{
		ID:          "tool-web-search",
		Title:       "Web Search",
		Description: "Enable web search capabilities",
		Keyword:     "Please search the web for current information on this topic.",
		Category:    "search",
	},
	{
		ID:          "tool-chain",
		Title:       "Tool Chaining",
		Description: "Chain multiple tools together",
		Keyword:     "Chain multiple tools together as needed to complete this task thoroughly.",
		Category:    "tools",
	},
	// Output Control
	{
		ID:          "output-concise",
		Title:       "Concise Output",
		Description: "Request concise, direct responses",
		Keyword:     "Please be concise and direct in your response.",
		Category:    "output",
	},
	{
		ID:          "output-detailed",
		Title:       "Detailed Output",
		Description: "Request detailed, comprehensive responses",
		Keyword:     "Please provide a detailed and comprehensive response.",
		Category:    "output",
	},
	{
		ID:          "output-code-only",
		Title:       "Code Only",
		Description: "Return only code without explanations",
		Keyword:     "Return only the code without explanations or comments.",
		Category:    "output",
	},
	// Reasoning Modes
	{
		ID:          "reason-step-by-step",
		Title:       "Step-by-Step Reasoning",
		Description: "Break down complex problems step by step",
		Keyword:     "Please break this down step by step and show your reasoning.",
		Category:    "reasoning",
	},
	{
		ID:          "reason-multiple-approaches",
		Title:       "Multiple Approaches",
		Description: "Consider multiple approaches to the problem",
		Keyword:     "Please consider multiple approaches and compare their trade-offs.",
		Category:    "reasoning",
	},
	{
		ID:          "reason-verify",
		Title:       "Verify Results",
		Description: "Double-check and verify the results",
		Keyword:     "Please verify your results and double-check your work.",
		Category:    "reasoning",
	},
}

func main() {
	var customPrompt string
	var thinkingKeyword string
	var toolsKeyword string
	var searchKeyword string
	var outputKeyword string
	var reasoningKeywords []string
	var action string

	// Group keywords by category
	keywordsByCategory := make(map[string][]ClaudeKeyword)
	for _, keyword := range claudeKeywords {
		keywordsByCategory[keyword.Category] = append(keywordsByCategory[keyword.Category], keyword)
	}

	// Create options for each category
	thinkingOptions := createOptionsForCategory(keywordsByCategory["thinking"])
	toolsOptions := createOptionsForCategory(keywordsByCategory["tools"])
	searchOptions := createOptionsForCategory(keywordsByCategory["search"])
	outputOptions := createOptionsForCategory(keywordsByCategory["output"])
	reasoningOptions := createOptionsForCategory(keywordsByCategory["reasoning"])

	// Add "None" option to single-select categories
	noneOption := huh.NewOption("None", "")
	thinkingOptions = append([]huh.Option[string]{noneOption}, thinkingOptions...)
	toolsOptions = append([]huh.Option[string]{noneOption}, toolsOptions...)
	searchOptions = append([]huh.Option[string]{noneOption}, searchOptions...)
	outputOptions = append([]huh.Option[string]{noneOption}, outputOptions...)

	form := huh.NewForm(
		huh.NewGroup(
			huh.NewInput().
				Title("Custom Prompt").
				Description("Enter your base prompt (optional)").
				Placeholder("Your custom prompt here...").
				Value(&customPrompt),
		),
		
		huh.NewGroup(
			huh.NewSelect[string]().
				Title("󰧑 Thinking & Reasoning").
				Description("Choose a thinking mode").
				Options(thinkingOptions...).
				Value(&thinkingKeyword),
		),
		
		huh.NewGroup(
			huh.NewSelect[string]().
				Title(" Tool Usage").
				Description("Control how Claude uses tools").
				Options(toolsOptions...).
				Value(&toolsKeyword),
		),
		
		huh.NewGroup(
			huh.NewSelect[string]().
				Title(" Search").
				Description("Enable search capabilities").
				Options(searchOptions...).
				Value(&searchKeyword),
		),
		
		huh.NewGroup(
			huh.NewSelect[string]().
				Title(" Output Control").
				Description("Control response format and detail").
				Options(outputOptions...).
				Value(&outputKeyword),
		),
		
		huh.NewGroup(
			huh.NewMultiSelect[string]().
				Title(" Reasoning Modes").
				Description("Advanced reasoning approaches (multiple selections allowed)").
				Options(reasoningOptions...).
				Value(&reasoningKeywords),
		),
		
		huh.NewGroup(
			huh.NewSelect[string]().
				Title("Action").
				Description("What would you like to do with the generated prompt?").
				Options(
					huh.NewOption("Copy to clipboard", "copy"),
					huh.NewOption("Print to stdout", "print"),
				).
				Value(&action),
		),
	)

	err := form.Run()
	if err != nil {
		log.Fatal(err)
	}

	// Combine all selected keywords
	var allSelectedKeywords []string
	
	// Add single selections (only if not empty)
	if thinkingKeyword != "" {
		allSelectedKeywords = append(allSelectedKeywords, thinkingKeyword)
	}
	if toolsKeyword != "" {
		allSelectedKeywords = append(allSelectedKeywords, toolsKeyword)
	}
	if searchKeyword != "" {
		allSelectedKeywords = append(allSelectedKeywords, searchKeyword)
	}
	if outputKeyword != "" {
		allSelectedKeywords = append(allSelectedKeywords, outputKeyword)
	}
	
	// Add multiple selections from reasoning modes
	allSelectedKeywords = append(allSelectedKeywords, reasoningKeywords...)

	// Generate the final prompt
	finalPrompt := generatePrompt(customPrompt, allSelectedKeywords)

	// Perform the selected action
	switch action {
	case "copy":
		err := clipboard.WriteAll(finalPrompt)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error copying to clipboard: %v\n", err)
			os.Exit(1)
		}
		
		successStyle := lipgloss.NewStyle().
			Foreground(lipgloss.Color("10")).
			Bold(true)
		
		fmt.Println(successStyle.Render("✓ Prompt copied to clipboard!"))
		
	case "print":
		headerStyle := lipgloss.NewStyle().
			Foreground(lipgloss.Color("12")).
			Bold(true).
			Underline(true)
		
		fmt.Println(headerStyle.Render("Generated Prompt:"))
		fmt.Println()
		fmt.Println(finalPrompt)
	}
}

func generatePrompt(customPrompt string, selectedKeywordIDs []string) string {
	var parts []string

	// Add custom prompt if provided
	if strings.TrimSpace(customPrompt) != "" {
		parts = append(parts, strings.TrimSpace(customPrompt))
	}

	// Add selected keywords
	for _, keywordID := range selectedKeywordIDs {
		for _, keyword := range claudeKeywords {
			if keyword.ID == keywordID {
				parts = append(parts, keyword.Keyword)
				break
			}
		}
	}

	return strings.Join(parts, "\n\n")
}

func createOptionsForCategory(keywords []ClaudeKeyword) []huh.Option[string] {
	options := make([]huh.Option[string], len(keywords))
	for i, keyword := range keywords {
		label := fmt.Sprintf("%-25s - %s", keyword.Title, keyword.Description)
		options[i] = huh.NewOption(label, keyword.ID)
	}
	return options
}