import {PackmindConfig} from './PackmindConfig.js';
import {getBaseUrl} from './APIKey.js';
import {Space} from './model/Space.js';
import {axiosHttpRequest} from './HttpUtils.js';
import {PracticeBasicInfo, PracticeWithExample} from './model/Practice.js';

export class PackmindAPI {

  protected packmindURL: string;
  protected packmindApiKey: string;

  constructor(config: PackmindConfig) {
    // @ts-ignore
    this.packmindApiKey = config.getPackmindApiKey();
    this.packmindURL = getBaseUrl(this.packmindApiKey);
  }

  async getSpaces(): Promise<Space[]>{
    const url = `${this.packmindURL}/api/plugin/common/space`;
    const httpConfig = {
      method: 'get',
      url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'promyze-api-key': this.packmindApiKey,
      },
    };

    const response = await axiosHttpRequest(httpConfig);

    return response.data.map((result: any): Space => {
      return {
        id: result._id,
        name: result.name
      };
    });
  }

  async getPracticesInSpace(spaceId: string): Promise<PracticeBasicInfo[]> {
    const url = `${this.packmindURL}/api/plugin/common/craft-tag-reference/in-space/${spaceId}`;
    const httpConfig = {
      method: 'get',
      url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'promyze-api-key': this.packmindApiKey,
      },
    };

    const response = await axiosHttpRequest(httpConfig);
    return response.data;
  }

  async getPracticeWithExamples(spaceId: string, practiceId: string): Promise<PracticeWithExample> {
    const url = `${this.packmindURL}/api/plugin/common/craft-tag-reference/${spaceId}/${practiceId}`;
    const httpConfig = {
      method: 'get',
      url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'promyze-api-key': this.packmindApiKey,
      },
    };

    const response = await axiosHttpRequest(httpConfig);
    return response.data;
  }


  async initMcpImport(spaceId: string, text: string, extension: string): Promise<void> {
    const formattedPayload = JSON.stringify({
      spaceId,
      text,
      extension,
    });

    console.log(formattedPayload);

    const httpConfig = {
      method: 'post',
      url: `${this.packmindURL}/api/plugin/common/mcp/init/text`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'promyze-api-key': this.packmindApiKey,
        'promyze-source-type': 'MCP',
        'promyze-source-provider': 'MCP',
      },
      data: formattedPayload,
    };

    await axiosHttpRequest(httpConfig);
  }

}
