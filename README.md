# My Telegram Bot

This is a Node.js based Telegram bot that listens for the `/gpt` command in group chat, takes the text after it, and queries ChatGPT with the API from OpenAI.

## Getting Started

1. Clone this repository.
2. Install dependencies by running `npm install`.
3. Create a `.env` file in the root directory with the following variables:
   - `BOT_ID`: Your Telegram bot ID.
   - `API_TOKEN`: Your OpenAI API token.
4. Run the bot by running `npm start`.

## Project Structure

- `src/index.js`: Entry point for the application.
- `src/telegram.js`: Contains the Telegram bot logic.
- `src/chatgpt.js`: Contains the logic for querying ChatGPT with the OpenAI API.
- `.env`: Contains environment variables.
- `package.json`: Contains project dependencies and scripts.
- `README.md`: This file.
