import {jwtDecode} from "jwt-decode";

export function getBaseUrl(apiKey: string): string {
    const { host, secure } = extractServerConfigurationFromApiKey(apiKey);
    const protocol = secure ? 'https' : 'http';
    if (host.endsWith('/')) {
        return `${protocol}://${host.slice(0, -1)}`;
    }
    return `${protocol}://${host}`;
}

function extractServerConfigurationFromApiKey(apiKey: string): { host: string, secure: boolean } {
    try {
        const apiKeyDecoded = Buffer.from(apiKey, 'base64').toString();
        const { host, secure } = jwtDecode<{ host: string, secure: boolean }>(apiKeyDecoded);

        return { host, secure };
    } catch {
        throw new Error("Your API Key seems to be invalid. Please check it and try again.");
    }
}
