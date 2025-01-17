const { EmbedBuilder } = require("discord.js");
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'save',
    description:('Salva a música atual'),
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`Não tem música tocando, <${inter.member}>... <❌>`) });

        const embed = new EmbedBuilder()
            .setColor('#2f3136')
            .setTitle(`:arrow_forward: ${queue.currentTrack.title}`)
            .setURL(queue.currentTrack.url)
            .addFields(
                { name: await Translate('Duration <:hourglass:>'), value: `\`${queue.currentTrack.duration}\``, inline: true },
                { name: await Translate('Song by:'), value: `\`${queue.currentTrack.author}\``, inline: true },
                { name: await Translate('Views <:eyes:>'), value: `\`${Number(queue.currentTrack.views).toLocaleString()}\``, inline: true },
                { name: await Translate('Song <URL>:'), value: `\`${queue.currentTrack.url}\`` }
            )
            .setThumbnail(queue.currentTrack.thumbnail)
            .setFooter({ text: await Translate(`From the server <${inter.member.guild.name}>`), iconURL: inter.member.guild.iconURL({ dynamic: false }) });

        inter.member.send({ embeds: [embed] })
        .then(async () => {
            return inter.editReply({ content: await Translate(`Te mandei um segredo na DM... <✅>`) });
        }).catch(async () => {
            return inter.editReply({ content: await Translate(`Me censuraram! <❌>`) });
        });
    }
}