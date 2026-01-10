# React Bits MCP Setup

You have successfully installed the `reactbits-dev-mcp-server` as a development dependency.

To use this MCP server with your AI tools (like Claude Desktop, Cursor, or VS Code with Continue), you need to configure them to run the server.

## Configuration for Claude Desktop / AI Clients

Add the following to your MCP configuration file (e.g., `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "reactbits": {
      "command": "npx",
      "args": [
        "-y",
        "reactbits-dev-mcp-server"
      ]
    }
  }
}
```

**Note:** The server fetches components from GitHub. If you encounter rate limits, you might need to provide a `GITHUB_TOKEN` environment variable.

```json
{
  "mcpServers": {
    "reactbits": {
      "command": "npx",
      "args": [
        "-y",
        "reactbits-dev-mcp-server"
      ],
      "env": {
        "GITHUB_TOKEN": "your_github_token_here"
      }
    }
  }
}
```

## Running Locally (Optional)

Since it is installed in your `node_modules`, you can also reference it directly if preferred, or run it via npm script if you added one.
