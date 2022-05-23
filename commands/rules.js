module.exports = { 
name: 'rules', 
description: "Send an embed with the server rules", 
execute(message, args, Discord)  {    
  	
	//configure the rules information embed
	const newEmbed = new Discord.MessageEmbed().setColor('#990000').setTitle('Rules of The Revolution') 
	.setDescription('here you will find all of the rules').addFields({name: 'Everyone here is a comrade', value: 'Be a respectful human being. No harrasement or bullying of any kind. Be mindful'},{name: 'NO N-WORDS', value: 'Discrimination of any kind, on any terms, is strictly forbidden. There will be no racial, sexual, or ethnic sluring in this commune. Transphobes and Homophobes are not welcome in our iteration of fully automated luxury gay space communism'}, {name: 'Rule Three', value: 'Be based'})
	.setImage('https://www.pinclipart.com/picdir/big/93-938815_document-clipart-svg-legal-document-png-graphic-transparent.png').setFooter('').setURL(''); 

 	//send the embed   
	message.channel.send(newEmbed); 
}
 


}
