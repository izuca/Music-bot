const { QueryType, useMainPlayer } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'play',
    description:("Toque uma música"),
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description:('O lixo de música que você quer ouvir'),
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter, client }) {
        const player = useMainPlayer();

        const song = inter.options.getString('song');
        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        let defaultEmbed = new EmbedBuilder().setColor('#2f3136');

        if (!res?.tracks.length) {
            defaultEmbed.setAuthor({ name: await Translate(`Essa música non ecsiste! <❌>`) });
            return inter.editReply({ embeds: [defaultEmbed] });
        }

        try {
            const { track } = await player.play(inter.member.voice.channel, song, {
                nodeOptions: {
                    metadata: {
                        channel: inter.channel
                    },
                    volume: client.config.opt.volume,
                    leaveOnEmpty: client.config.opt.leaveOnEmpty,
                    leaveOnEmptyCooldown: client.config.opt.leaveOnEmptyCooldown,
                    leaveOnEnd: client.config.opt.leaveOnEnd,
                    leaveOnEndCooldown: client.config.opt.leaveOnEndCooldown,
                }
            });

            defaultEmbed.setAuthor({ name: await Translate(`Loading <${track.title}> to the queue... <✅>`) });
            await inter.editReply({ embeds: [defaultEmbed] });
        } catch (error) {
            console.log(`Play error: ${error}`);
            defaultEmbed.setAuthor({ name: await Translate(`Me censuraram! <❌>`) });
            return inter.editReply({ embeds: [defaultEmbed] });
        }
    }
}
