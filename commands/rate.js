
module.exports = {   
name: 'rate', 
description: 'rate anything on a scale of one to ten', 
execute(message, args) 
{
var rating = new Array(1,2,3,4,5,6,7,8,9,10);



if(message.content.includes('chances that'))
{
	
	message.channel.send(args.join(" ") + ' ' + 'Hmmmmm, Id say that' + ' ' + args.join(" ") + ' ' + 'are about' + ' ' + '%' + Math.floor(Math.random() * 100.00));           
	
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
			message.channel.send(args.join(" ") + ' ' + 'well...' + args.join(" ") + ' ' + 'is a' + ' ' + rating[Math.floor(Math.random() * rating.length)] + '/' + 10);
}


} 


} 
