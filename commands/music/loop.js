const { QueueRepeatMode, useQueue } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'loop',
    description:('Liga o loop de um ou mais sons ou da fila inteira'),
    voiceChannel: true,
    options: [
        {
            name: 'acao',
            description:('Que ação você quer fazer no loop'),
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: 'Fila', value: 'ligar_loop_fila' },
                { name: 'Desligar', value: 'desligar_loop' },
                { name: 'Som', value: 'ligar_loop_som' },
                { name: 'Autoplay', value: 'ligar_autoplay' },
            ],
        }
    ],

   async execute({ inter }) {
        const queue = useQueue(inter.guild);
        const errorMessage = await Translate(`Deu merda aqui... <❌>`);
        let baseEmbed = new EmbedBuilder()
            .setColor('#2f3136');

        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`Não tem música tocando, <${inter.member}>... <❌>`) });

        switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
            case 'ligar_loop_fila': {
                if (queue.repeatMode === QueueRepeatMode.TRACK) return inter.editReply({ content: `You must first disable the current music in the loop mode (\`/loop Disable\`) ${inter.member}... try again ? ❌` });

                const success = queue.setRepeatMode(QueueRepeatMode.QUEUE);
                baseEmbed.setAuthor({ name: success ? errorMessage : await Translate(`Repeat mode enabled the whole queue will be repeated endlessly <🔁>`) })

                return inter.editReply({ embeds: [baseEmbed] });
            }
            case 'desligar_loop': {
                if (queue.repeatMode === QueueRepeatMode.OFF) return inter.editReply({ content: await Translate(`You must first enable the loop mode <(/loop Queue or /loop Song)> <${inter.member}>... ? <❌>`) });

                const success = queue.setRepeatMode(QueueRepeatMode.OFF);
                baseEmbed.setAuthor({ name: success ? errorMessage : await Translate(`Repeat mode disabled the queue will no longer be repeated <🔁>`) })

                return inter.editReply({ embeds: [baseEmbed] });
            }
            case 'ligar_loop_som': {
                if (queue.repeatMode === QueueRepeatMode.QUEUE) return inter.editReply({ content: await Translate(`You must first disable the current music in the loop mode <(\`/loop Disable\`)> <${inter.member}>... <❌>`) });

                const success = queue.setRepeatMode(QueueRepeatMode.TRACK);
                baseEmbed.setAuthor({ name: success ? errorMessage : await Translate(`Repeat mode enabled the current song will be repeated endlessly (you can end the loop with <\`/loop disable\` >)`) })

                return inter.editReply({ embeds: [baseEmbed] });
            }
            case 'ligar_autoplay': {
                if (queue.repeatMode === QueueRepeatMode.AUTOPLAY) return inter.editReply({ content: await Translate(`You must first disable the current music in the loop mode <(\`/loop Disable\`)> <${inter.member}>... <❌>`) });

                const success = queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
                baseEmbed.setAuthor({ name: success ? errorMessage : await Translate(`Autoplay enabled the queue will be automatically filled with similar songs to the current one <🔁>`) })

                return inter.editReply({ embeds: [baseEmbed] });
            }
        }
    }
}