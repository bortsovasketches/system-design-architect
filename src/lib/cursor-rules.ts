export function generateCursorRules(systemName: string): string {
    return `
# Vibe-Coding Cursor Rules for ${systemName}

## 1. Project Context
- **Name**: ${systemName} Prototype
- **Stack**: Next.js 14+ (App Router), React, Tailwind CSS, Lucide React.
- **Vibe**: Premium, "Linear-like", Glassmorphism, Aurora Gradients.

## 2. Coding Standards
- **Functional**: Use functional components with strict TypeScript interfaces.
- **Styling**: Use Tailwind CSS for 99% of styling. Use 'clsx' and 'tailwind-merge' for conditional classes.
- **State**: Prefer local state (useState) for UI components. Use Context for global themes.

## 3. UI/UX Principles
- **Micro-interactions**: Every button click should have a scale effect (active:scale-95).
- **Loading States**: Never show blank screens. Use Skeletons or Spinners.
- **Error Handling**: Use Error Boundaries and toast notifications.

## 4. Specific Patterns
- **Glassmorphism**: Use \`bg-white/60 backdrop-blur-md border border-white/20\` for panels.
- **Typography**: Use \`text-balance\` for headings.

## 5. Forbidden
- Do not use class components.
- Do not use default HTML alerts (window.alert).
- Do not use 'any' type unless absolutely necessary.
    `.trim();
}

export function generateSkillFile(skillName: string): string {
    return `
---
name: ${skillName} Logic
description: specific instructions for implementing ${skillName}
---

# ${skillName} Implementation Guide

## Core Concept
Explain the core logic of ${skillName} here.

## Steps
1. Define the interface.
2. Implement the state machine.
3. Connect to the UI.
    `.trim();
}
