const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'remover',
    description: "Remove a música da fila",
    voiceChannel: true,
    options: [
        {
            name: 'música',
            description:('Nome ou URL da música a ser removida'),
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'número',
            description:('A ordem da música da fila'),
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`Não tem música tocando, <${inter.member}>... <❌>`) });

        const number = inter.options.getNumber('número');
        const track = inter.options.getString('música');
        if (!track && !number) inter.editReply({ content: await Translate(`Tem que usar uma das opções pra pular a música, burrão! <❌>`) });

        let trackName;

        if (track) {
            const toRemove = queue.tracks.toArray().find((t) => t.title === track || t.url === track);
            if (!toRemove) return inter.editReply({ content: await Translate(`Não achei <${track}>, <${inter.member}>... que tal usar todos os seus neurônios? <❌>`) });

            queue.removeTrack(toRemove);
        } else if (number) {
            const index = number - 1;
            const name = queue.tracks.toArray()[index].title;
            if (!name) return inter.editReply({ content: await Translate(`Esta música non ecsiste! <❌>`) });

            queue.removeTrack(index);

            trackName = name;
        }
        
        const embed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: await Translate(`Tirei <${trackName}> da fila <✅>`) });

        return inter.editReply({ embeds: [embed] });
    }
}
