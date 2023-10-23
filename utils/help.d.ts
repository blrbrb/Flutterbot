export let name: string;
export let description: string;
export let options: {
    type: number;
    name: string;
    description: string;
    choices: string[];
    required: boolean;
}[];
export function helpSetup(slashCommands: any): void;
export function execute(Discord: any, shy: any, interaction: any): void;
