module.exports = {
  up(migration, Sequelize) {
    const tables = [
      [
        'Business',
        {
          id: {
            type: Sequelize.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          businessName: {
            type: Sequelize.STRING(100),
            field: 'businessName',
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING(100),
            field: 'email',
            allowNull: false,
          },
          phoneNumber: {
            type: Sequelize.STRING(20),
            field: 'phoneNumber',
            allowNull: false,
          },
          createdBy: {
            type: Sequelize.BIGINT,
            field: 'createdBy',
            allowNull: false,
            references: {
              model: 'User',
              key: 'id',
            },
          },
          createdAt: {
            type: 'timestamp without time zone',
            field: 'createdAt',
            allowNull: false,
            defaultValue: Sequelize.NOW,
          },
          updateBy: {
            type: Sequelize.BIGINT,
            field: 'updateBy',
            allowNull: true,
            references: {
              model: 'User',
              key: 'id',
            },
          },
          updatedAt: {
            type: 'timestamp without time zone',
            field: 'updatedAt',
            allowNull: true,
          },
        },
      ],
      [
        'BusinessUser',
        {
          id: {
            type: Sequelize.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          businessId: {
            type: Sequelize.INTEGER,
            field: 'businessId',
            allowNull: false,
            references: {
              model: 'Business',
              key: 'id',
            },
          },
          userId: {
            type: Sequelize.BIGINT,
            field: 'userId',
            allowNull: false,
            references: {
              model: 'User',
              key: 'id',
            },
          },
          isActive: {
            type: Sequelize.BOOLEAN,
            field: 'isActive',
            allowNull: false,
            defaultValue: true,
          },
          createdBy: {
            type: Sequelize.BIGINT,
            field: 'createdBy',
            allowNull: false,
            references: {
              model: 'User',
              key: 'id',
            },
          },
          createdAt: {
            type: 'timestamp without time zone',
            field: 'createdAt',
            allowNull: false,
            defaultValue: Sequelize.NOW,
          },
          updateBy: {
            type: Sequelize.BIGINT,
            field: 'updateBy',
            allowNull: true,
            references: {
              model: 'User',
              key: 'id',
            },
          },
          updatedAt: {
            type: 'timestamp without time zone',
            field: 'updatedAt',
            allowNull: true,
          },
        },
      ],
    ];

    function getCreateTable(table) {
      return () => migration.createTable(table[0], table[1]);
    }

    let promises = Promise.resolve();

    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];
      console.log(table);
      promises = promises.then(getCreateTable(table));
    }

    return promises;
  },

  down(migration) {
    const tables = ['Business', 'BusinessUser'];

    // Drop each table one by one
    return tables
      .map((table) => migration.dropTable.bind(migration, table))
      .reduce((prev, curr) => prev.then(curr), Promise.resolve());
  },
};
