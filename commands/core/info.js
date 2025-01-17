const {EmbedBuilder} = require('discord.js');


module.exports = {
    name:'info',
    description:'Descubra mais sobre o Segurança do Grupo 2.0',

	async execute({inter}) {
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('A serviço do bem-estar dos Membros do Grupo!')
            .setDescription(`Prazer ${inter.member}! Sou o novo segurança do grupo e estou a seu dispor`)
            .setImage(`https://lh3.googleusercontent.com/pw/AP1GczN2GXEqFYxi8RfVHcxEWDB46G7ik37-BJ94yH4YDm2UOHCAaZEfuBLQC5v93aIkWVwTYd_6z5DSRolp0eFgCX6qFuRd8BfZpY6vkZAxGnw78zSzKvp76hwxfS4ezWv9macNSV06pxA8CtC-7UVz_cXaFg=w800-h800-s-no?authuser=0`)
            .setFooter({ text: 'Dica: jamais irrite o ADM' });
        inter.editReply({ embeds: [exampleEmbed] });
	}
};
