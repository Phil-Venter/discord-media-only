const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('config')
		.setDescription('Toggle media mode on channel.')
		.addStringOption(option => option.setName('channel').setDescription('Channel to watch for.')),

	async execute(client, interaction) {
		const channelId = await interaction.options.getString('channel') ?? interaction.channelId;

		const config = await client.database.Config;
		const response = await config.findOne({ where: { channelId } });

		if (!response) {
			await config.create({ channelId: channelId ?? interaction.channelId });
			await interaction.reply({ content: `Shutterbug set up on <#${channelId}>`, ephemeral: true });
		} else {
			await response.destroy();
			await interaction.reply({ content: `Shutterbug removed from <#${channelId}>`, ephemeral: true });
		}
	},
};