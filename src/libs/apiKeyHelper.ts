
export function apiKey(envVar: string): string {
    // @ts-ignore
    const apiKey = import.meta.env[envVar];
    if (!apiKey) {
        throw new Error(`API key not found in environment variable ${envVar}, please ensure that you have configured .env file correctly. An example is distributed with the project in .env.dist`);
    }
    return apiKey;
}