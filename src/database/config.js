const Sequelize = require('sequelize');

const name = 'Config';

module.exports = {
	name,
	init: async (client) => {
		const table = client.sequelize.define(name, {
			channelId: {
				type: Sequelize.STRING,
				unique: true,
			},
		});

		table.sync();

		return table;
	}
};
