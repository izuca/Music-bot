module.exports = {
	name:'user',
	description:'Mostra info sobre o usuário.',

	async execute({inter}) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		 inter.editReply(`Esse comando foi executado por ${inter.member}, que se juntou ao grupo em ${interaction.member.joinedAt}.`);
	},
};

