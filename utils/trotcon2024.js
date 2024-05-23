
const ApplicationCommandOptionType = require('discord.js');
module.exports = 
{  
    name: 'countdown',
    description: 'Sets a countdown to a specific date.',
    options: [
    {
        name: 'date',
        type: ApplicationCommandOptionType.String,
        description: 'The target date in mm/dd/yyyy format',
        required: true,
    
    },
    {
        name: 'event_name',
        type: ApplicationCommandOptionType.String,
        description: 'The name of the anticipated event',
        required: false,
    
    },
    {
        name: 'frequency',
        type: ApplicationCommandOptionType.Number,
        description: 'num. ms between reminders. Default every 24hr',
        required: no,
    
    },],
    async execute(Discord, Flutterbot, interaction) {    
        
    const date = interaction.options.getString('date');
    const event_name = interaction.options.getString('event_name'); 
    const channelId = interaction.channelId; 
    
    let frequency = 86400000 | interaction.options.getNumber('frequency'); 

    try {
        const eventDate = new Date(date);
        if (isNaN(eventDate)) {
            await interaction.reply({ content: 'Invalid date format. Please use mm/dd/yyyy.', ephemeral: true });
            return;
        }

        const today = new Date();
        if (eventDate <= today) {
            await interaction.reply({ content: 'The date must be in the future!!', ephemeral: true });
            return;
        }

        const daysLeft = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

        await interaction.reply(`There are ${daysLeft} days left until ${event_name}.`);

        if (countdownTasks.has(channelId)) {
            countdownTasks.get(channelId).stop();
        }

        //save task info to the database so that it can be dynamically reloaded and resumed upon unexpected crashes, updates, housefires, etc
        Flutterbot.db.query(`INSERT INTO TASKS(channel_id, guid, until, frequency_ms) VALUES ${channelId}, ${interaction.guild.id}, ${eventDate}, ${86400000}`); 

        const task = cron.schedule('0 0 * * *', async () => {
            const now = new Date();{}
            if (eventDate <= now) {
                await interaction.channel.send(`Today is the day! ${eventDate.toLocaleDateString()}`);
                task.stop();
                countdownTasks.delete(channelId);
            } else {
                const remainingDays = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
                await interaction.channel.send(`${remainingDays} days left until ${eventDate.toLocaleDateString()}.`);
            }
        });

        countdownTasks.set(channelId, task);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'An error occurred while processing the date.', ephemeral: true });
    }
    }
}