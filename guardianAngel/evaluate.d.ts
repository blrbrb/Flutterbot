export = Evaluator;
declare class Evaluator {
    constructor(Database: any, client: any);
    urlRegex: RegExp;
    intel: any;
    validateAge(member: any): boolean;
    quaratine(client: any, member: any): Promise<void>;
    createQuaratineRole(client: any, member: any): Promise<void>;
    onMessage(client: any, message: any): Promise<void>;
    updateIntelligence(): Promise<void>;
    loadIntel(): any;
    positiveURL(client: any, message: any): Promise<{
        match: boolean;
        urls: any;
    }>;
}
//# sourceMappingURL=evaluate.d.ts.map