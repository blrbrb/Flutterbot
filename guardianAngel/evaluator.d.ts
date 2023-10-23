import { GuildMember, Message } from "discord.js";
import SimpleDatabase from "../utils/SimpleDatabase";
import { shy } from "../client/Flutterbot";
export declare class Evaluator {
    urlRegex: RegExp;
    intel: string[];
    db: SimpleDatabase;
    shy: shy;
    constructor(Database: SimpleDatabase, shy: shy);
    validateAge(member: GuildMember): boolean;
    quaratine(member: GuildMember): Promise<void>;
    createQuaratineRole(member: GuildMember): Promise<void>;
    onMessage(message: Message): Promise<void>;
    updateIntelligence(): Promise<void>;
    loadIntel(): any;
    positiveURL(message: Message): Promise<{
        match: boolean;
        urls: Array<string> | undefined;
    }>;
}
export default Evaluator;
