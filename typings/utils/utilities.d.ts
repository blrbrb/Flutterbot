export class Log {
    constructor({ modifierList, message, logAll, forced, tofile, clear, frame }: {
        modifierList?: any[] | undefined;
        message?: string | undefined;
        logAll?: boolean | undefined;
        forced?: boolean | undefined;
        tofile?: boolean | undefined;
        clear?: BooleanConstructor | undefined;
        frame?: string | undefined;
    });
    clearLog(): void;
}
export declare function getImage(message: any): Promise<any>;
export declare function removeEveryoneMentions(text: any): any;
export declare function formatTime(seconds: any): string;
export declare function formatTime(seconds: any): string;
export declare function isValidHexColor(color: any): boolean;
export declare function stringToDate(RawDateString: any): false | Date;
export declare function parseDate(results: any, Date: any): void;
export declare function consolidateTimeObjects(impliedValues: any, knownValues: any): {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
};
export declare function langRand(langArray: any): any;
export declare function convertToTimezone(date: any, targetTimezone: any): string;
export declare function resolveGuildID(object: any): any;
export declare function resolveUserID(object: any): any;
export declare function resolveID(IDResolveable: any): any;
export declare function ProgressBar(current: any, whole: any): string;
export declare function displayList(array: any): any;
export declare function ID(): void;
export declare function format(template: any, replacements: any): any;
export declare function isYoutubeUrl(url: any): boolean;
export declare function formatYtLink(input: any): any;
export declare function isSpotifyUrl(url: any): false | "spotify";
export declare function isSoundCloudUrl(url: any): false | "soundcloud";
export declare function MusicMediaUrl(url: any): "" | "spotify" | "soundcloud" | "yt";
export declare function hasVoiceChannelPermissions(interaction: any, Flutterbot: any): boolean;
export declare function nsfwChannel(interaction: any): any;
export declare function IsSnowflake(integer_id: any): boolean;
export declare function printCurrentFrame(): string;
export declare function sharedKeys(obj1: any, obj2: any): any;
export declare function generate(): number;
//# sourceMappingURL=utilities.d.ts.map