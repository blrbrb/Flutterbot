const {resolveGuildID} = require('../utils.js');
class Evaluator
{
   constructor(Database, locker, client) {
    this.db = Database; 
    this.locker = locker
    this.client = client;

      }
   
   validateAge(member)
   {
      let MinAge = this.db.getGuildConfig(member.guild, "newMemberMinimumAge");
    
      if(!MinAge)
      {
         console.log('evaluage.js validateAge() no default new member age set in server config, using default of one month');
         const oneMonthAgo = new Date();
         oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
         
         return member.user.createdAt < oneMonthAgo;
      }
      else
      {
         const daysAgo = new Date(); 
         daysAgo.setDate(daysAgo.getDate() - MinAge);
         return member.user.createdAt < daysAgo; 
      }

   }
   async quaratine(member)
   {
    
      const guild = this.client.guilds.cache.get(member.guild.id);

      let qRoleID = this.db.getGuildConfig(member.guild, 'quaratine_role'); 
      let quarantinedUsers =this.db.getGuildConfig(member.guild, 'quaratined');

      if(!quarantinedUsers)
      {
         this.db.setGuildConfig(member.guild, 'quarantined', [member.id]); 
      }
      else
      {
         quarantinedUsers.push(member.user.id); 
         this.db.setGuildConfig(member.guild, 'quarantined', quarantinedUsers);
      }
      
      if(!qRoleID)
      {
         console.log('evaluate.js quaratine(). Guild quaratine role is not set in config')
         this.createQuaratineRole(member);
         return; 
      }
      else{
      const qRole = await guild.roles.cache.get(qRoleID);

      if(qRole)
      {
       
         await member.roles.add(qRole);
         return
      }
      
      return;
      }
      
   }

   async createQuaratineRole(member)
   {
    
      const guild = this.client.guilds.cache.get(member.guild.id);

       // Define the role's properties
         const roleData = {
            name: 'Quaratine', // Replace with the desired role name
             color: 'RED', // Replace with the desired color (e.g., 'BLUE', 'RED', 'RANDOM', etc.)
             permissions: ['SEND_MESSAGES', 'READ_MESSAGES'], // Replace with the desired permissions
             hoist: true, // Display role members separately in the member list (optional)
             mentionable: true, // Allow the role to be mentioned (optional)
            };

            guild.roles.create({
               data: roleData,
               reason: 'Flutterbot.js default quaratine role did not exist. Initalizing from scratch', // Optional reason for audit logs
             })
               .then((role) => {
                 console.log(`Created role: ${role.name}`);
                 this.db.setGuildConfig(guild, 'quaratine_role',role.id);
               })
               .catch((error) => {
                 console.error('Error creating role:', error);
               });

            
            return;
 

   }


   
}

module.exports = Evaluator;