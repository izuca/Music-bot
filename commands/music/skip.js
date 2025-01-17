const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'skip',
    description:('Pula a música'),
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`Não tem música tocando, <${inter.member}>... <❌>`) });

        const success = queue.node.skip();

        const embed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: success ? await Translate(`A música <${queue.currentTrack.title}> foi pulada <✅>`) : await Translate(`Você fez merda aqui... <❌>`) });

        return inter.editReply({ embeds: [embed] });
    }
}