import utilities from '../utils/utilities';
import { Flutterbot } from '../client/Flutterbot';
export type Utilities = utilities; 

export type logcolors = utilities.Logcolors;



export class Shy extends Client {
        /**
        * cooldown times for commands
        * @memberof Shy
        */
        cooldowns: Collection<Snowflake, number>;
        /**
         * Log
         * @memberof Shy
         */
        Log: Function;
        /**
         * message collectors for button components
         * @memberof Shy
         */
        collectors: Map<any, any>;
        /**
        * cooldown times created by guilds
        * @memberof Shy
        */
        GuildCooldowns: Map<fsSnowflakeType.Guild, any>;
        /**
        * message / url content saftey scanner module
        * @memberof Shy
        */
        SlashCommands: fsCommands;
        /**
         * Flutterbot's prefix commands
        * @memberof Shy
        */
        PrefixCommands: fsCommands;
        /**
         * Flutterbot's last.fm api instance
        * @memberof Shy
        */
        LastFm: any;
        /**
         * Flutterbot's [Database]({@link SimpleDatabase})
        * @memberof Shy
        */
        DB: SimpleDatabase;
        /**
         * encryption utility
        * @memberof Shy
        */
        LockBox: LockBox;
        /**
         * Flutterbot's DisTube instance
        * @memberof Shy
        */
        Evaluator: Evaluator;
        /**
        * Flutterbot's slash (interaction) commands
        * @memberof Shy
        */
        DisTube: DisTube;
        /**
         * Flutterbot's expeirence handler
        * @memberof Shy
        */
        ExpHandler: ExpHandler;
        /**
        * Creates an instance of Fluttershy.
        * @memberof Shy
        */
        constructor();
        getDefaultCoolDown(serverId: string): any;
        /**
         * The bot client's main loop
         * @return {Promise<void>}
         * @memberof Shy
         */
        updateEvents(): Promise<void>;
        /**
         * You know she's not a tree right?
         * @memberof Shy
         */
        start(): Promise<void>;
    }
    
