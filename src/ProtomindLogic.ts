import {ProtomindAPI} from './ProtomindAPI.js';

export class ProtomindLogic {

  constructor(private readonly _api: ProtomindAPI) {}

  async initMcpImport(howToName: string, howToContent: string): Promise<void> {
    await this._api.postHowToImport(howToName, howToContent);
  }
}