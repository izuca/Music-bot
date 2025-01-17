const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { QueryType, useMainPlayer, useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'playnext',
    description:("Toca uma música logo após a atual"),
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description:('Qual o próximo som?'),
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter }) {
        const player = useMainPlayer();
        const queue = useQueue(inter.guild);

        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`Não tem música tocando, <${inter.member}>... <❌>`) });

        const song = inter.options.getString('song');
        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res?.tracks.length) return inter.editReply({ content: await Translate(`Essa música non ecsiste! <❌>`) });

        if (res.playlist) return inter.editReply({ content: await Translate(`?`) });

        queue.insertTrack(res.tracks[0], 0);

        const playNextEmbed = new EmbedBuilder()
            .setAuthor({ name: await Translate(`Track has been inserted into the queue... it will play next <🎧>`) })
            .setColor('#2f3136');

        await inter.editReply({ embeds: [playNextEmbed] });
    }
}
