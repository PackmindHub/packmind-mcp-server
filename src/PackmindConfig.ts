export class PackmindConfig {

  constructor() {}

  getPackmindApiKey(): string | undefined {
    return process.env.PACKMIND_API_KEY;
  }

  checkIsValid(): void {
    if (!this.getPackmindApiKey()) {
      throw new Error('PACKMIND_API_KEY is missing as environment variable');
    }
  }

}
