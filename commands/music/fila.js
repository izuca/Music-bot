const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'fila',
    description:('Mostra a fila de sons...'),
    voiceChannel: true,

    async execute({ client, inter }) {
        const queue = useQueue(inter.guild);

        if (!queue) return inter.editReply({ content: await Translate(`Não tem música tocando, <${inter.member}>... <❌>`) });
        if (!queue.tracks.toArray()[0]) return inter.editReply({ content: await Translate(`Não tem música pra tocar depois dessa, <${inter.member}>... <❌>`) });

        const methods = ['', '🔁', '🔂'];
        const songs = queue.tracks.size;
        const nextSongs = songs > 5 ? await Translate(`And <**${songs - 5}**> other song(s)...`) : await Translate(`In the playlist <**${songs}**> song(s)...`);
        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy ? track.requestedBy.displayName : "unknown"})`);
        const embed = new EmbedBuilder()
            .setColor('#2f3136')
            .setThumbnail(inter.guild.iconURL({ size: 2048, dynamic: true }))
            .setAuthor({ name: await Translate(`Fila do Grupo - <${inter.guild.name}> <${methods[queue.repeatMode]}>`), iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
            .setDescription(await Translate(`Current <${queue.currentTrack.title}> <\n\n> <${tracks.slice(0, 5).join('\n')}> <\n\n> <${nextSongs}>`))
            .setTimestamp()
            .setFooter({ text: await Translate('Dica: Não irrite o ADM <🦧>'), iconURL: inter.member.avatarURL({ dynamic: true }) });

        inter.editReply({ embeds: [embed] });
    }
}