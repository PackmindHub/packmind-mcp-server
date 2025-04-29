import {Space} from "./model/Space.js";
import {PackmindAPI} from "./PackmindAPI.js";

export class PackmindLogic {

    constructor(private readonly _api: PackmindAPI) {}

    async getSpaces(): Promise<Space[]> {
        return this._api.getSpaces();
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
        return spaceName.toLowerCase().replace(/ /g, "-");
    }

    async initMcpImport(targetSpace: Space, practice: string, extension: string): Promise<void> {
        const spaceId = targetSpace.id;
        await this._api.initMcpImport(spaceId, practice, extension);
    }
}