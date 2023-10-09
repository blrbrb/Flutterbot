export let name: string;
export let description: string;
export let options: {
    type: number;
    name: string;
    description: string;
    choices: never[];
    required: boolean;
}[];
export function helpSetup(slashCommands: any): void;
export function execute(Discord: any, client: any, interaction: any): void;
//# sourceMappingURL=help.d.ts.map