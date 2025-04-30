import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';
import {mcpServer, initializePackmind} from './mcp-server.js';
// Initialize PackmindLogic and all dependencies
const { packmind } = initializePackmind();

async function main() {
  // Set up the transport and connect the server
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.error('Packmind MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});