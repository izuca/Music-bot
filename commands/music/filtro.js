const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { AudioFilters, useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'filtro',
    description:('Adicione um filtro à música'),
    voiceChannel: true,
    options: [
        {
            name: 'filter',
            description:('O filtro que tu quer adicionar'),
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [...Object.keys(AudioFilters.filters).map(m => Object({ name: m, value: m })).splice(0, 25)],
        }
    ],

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`Não tem música tocando, <${inter.member}>... <❌>`) });

        const actualFilter = queue.filters.ffmpeg.getFiltersEnabled()[0];
        const selectedFilter = inter.options.getString('filter');

        const filters = [];
        queue.filters.ffmpeg.getFiltersDisabled().forEach(f => filters.push(f));
        queue.filters.ffmpeg.getFiltersEnabled().forEach(f => filters.push(f));

        const filter = filters.find((x) => x.toLowerCase() === selectedFilter.toLowerCase().toString());

        let msg = await Translate (`Esse filtro non ecsiste! <❌ \n>`) +
            (actualFilter ? await Translate(`Meti um <**${actualFilter}**. \n>`) : "") +
            await Translate(`Lista de Filtros:`);
        filters.forEach(f => msg += `- **${f}**`);

        if (!filter) return inter.editReply({ content: msg });

        await queue.filters.ffmpeg.toggle(filter);

        const filterEmbed = new EmbedBuilder()
            .setAuthor({ name: await Translate(`O filtro <${filter}> tá <${queue.filters.ffmpeg.isEnabled(filter) ? 'on' : 'off'}> <✅\n> *Lembrete: se a música for grande, tu me quebra*`) })
            .setColor('#2f3136');

        return inter.editReply({ embeds: [filterEmbed] });
    }
}