module.exports = {
	name: 'messageCreate',
	async execute(client, interaction) {
		const { channelId } = interaction;

		const config = await client.database.Config;
		const response = await config.findOne({ where: { channelId } });

		if (response && ![...interaction.attachments].length) {
			await interaction.delete();
		}
	}
};