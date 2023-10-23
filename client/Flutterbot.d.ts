
import SimpleDatabase from "../utils/SimpleDatabase";
import { Evaluator } from "../guardianAngel/evaluator"; 
import { Utilities } from "../utils/utilities";
import {fsSnowflakeType } from '../utils/types';
import DisTube from 'distube';
import { Snowflake, Guild } from 'discord.js';
import ExpHandler from "../utils/ExpHandler";


    /**
     * #### Shy
     *
     * Flutterbot's {@link Client} instance.
     * All {@link Events}, commands, and update functions are handled within this class.
     * @class {Shy}
     * @extends {Client}
     */
    export type shy = Shy; 
    declare const shy: Shy;
    export const resolveGuildId: Function =Utilities.resolveGuildID;
    declare const resolveUserId:Function = Utilities.resolveUserID;
    const resolveId:Function = Utilities.resolveID;
    const getsnowflakeType:Function =  Utilities.getSnowflakeType;
    const getextension:Function =  Utilities.getExtension;
    const isSnowflake: Function = Utilities.IsSnowflake;
    const getArrayType: Function = Utilities.getArrayType;
    const format:Function =  Utilities.format;
    const formatSeconds:Function = Utilities.formatSeconds;
    const toTimezone:Function = Utilities.convertToTimezone;
    const hasVoicePerms:Function =  Utilities.hasVoiceChannelPermissions;
    const isNsfwChannel:Function =  Utilities.nsfwChannel;
    const langRand:Function =  Utilities.langRand;
    const removeEveryoneMentions:Function =  Utilities.removeEveryoneMentions;
    const mediaSource:Function = Utilities.MusicMediaUrl;
    const formatytlink:Function = Utilities.Utilities.formatYtLink;
    const lockbox:Function = LockBox;
    const expHandler:class= ExpHandler;
    const lastfm:Function = any;
    const evaluator:class = Evaluator;
    const log: Function = Utilities.Log;
    const distube:class=DisTube;
    const db:class=SimpleDatabase;
    const slashcommands: fsCommands;
    const prefixcommands: fsCommands;
    const start: () => Promise<void>;
