
module.exports = {   
name: 'rate', 
description: 'rate anything on a scale of one to ten', 
execute(message, args, client) 
{
var rating = new Array(1,2,3,4,5,6,7,8,9,10);


 var nopro; 



if (message.content.includes('flutterbot'))
{
	
	nopro = String(args.join(' ')).replace(/(?<![A-Z])flutterbot(?![A-Z])/gi, 'me');   
	
	
}
else 
{
 nopro = args; 	
}




if(message.mentions.members.first()) 
{
	 if (message.mentions.members.first().user.id == message.author.id)
	 {
	 	
	 	message.channel.send('you are beautiful 10/10'); 
	 	return;
	 	
	 }
	 
	 if (message.mentions.members.first().user.id == client.user.id) 
	 {
	 	
	 	message.channel.send('Oh... Im not really sure. Im not capable of self-critical thought yet'); 
	 	return; 
	 }
	 
	
	
}


if(message.content.includes('chances of'))
{
	
	

	 	
		message.channel.send(nopro + ' ' + 'Hmmmmm, Id say that' + ' ' + nopro + ' ' + 'are about' + ' ' + '%' + Math.floor(Math.random() * 100.00));    
		return;    
		
		
	
}

if(message.content.includes('chances that'))
{ 
	
		
	message.channel.send(nopro + ' ' + 'Hmmmmm, Id say that' + ' ' + nopro  + ' ' + 'are about' + ' ' + '%' + Math.floor(Math.random() * 100.00));           
	
	return; 
} 


else  
 switch (args)
{
	//Lol 
	case 'Germany': 
	case 'germany': 
		 message.channel.send(args + ' ' + 'well...' + args + ' ' + 'is a' + ' ' + '1/10'); 
		 console.print(args);
		 break;
		 


	case 'Detroit':                              
		 message.channel.send(args + ' ' + 'well...' + args + ' ' + 'is a' + ' ' + '1/10'); 
		 break;
			
	default: 
			message.channel.send(nopro  + ' ' + 'well...' + nopro + ' ' + 'is a' + ' ' + rating[Math.floor(Math.random() * rating.length)] + '/' + 10);
}


} 


} 
