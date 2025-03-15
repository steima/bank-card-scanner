
export function apiKey(envVar: string): string {
    console.log(process.env);
    const apiKey = process.env[envVar];
    if (!apiKey) {
        throw new Error(`API key not found in environment variable ${envVar}, please ensure that you have configured .env file correctly. An example is distributed with the project in .env.dist`);
    }
    return apiKey;
}