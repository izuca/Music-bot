const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'historico',
    description:('Veja o histórico da fila'),
    voiceChannel: false,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);

        if (!queue || queue.history.tracks.toArray().length == 0) return inter.editReply({ content: await Translate(`Tá limpin, zero música`) });

        const tracks = queue.history.tracks.toArray();

        let description = tracks
            .slice(0, 20)
            .map((track, index) => { return `**${index + 1}.** [${track.title}](${track.url}) by ${track.author}` })
            .join('\r\n\r\n');

        let historyEmbed = new EmbedBuilder()
            .setTitle(`Histórico`)
            .setDescription(description)
            .setColor('#2f3136')
            .setTimestamp()
            .setFooter({ text: await Translate('Não irrite o adm.'), iconURL: inter.member.avatarURL({ dynamic: true }) });

        inter.editReply({ embeds: [historyEmbed] });
    }
}