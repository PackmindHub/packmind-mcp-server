import {axiosHttpRequest} from './HttpUtils.js';

export class ProtomindAPI {

  constructor(protected protomindURL: string) {}

  async postHowToImport(howToName: string, howToBody: string): Promise<void>{
    const url = `${this.protomindURL}/api/how-tos/mcp-import`;
    const formattedPayload = JSON.stringify({
      howToName,
      howToBody,
    });
    const httpConfig = {
      method: 'post',
      url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: formattedPayload,
    };
    await axiosHttpRequest(httpConfig);
  }

}
