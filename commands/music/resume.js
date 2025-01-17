const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'resume',
    description:('Resume a música'),
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue) return inter.editReply({ content: await Translate(`Não tem música tocando, <${inter.member}>... <❌>`) });

        if (queue.node.isPlaying()) return inter.editReply({ content: await Translate(`Já tá tocando a música... <❌>`) })

        const success = queue.node.resume();

        const resumeEmbed = new EmbedBuilder()
            .setAuthor({ name: success ? await Translate(`Música atual <${queue.currentTrack.title}> resumida <✅>`) : await Translate(`Você fez merda aqui... <❌>`) })
            .setColor('#2f3136')

        return inter.editReply({ embeds: [resumeEmbed] });
    }
}
