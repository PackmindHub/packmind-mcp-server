import {Space} from './model/Space.js';
import {PackmindAPI} from './PackmindAPI.js';
import {PracticeBasicInfo, PracticeWithExample} from './model/Practice.js';

export class PackmindLogic {

  constructor(private readonly _api: PackmindAPI) {}

  async getSpaces(): Promise<Space[]> {
    return this._api.getSpaces();
  }

  async getPracticeDescriptionAndExamples(practiceName: string, spaceName: string): Promise<string> {
    const space = await this.getActualSpace(spaceName);
    if (!space) {
      throw new Error(`Space "${spaceName}" not found`);
    }
    const practices = await this._api.getPracticesInSpace(space.id);
    const practice = practices.find((p: PracticeBasicInfo) => p.name === practiceName);
    if (!practice) {
      throw new Error(`Practice "${practiceName}" not found in space "${spaceName}"`);
    }
    const practiceWithExamples = await this._api.getPracticeWithExamples(space.id, practice._id);
    if (!practiceWithExamples) {
      throw new Error(`Practice "${practiceName}" with examples not found in space "${spaceName}"`);
    }
    return this.stringifyPractice(practiceWithExamples);
  }

  /**
     * Converts a practice to a Markdown string representation
     * @param practice The practice to stringify
     * @returns Markdown formatted string of the practice
     */
  stringifyPractice(practice: PracticeWithExample): string {
    let result = `# ${practice.name}\n\n${practice.description}\n\n`;
        
    // Add positive examples if they exist
    if (practice.examples.positive?.length) {
      result += '## Good examples\n\n';
      result += this.formatExamples(practice.examples.positive);
    }
        
    // Add negative examples if they exist
    if (practice.examples.negative?.length) {
      result += '## Bad examples\n\n';
      result += this.formatExamples(practice.examples.negative);
    }
        
    return result.trim();
  }
    
  /**
     * Formats an array of examples into Markdown
     * @param examples The examples to format
     * @returns Formatted examples as Markdown string
     */
  private formatExamples(examples: Array<any>): string {
    let result = '';
        
    for (const example of examples) {
      if (example.fileWorkshopPreview && example.fileWorkshopPreview.contents) {
        const code = example.fileWorkshopPreview.contents
          .map((line: any) => line.content)
          .join('\n');
                
        // Add path if it exists
        if (example.fileWorkshopPreview.path) {
          result += `**Path:** ${example.fileWorkshopPreview.path}\n`;
        }
                
        result += `\`\`\`\n${code}\n\`\`\`\n\n`;
                
        if (example.description) {
          result += `${example.description}\n\n`;
        }
      }
    }
        
    return result;
  }

  async getActualSpace(spaceName: string): Promise<Space | null> {
    const spaces = await this.getSpaces();
    const spaceNameNormalized = this.normalizeSpaceName(spaceName);
    for (const space of spaces) {
      if (this.normalizeSpaceName(space.name) === spaceNameNormalized) {
        return space;
      }
    }
    return null;
  }

  private normalizeSpaceName(spaceName: string): string {
    return spaceName.toLowerCase().replace(/-/g, '').replace(/ /g, '');
  }

  async initMcpImport(targetSpace: Space, practice: string, extension: string): Promise<void> {
    const spaceId = targetSpace.id;
    await this._api.initMcpImport(spaceId, practice, extension);
  }
}