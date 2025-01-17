const { EmbedBuilder } = require('discord.js');
const { Translate } = require("../../process_tools");

module.exports = (queue, error) => {

    (async () => {
        const embed = new EmbedBuilder()
        .setAuthor({ name: await Translate(`ADM, o player deu ruim!`)})
        .setColor('#EE4B2B');

        queue.metadata.channel.send({ embeds: [embed] });

        console.log((`Error emitted from the player <${error.message}>`))
    })()
}
