const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'voltar',
    description:("Volta para o último som tocado."),
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`Nem tem música tocando meu caro <${inter.member}> <❌>`) });

        if (!queue.history.previousTrack) return inter.editReply({ content: await Translate(`Nem tem música pra trás <${inter.member}> <❌>`) });

        await queue.history.back();

        const backEmbed = new EmbedBuilder()
            .setAuthor({ name: await Translate(`Tocando a última trombeta <✅>`) })
            .setColor('#2f3136');

        inter.editReply({ embeds: [backEmbed] });
    }
}