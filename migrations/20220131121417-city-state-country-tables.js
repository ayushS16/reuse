module.exports = {
  up(migration, Sequelize) {
    const tables = [
      [
        'CountryMaster',
        {
          id: {
            type: Sequelize.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
          },
          name: {
            type: Sequelize.STRING(50),
            field: 'name',
            allowNull: false,
          },
          code: {
            type: Sequelize.STRING(50),
            field: 'code',
            allowNull: false,
          },
          createdAt: {
            type: 'timestamp without time zone',
            field: 'createdAt',
            allowNull: false,
            defaultValue: Sequelize.NOW,
          },
        },
      ],
      [
        'StateMaster',
        {
          id: {
            type: Sequelize.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
          },
          name: {
            type: Sequelize.STRING(50),
            field: 'name',
            allowNull: false,
          },
          code: {
            type: Sequelize.STRING(50),
            field: 'code',
            allowNull: false,
          },
          countryId: {
            type: Sequelize.INTEGER,
            field: 'countryId',
            allowNull: false,
            references: {
              model: 'CountryMaster',
              key: 'id',
            },
          },
          createdAt: {
            type: 'timestamp without time zone',
            field: 'createdAt',
            allowNull: false,
            defaultValue: Sequelize.NOW,
          },
        },
      ],
      [
        'CityMaster',
        {
          id: {
            type: Sequelize.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
          },
          name: {
            type: Sequelize.STRING(50),
            field: 'name',
            allowNull: false,
          },
          code: {
            type: Sequelize.STRING(50),
            field: 'code',
            allowNull: false,
          },
          stateId: {
            type: Sequelize.INTEGER,
            field: 'stateId',
            allowNull: false,
            references: {
              model: 'StateMaster',
              key: 'id',
            },
          },
          createdAt: {
            type: 'timestamp without time zone',
            field: 'createdAt',
            allowNull: false,
            defaultValue: Sequelize.NOW,
          },
        },
      ],
    ];

    function getCreateTable(table) {
      return () => migration.createTable(table[0], table[1], table[2]);
    }

    let promises = Promise.resolve();

    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];
      promises = promises.then(getCreateTable(table));
    }

    return promises;
  },

  down(migration) {
    const tables = ['CityMaster', 'StateMaster', 'CountryMaster'];

    // Drop each table one by one
    return tables
      .map((table) => migration.dropTable.bind(migration, table))
      .reduce((prev, curr) => prev.then(curr), Promise.resolve());
  },
};
