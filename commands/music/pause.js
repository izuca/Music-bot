const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'pause',
    description:('Pausa a música'),
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`Não tem música tocando, <${inter.member}>... <❌>`) });

        if (queue.node.isPaused()) return inter.editReply({ content: await Translate(`Já tá pausado... <❌>`) });

        const success = queue.node.setPaused(true);
        const pauseEmbed = new EmbedBuilder()
            .setAuthor({ name: success ? await Translate(`A música <${queue.currentTrack.title}> foi pausada... <✅>`) : await Translate(`Deu merda... <❌>`) })
            .setColor('#2f3136')

        return inter.editReply({ embeds: [pauseEmbed] });
    }
}