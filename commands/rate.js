
module.exports = {   
name: 'rate', 
description: 'rate anything on a scale of one to ten', 
execute(message, args) 
{
var rating = new Array(1,2,3,4,5,6,7,8,9,10);

var mult_args; 

if(args[1] == 'Germany' || 'germany' || 'germans' || 'Germans' || 'Allemange' || 'allemange') 
message.channel.send(args + ' ' + 'well...' + args + ' ' + 'is a' + ' ' + '1/10'); 
return; 


if(args < 1)	 
message.channel.send(args + ' ' + 'well...' + args + ' ' + 'is a' + ' ' + rating[Math.floor(Math.random() * rating.length)] + '/' + 10); 

else {

for(let i = 0; i > args.length; i++) 
{

mult_args += " " + $args[i]; 
} 
message.channel.send(args.join(" ") + ' ' + 'well...' + args.join(" ") + ' ' + 'is a' + ' ' + rating[Math.floor(Math.random() * rating.length)] + '/' + 10);
}





} 


} 
