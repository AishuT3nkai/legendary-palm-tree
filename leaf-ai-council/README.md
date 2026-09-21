# Leaf AI Council

A small multi-agent chat prototype for Ratman's AI Council.

## Agents

- ChatGPT / OpenAI — primary analyst
- Claude / Anthropic — second opinion and critique
- DeepSeek — independent critique

The orchestrator sends the user's message to all three agents in sequence. Claude receives ChatGPT's answer, and DeepSeek receives both previous answers. The final response is then returned as a single council transcript.

## Setup

Set these Vercel environment variables:

- OPENAI_API_KEY
- OPENAI_MODEL
- ANTHROPIC_API_KEY
- ANTHROPIC_MODEL
- DEEPSEEK_API_KEY
- DEEPSEEK_MODEL

Never put API keys in frontend code or commit them to GitHub.

Deploy the repository/project to Vercel. The frontend calls `/api/chat`.

This is V1: no database, authentication, GitHub actions, or autonomous code changes.
