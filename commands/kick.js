const Discord = require('discord.js');
const { prefix } = require('../config.json')

module.exports = {
  name: "kick",
  usage: 'kick ,@user>',
  description: "kick user from the server",
  cooldown: 3,

  async run (client, message, args) {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`:no_entry: This command can only be used by staff members [ ${message.author} ]`)
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send('I do not have permission to charge members :/')


    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    const kosongembed = new Discord.MessageEmbed()
        .setTitle('Kick command')
        .setDescription(`
        **Description:** Kick user from the server\n
        **Usage:** ${prefix}kick [user] [reason]\n
        **Example:** ${prefix}kick user bye
        `)
        .setColor('RED')

    if(!args[0]) return message.channel.send(kosongembed)

    if(!args[1]) return message.channel.send(`🚫 **${message.author.username}** please tag the user`)

    if(!member) return message.channel.send(`🚫 Could not find the user!`)
    if(!member.kickable) return message.channel.send(`🚫 **${message.author.username}** You can't kick users except staff members!`)

    if (member.id === message.author.id) return message.channel.send(`🚫 **${message.author.username}** you can't burden yourself :/`)

    let reason = args.slice(1).join(" ")

    if (reason === undefined) reason = "No reason gives."

    member.kick({reason: reason}); 

    const embed = new Discord.MessageEmbed()
    .setDescription(`:white_check_mark: Successfully kick ${member}`)
    .setColor('GREEN')

    message.channel.send(embed)
  }

}