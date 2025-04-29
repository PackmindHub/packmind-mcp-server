import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {PackmindConfig} from "./PackmindConfig.js";
import {PackmindAPI} from "./PackmindAPI.js";
import {PackmindLogic} from "./PackmindLogic.js";

// Create server instance
const mcpServer = new McpServer({
  name: "packmind",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// This will store our PackmindLogic instance once initialized
let packmind: PackmindLogic;

// Initialize Packmind components
export function initializePackmind() {
  // Create Packmind API instance
  const config = new PackmindConfig();
  config.checkIsValid();
  const packmindAPI = new PackmindAPI(config);
  packmind = new PackmindLogic(packmindAPI);
  return { config, packmindAPI, packmind };
}

mcpServer.tool(
  "create-coding-practice",
  "Create a new coding practice in Packmind",
  {
    practice: z.string().min(1).describe("Details of the practice including its name, description, a bad example and a good example"),
    space: z.string().min(1).describe("The target Packmind space where the practice will be created"),
    extension: z.string().min(1).describe("The programming language (mandatory) and framework (optional) targeted by the practice. Ex: 'Java Spring', 'React TSX', 'Python'"),
  },
  async ({ practice, space, extension }) => {
    if (!packmind) {
      throw new Error("PackmindLogic not initialized. Call initializePackmind() before using this tool.");
    }

    const targetSpace = await packmind.getActualSpace(space);
    if (!targetSpace) {
      const spaces = await packmind.getSpaces();
      throw new Error(`Invalid space: ${space}. Ask for one of these values before retrying: ${spaces.join(", ")}`);
    }

    await packmind.initMcpImport(targetSpace, practice, extension);

    return {
      content: [
        {
          type: "text",
          text: `Success! Practice will be available in a few seconds in the space ${targetSpace.name}`,
        },
      ],
    };
  }
);

mcpServer.tool(
  "get-coding-practice-description",
  "Get coding practice description from Packmind based on its name",
  {
    practiceName: z.string().min(1).describe("Name of the practice"),
  },
  async ({ practiceName }) => {
    if (!packmind) {
      throw new Error("PackmindLogic not initialized. Call initializePackmind() before using this tool.");
    }
    
    // Get grid point data
    console.log("Fetching practice description for", practiceName);
    const practiceDescription = `
Include full error object in error handling payload

### What
This practice is triggered when handling errors in the code, specifically when creating error payloads for dispatch actions.

### Why
Using the full error object instead of just the error message in payloads provides more context and information for debugging, making it easier to identify and fix issues.

### Fix
Modify the code to pass the entire error object rather than just the message when setting error payloads for dispatch actions.

### Good example
\`\`\`
try {
    dispatch({
        type: 'CREATE_DISCOVERY_WORKSHOP_FROM_STORE_DATA_SUCCEEDED',
    });
    dispatch(deleteDiscoveryWorkshopFromCache(id));
} catch (error) {
    dispatch({
        type: 'CREATE_DISCOVERY_WORKSHOP_FROM_STORE_DATA_FAILED',
        payload: error,
    });
}
\`\`\`

### Bad example
\`\`\`
try {
    dispatch({
        type: 'CREATE_DISCOVERY_WORKSHOP_FROM_STORE_DATA_SUCCEEDED',
    });
    dispatch(deleteDiscoveryWorkshopFromCache(id));
} catch (error) {
    dispatch({
        type: 'CREATE_DISCOVERY_WORKSHOP_FROM_STORE_DATA_FAILED',
        payload: error.message,
    });
}
\`\`\`

`;

    return {
      content: [
        {
          type: "text",
          text: practiceDescription,
        },
      ],
    };
  }
);

export { mcpServer };
