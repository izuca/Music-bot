const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'letra',
    description:('Pegue a letra da música atual'),
    voiceChannel: true,

    async execute({ inter }) {
        const player = useMainPlayer();
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`Não tem música tocando, <${inter.member}>... <❌>`) });

        const results = await player.lyrics
            .search({
                q: queue.currentTrack.title
            })
            .catch(async (e) => {
                console.log(e);
                return inter.editReply({ content: await Translate(`Ih deu merda! Chame o ADM... <❌>`) });
            });

        const lyrics = results?.[0];
        if (!lyrics?.plainLyrics) return inter.editReply({ content: await Translate(`Não achei legenda pra <${queue.currentTrack.title}>... <❌>`) });

        const trimmedLyrics = lyrics.plainLyrics.substring(0, 1997);

        const embed = new EmbedBuilder()
            .setTitle(await Translate(`Lyrics for <${queue.currentTrack.title}>`))
            .setAuthor({
                name: lyrics.artistName
            })
            .setDescription(trimmedLyrics.length === 1997 ? `${trimmedLyrics}...` : trimmedLyrics)
            .setFooter({ text: await Translate('Dica: Não irrite o ADM <🦧>'), iconURL: inter.member.avatarURL({ dynamic: true }) })
            .setTimestamp()
            .setColor('#2f3136');

        return inter.editReply({ embeds: [embed] });
    }
}

