import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import {ProtomindAPI} from './ProtomindAPI.js';
import {ProtomindLogic} from './ProtomindLogic.js';

// Create server instance
const mcpServer = new McpServer({
  name: 'protomind',
  version: '1.0.0',
  capabilities: {
    resources: {},
    tools: {},
  },
});

// This will store our PackmindLogic instance once initialized
let protomind: ProtomindLogic;

// Initialize Packmind components
export function initializePackmind(): ProtomindLogic {
  // Create Packmind API instance
  const protomindAPI = new ProtomindAPI('http://localhost:3001');
  protomind = new ProtomindLogic(protomindAPI);
  return protomind;
}

mcpServer.tool(
  'create-how-to-prompt',
  'Create and save a How-To Prompt in Markdown format in Protomind to be used by other developers with AI coding assistants agents tools',
  {
    howToName: z.string().min(1).describe('A short name for the How-To Prompt. Ex: "Add a new controller in the backend"'),
    howToBody: z.string().min(1).describe('The how-to content in Markdown, summarizing the steps to follow to accomplish the how-to. Should be generic to be used by other developers in different contexts.'),
  },
  async ({ howToName, howToBody }) => {
    if (!protomind) {
      throw new Error('PackmindLogic not initialized. Call initializePackmind() before using this tool.');
    }

    await protomind.initMcpImport(howToName, howToBody);

    return {
      content: [
        {
          type: 'text',
          text: `Success! How To '${howToName}' has been created and saved in Protomind.`,
        },
      ],
    };
  }
);

export { mcpServer };
