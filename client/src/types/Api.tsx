interface IAPI {
    apiKey: string
    userId: string
    allowedSites: [string]
    botName: string
    context: [{
        pageContent: string;
        metadata: {
            loc: object;
        };
    }];
}
export default IAPI;