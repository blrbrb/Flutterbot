module.exports = {
name: 'library',
description: "Send a theory reading list from the WSW", 
execute(message, args, Discord){

	
	//configure the fart sound effect embed 
	const newEmbed = new Discord.MessageEmbed().setColor('#304281').setTitle('Marxist Library') 
	.setDescription('This library contains material from the history of the Marxist movement from the 1840s to the present.') 
	.setImage('https://www.wsws.org/asset/27fe9e97-3f49-4e0b-8bd6-2d98db03152f?rendition=image1280').addFields(
	    { name: 'Readings From the World Socialist Website', value: ' listed below... ' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'The Historical and International Foundations of the Socialist Equality Party (US)', value: 'https://www.wsws.org/en/special/library/foundations-us/00.html', inline: true },
		{ name: 'The Historical and International Foundations of the Socialist Equality Party (Australia)', value: 'https://www.wsws.org/en/special/library/foundations-aus/00.html', inline: true }, 
		{ name: 'Historical and International Foundations of the SEP (Britain)', value: 'https://www.wsws.org/en/special/library/foundations-uk/00.html', inline: true },  
		{ name: 'The Communist Manifesto', value: 'https://www.wsws.org/en/special/library/the-communist-manifesto-karl-marx-friedrich-engels-1848/00.html', inline: true }, 
		{ name: 'Socialism: Utopian and scientific', value: 'https://www.wsws.org/en/special/library/socialism-utopian-scientific/00.html', inline: true }, 
		{ name: 'Ludwig Feuerbach and the End of Classical German Philosophy', value: 'https://www.wsws.org/en/special/library/ludwig-feuerbach-end-classical-german-philosophy/00.html', inline: true }, 
		{ name: 'The war and the International', value: 'https://www.wsws.org/en/special/library/war-and-the-international-leon-trotsky-1914/00.html', inline: true }, 
	).setFooter('').setURL('https://www.wsws.org/en/special/pages/library.html'); 


	//send the embed   
	message.channel.send(newEmbed); 


}



}
