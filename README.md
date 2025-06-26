# Setup
1. Use node 20
2. Run the following command
```
npm install
npm run build
```
# Github Copilot (VSCode)
3. Create a .vscode/mcp.json file
Add a new block `protomind`
```json
{
  "servers": {
      "protomind": {
          "command": "node",
          "args": [
              "<PATH_TO_YOUR_HOME>/mcp-server/build/index.js"
          ]
      }
  }
}
```
# Cursor
3. Go to "Settings -> MCP -> Add a new global MCP server"
Add a new block `packmind`
```json
{
  "mcpServers": {
      "packmind": {
          "command": "node",
          "args": [
              "<PATH_TO_YOUR_HOME>/packmind-mcp-server/build/index.js"
          ],
          "env": {
            "PACKMIND_API_KEY": "YOUR_API_KEY"
          }
      }
  }
}
```
