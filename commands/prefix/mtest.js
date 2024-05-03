


module.exports = {
	name: 'mtest',
	description: 'dev',
	cooldown: 3, 
	async execute(client, message, args) { // eslint-disable-line no-unused-vars
    
        console.log('guild member join test command was added'); 
		if (message.author.id !== '252235505318625281') return;

        else 
        {
            client.evaluator.validateAge(message.member); 
            client.evaluator.onGuildMemberJoin(client, message.guild, message.member);
        }
	}
}