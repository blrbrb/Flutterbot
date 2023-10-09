import { EmbedBuilder } from "discord.js";
export namespace meta {
    let name: string;
    let new_lang_message: string;
}
export let author: string;
export let message: string;
export let channel: string;
export let prefixcommands: string;
export let slashcommands: string;
export namespace errorMessage {
    namespace Permissions {
        function adminCommand(): {
            content: string;
            ephemeral: boolean;
        };
        function noeventPermission(): {
            content: string;
            ephemeral: boolean;
        };
        let eventMessage: string[];
        let adminMessage: string[];
        let nsfwMessage: string[];
    }
    namespace Distube {
        /**
         *
         * @description returns an error message in the
         * scenario that someone is trying to skip a video on an empty queue,
         * trying to call /queue for a list of queued videos on an empty queue etc
         *
         * @returns a new {@link discord.InteractionResponse} ephermeral
         * (so people don't get embarrased or smth when a command doesn't work)
         *
         */
        function QueueEmpty(): {
            content: any;
            ephemeral: boolean;
        };
        /**
         *
         * @description returns an error message in the
         * scenario that someone has queued a video which is age restricted.
         * (and will crash the bot)
         *
         * @returns a new {@link discord.InteractionResponse} ephermeral
         * (so people don't get embarrased or smth when a command doesn't work)
         *
         */
        function Restricted(): {
            content: string;
            ephemeral: boolean;
        };
        /**
         *
         * @description returns an error message in the
         * scenario that someone has queued a video which has been
         * set to unavailable by youtube
         *
         * @returns a new {@link discord.InteractionResponse} ephermeral
         * (so people don't get embarrased or smth when a command doesn't work)
         *
         */
        function Unavailable(): {
            content: string;
            ephemeral: boolean;
        };
        /**
        *
        * @description returns an error message in the
        * scenario that someone is attempting to pause an already paused queue
        * @returns a new {@link discord.InteractionResponse} ephermeral
        * (so people don't get embarrased or smth when a command doesn't work)
        *
        */
        function AlreadyPaused(): {
            content: string;
            ephemeral: boolean;
        };
        let noQueue: string[];
        let ageRestricted: string[];
        let unavailable: string[];
        let alreadyPaused: string[];
    }
    namespace quotesfromError {
        /**
         *
         * @description returns an error message in the
         * scenario that there haven't been any quotes for the
         * guild created in the database. In this case it's neccessary to
         * initalize a new array
         *
         * @param {discord.Guild} guild
         * @returns a new {@link discord.InteractionResponse} ephermeral
         * (so people don't get embarrased or smth when a command doesn't work)
         *
         */
        function noGuildQuotes(guild: discord.Guild): {
            content: any;
            ephemeral: boolean;
        };
        /**
         *
         * @description returns an error message in the
         * scenario that there haven't been any quotes for a particular member in a guild.
         *
         * @param {discord.member} member
         * @returns a new {@link discord.InteractionResponse} ephermeral
         * (so people don't get embarrased or smth when a command doesn't work)
         *
         */
        function noMemberQuotes(member: discord.member): {
            content: any;
            ephemeral: boolean;
        };
        let noQuotesForMember: string[];
        let noQuotesForGuild: string[];
    }
    namespace PermissionError {
        /**
         *
         * @description returns an error message in the
         * scenario that someone is attempting to remove a role
         * that they already have (this will result in a missing permissions error)
         *
         * @param {discord.Role} role
         * @returns a new {@link discord.InteractionResponse} ephermeral
         * (so people don't get embarrased or smth when a command doesn't work)
         *
         */
        function OnRoleSelfAssign(role: discord.Role): {
            content: any;
            ephemeral: boolean;
        };
        /**
        *
        * @description returns an error message in the
        * scenario that someone is attempting to remove a role
        * equal too, or less than their default permissons.
        *
        * @param {discord.Role} role
        * @returns a new {@link discord.InteractionResponse} ephermeral
        * (so people don't get embarrased or smth when a command doesn't work)
        *
        */
        function OnRoleSelfRemove(role: discord.Role): {
            content: any;
            ephemeral: boolean;
        };
        function OnClientVoiceConnectFail(channel: any): {
            content: any;
            ephemeral: boolean;
        };
        /**
        *
        * @description returns an error message in the
        * scenario that someone is missing the required
        * permissions to preform an action
        *
        * @param {discord.Role} role
        * @returns a new {@link discord.InteractionResponse} ephermeral
        * (so people don't get embarrased or smth when a command doesn't work)
        *
        */
        function missing(): {
            content: any;
            ephemeral: boolean;
        };
        namespace noPermissionsMessage {
            let missing: string[];
            let onRoleSelfAssign: string[];
            let onRoleSelfRemove: string[];
        }
        namespace noPermissionsClientMessage {
            let onClientVoiceConnect: string[];
        }
        let roleHiddenMessage: string;
    }
    namespace RoleError {
        export function alreadyHas(role: discord.Role): {
            content: any;
            ephemeral: boolean;
        };
        export function _private(role: discord.Role): {
            content: any;
            ephemeral: boolean;
        };
        export { _private as private };
        export function managed(role: discord.Role): {
            content: any;
            ephemeral: boolean;
        };
        export function admin(role: discord.Role): {
            content: any;
            ephemeral: boolean;
        };
        export namespace RoleMessage {
            let alreadyHas_1: string[];
            export { alreadyHas_1 as alreadyHas };
            let _private_1: string[];
            export { _private_1 as private };
            export let guidanceMessage: string[];
            let managed_1: string[];
            export { managed_1 as managed };
            let admin_1: string[];
            export { admin_1 as admin };
        }
    }
}
export namespace commandResponses {
    export namespace Distube_1 {
        /**
          *
          * @description response message when a video has been popped to the top of the queue and
          * started playing.
          *
          * @returns a new {@link discord.InteractionResponse}
          */
        function onPlaying(queue: any, Flutterbot: any): {
            embeds: EmbedBuilder[];
        };
        /**
          *
          * @description response message when a video has been found by Distube, and inserted
          * into the queue following a query.
          * @param queue {@link Distube.queue}
          * @returns a new {@link discord.InteractionResponse}
          */
        function onAddSong(queue: any, Flutterbot: any): EmbedBuilder;
        /**
           *
           * @description response message when the queue has finished playing all of
           * the queued videos, right before she leaves the voice channel
           *
           * @returns a new {@link discord.InteractionResponse}
           */
        function onQueueFinish(): {
            content: any;
        };
        /**
          *
          * @description response message for when the /play command has been used
          * to queue a song.
          *
          * @returns a new {@link discord.InteractionResponse}
          */
        function onQuery(): {
            content: any;
        };
        function resume(queue: any): {
            content: any;
            ephemeral: boolean;
        };
        /**
          *
          * @description response message to be sent after successful execution of /pause
          *
          * @returns a new {@link discord.InteractionResponse}
          *
          */
        function pause(queue: any): {
            content: any;
            ephemeral: boolean;
        };
        /**
          *
          * @description response message to be sent after successful execution of /filter
          *
          * @returns a new {@link discord.InteractionResponse}
          *
          */
        function filter(filter: any): {
            content: any;
            ephemeral: boolean;
        };
        let nowPlayingMessage: string[];
        let addSongMessage: string[];
        let queueFinishMessage: string[];
        let queryMessage: string[];
        let resumeMessage: string[];
        let pauseMessage: string[];
        let filterMessage: string[];
    }
    export { Distube_1 as Distube };
    export namespace Fluttershy {
        /**
        *
        * @description response message to be sent after the -fs command has been called for the first time, prompting the
        * hugging face model to re-initalize with a new conversation.
        *
        * ephermeral to not clutter up channels with messages.
        * @returns a new {@link discord.InteractionResponse}
        *
        */
        function loadingModel(time: any): {
            content: any;
            ephemeral: boolean;
        };
        let loadingModelMessage: string[];
    }
    /**
      *
      * @description response message to be sent into the survivor channel after the scp command
      * has been used
      *
      * @returns a new {@link discord.InteractionResponse}
      *
      */
    export function scp(): any;
    /**
      *
      * @description response message to be sent after successful execution of /getrole
      *
      * @returns a new {@link discord.InteractionResponse}
      *
      */
    export function getrole(role: any): {
        content: any;
        ephemeral: boolean;
    };
    export let scpMessage: string[];
    export let getroleMessage: string[];
}
export namespace socialHelp {
    function imlonely(): {
        content: any;
        embeds: EmbedBuilder[];
    };
    function handleUserInput(collector: any): void;
    function parseCommand(obj: any, userContent: any): any;
    namespace BotResponses {
        let onStart: string[];
        let onCreateIceBreaker: string[];
        let onGames: string[];
        let confirmInput: string[];
        let promptForAnon: string[];
        let onStop: string[];
    }
    let affirmations: string[];
    let advice: string;
    let options: {
        name: string;
        value: string;
    }[];
    let globalResponses: string[];
    namespace globalConfig {
        let _case: undefined;
        export { _case as case };
        export let usr_str: number;
        let name_1: string;
        export { name_1 as name };
        export let userContent: string;
    }
    let branchSelectors: {
        4: string[];
        3: string[];
        2: string[];
        1: string[];
        5: string[];
    };
    let SecondaryResponses: string[];
}
export namespace youShouldLitterallyNeverSeeThis {
    export function dearGodItsReal(client: any): EmbedBuilder;
    let message_1: string;
    export { message_1 as message };
}
//# sourceMappingURL=en.d.ts.map