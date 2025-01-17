const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'limpa',
    description:('Limpa todas as músicas da fila'),
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`Não tem música tocando, <${inter.member}>... <❌>`) });

        if (!queue.tracks.toArray()[1]) return inter.editReply({ content: await Translate(`Você fez merda <❌>`) });

        queue.tracks.clear();

        const clearEmbed = new EmbedBuilder()
            .setAuthor({ name: await Translate(`Fiz a limpa <🗑️>`) })
            .setColor('#2f3136');

        inter.editReply({ embeds: [clearEmbed] });
    }
}