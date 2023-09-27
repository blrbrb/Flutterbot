const {EmbedBuilder, Embed} = require('discord.js');

module.exports ={

Voter
 
}


class Voter
{
    /**
     * create a new poll object 
     * @param {array} options=[] 
     * @param {any} channel
     * @param {any} timeout=0
     * @param {any} Flutterbot
     * @returns {any}
     */
    constructor(options=[], channel, timeout=0, Flutterbot)
    {
        this.options = options; 
        this.values = Map();
        this.channel = channel;
        this.embed = new EmbedBuilder(); 
    }
    initembed()
    {
        this.embed.setAuthor({name:'Flutterbot.poll',iconURL: Flutterbot.client.user.displayAvatarURL()})
        .setDescription('What would you all like to do this week?')
     
        this.otptions.forEach(option => {
            this.embed.addFields(option)
        });
    }

    startVote(channel) {
        const embed = createEmbed();
        const row = createActionRow();
      
        channel.send({ embeds: [embed], components: [row] })
          .then((msg) => {
            currentEmbed = msg;
            votingActive = true;
            setTimeout(() => endVote(channel), this.timeout);
          });
      }
      
      createEmbed() {
        const embed = new MessageEmbed()
          .setTitle('Vote for an Activity')
          .setDescription('Select an activity to vote for:')
          .setColor('#0099ff');
      
        activityOptions.forEach((option) => {
          embed.addField(option, '0 votes', true);
        });
      
        return embed;
      }
      
      createActionRow() {
        const row = new MessageActionRow();
        activityOptions.forEach((option, index) => {
          const button = new MessageButton()
            .setCustomId(`vote_${index}`)
            .setLabel(option)
            .setStyle('PRIMARY');
          row.addComponents(button);
        });
        return row;
      }
      
      endVote(channel) {
        if (currentEmbed) {
          currentEmbed.delete();
          currentEmbed = null;
          votingActive = false;
        }}


}