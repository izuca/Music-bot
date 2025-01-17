const maxVol = client.config.opt.maxVol || 100;
const { ApplicationCommandOptionType } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'volume',
    description:('Ajusta o volume'),
    voiceChannel: true,
    options: [
        {
            name: 'volume',
            description:('A altura do som (1 a 100)'),
            type: ApplicationCommandOptionType.Number,
            required: true,
            minValue: 1,
            maxValue: maxVol
        }
    ],

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`Não tem música tocando, <${inter.member}>...`) });

        const vol = inter.options.getNumber('volume');
        if (queue.node.volume === vol) return inter.editReply({ content: await Translate(`Tá no mesmo volume que antes... <❌>`) });

        const success = queue.node.setVolume(vol);

        return inter.editReply({ content: success ? await Translate(`The volume has been modified to <${vol}/${maxVol}%> <🔊>`) : `Você fez merda aqui... <❌>` });
    }
}