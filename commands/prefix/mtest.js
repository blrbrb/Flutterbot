


module.exports = {
	name: 'mtest',
	description: 'dev',
	cooldown: 3, 
	async execute(client, message, args) { // eslint-disable-line no-unused-vars
        console.log(message);
        console.log('guild member join test command was added'); 
		if (message.author.id !== '252235505318625281') return;

        else 
        {
            
            console.log(message.member); 
           // client.evaluator.validateAge(client.db, message); 
            client.evaluator.onGuildMemberJoin(client, message.guild, message.member.guild);
        }
	}
}