# Setup 

1. Use node 20

2. Run the following command 

```
npm install
npm run build
``` 

3. In Cursor, go to "Settings -> MCP -> Add a new global MCP server"

```json
Add a new block `packmind`
{
  "mcpServers": {
      "packmind": {
          "command": "node",
          "args": [
              "<PATH_TO_YOUR_HOME>/packmind-mcp/build/index.js"
          ],
          "env": {
            "PACKMIND_API_KEY": "YOUR_API_KEY"
          }
      }
  }
}
```