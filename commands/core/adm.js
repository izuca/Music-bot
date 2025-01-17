const {EmbedBuilder} = require('discord.js');
const getRandomImage = require('../../random-image')

module.exports = {
    name:'adm',
    description: 'Saiba quem é o ADM',
	
    async execute({inter}) {
        const selectedImage = getRandomImage();
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Quem é o ADM Izuca?')
            .setDescription(`Caro ${inter.member}, aqui está um exemplo de quem é o ADM Izuca 🦧`)
            .setImage(`${selectedImage}`)
            .setFooter({ text: 'A deidade do grupo, muito piedoso' });
        inter.editReply({ embeds: [exampleEmbed] });
	}
};
