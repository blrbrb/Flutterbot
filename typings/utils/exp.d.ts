export class exp {
    constructor({ level, experience, msg, reacts, d7oomyScore, cmds, required, amongus }?: {
        level?: number | undefined;
        experience?: number | undefined;
        msg?: number | undefined;
        reacts?: {
            given: number;
            received: number;
        } | undefined;
        d7oomyScore?: number | undefined;
        cmds?: number | undefined;
        required?: number | undefined;
        amongus?: number | undefined;
    });
    level: number;
    experience: number;
    msg: number;
    reacts: {
        given: number;
        received: number;
    };
    d7oomyScore: number;
    cmds: number;
    amongus: number;
    required: number;
    addExp(pts: any): void;
    update(...args: any[]): any[] | undefined;
    calculateRequired(): number;
    onMessageCreate(message: any): any[];
    onInteractionCreate(interaction: any): any[];
    onMessageReaction(reaction: any, user: any): any[];
    pipe(): any;
}
export class expHandler {
    constructor(db: any);
    db: any;
    all: Map<any, any>;
    addUser(userId: any): void;
    writeAll(): void;
    update(...args: any[]): void;
    pipe(): any;
    load(db: any): void;
}
//# sourceMappingURL=exp.d.ts.map