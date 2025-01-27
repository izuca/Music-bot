const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'jump',
    description:("Pula pra uma música específica da fila"),
    voiceChannel: true,
    options: [
        {
            name: 'música',
            description:('Nome ou URL da música a ser pulada'),
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

        const track = inter.options.getString('música');
        const number = inter.options.getNumber('número');
        if (!track && !number) inter.editReply({ content: await Translate(`Tem que usar uma das opções pra pular a música, burrão! <❌>`) });

        let trackName;
        if (track) {
            const toJump = queue.tracks.toArray().find((t) => t.title.toLowerCase() === track.toLowerCase() || t.url === track);
            if (!toJump) return inter.editReply({ content: await Translate(`Não achei <${track}>, <${inter.member}>... que tal usar todos os seus neurônios ? <❌>`) });

            queue.node.jump(toJump);
            trackName = toJump.title;
        } else if (number) {
            const index = number - 1;
            const name = queue.tracks.toArray()[index].title;
            if (!name) return inter.editReply({ content: await Translate(`Essa música non ecsiste, <${inter.member}>... <❌>`) });

            queue.node.jump(index);
            trackName = name;
        }

        const jumpEmbed = new EmbedBuilder()
            .setAuthor({ name: await Translate(`Pulei pra <${trackName}> <✅>`) })
            .setColor('#2f3136');

        inter.editReply({ embeds: [jumpEmbed] });
    }
}
