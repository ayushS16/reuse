module.exports = {
  async up(migration, Sequelize) {
    const tables = [
      [
        'Role',
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
          key: {
            type: Sequelize.STRING(50),
            field: 'key',
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
        'User',
        {
          id: {
            type: Sequelize.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          firstName: {
            type: Sequelize.STRING(100),
            field: 'firstName',
            allowNull: false,
          },
          lastName: {
            type: Sequelize.STRING(100),
            field: 'lastName',
            allowNull: true,
          },
          email: {
            type: Sequelize.STRING(100),
            field: 'email',
            allowNull: true,
          },
          phoneNumber: {
            type: Sequelize.STRING(20),
            field: 'phoneNumber',
            allowNull: true,
          },
          password: {
            type: Sequelize.STRING(200),
            field: 'password',
            allowNull: true,
          },
          otp: {
            type: Sequelize.INTEGER,
            field: 'otp',
            allowNull: true,
          },
          isResetPasswordOtp: {
            type: Sequelize.BOOLEAN,
            field: 'isResetPasswordOtp',
            allowNull: false,
            defaultValue: false,
          },
          otpExpiry: {
            type: 'timestamp without time zone',
            field: 'otpExpiry',
            allowNull: true,
          },
          isActive: {
            type: Sequelize.BOOLEAN,
            field: 'isActive',
            allowNull: false,
            defaultValue: true,
          },
          roleId: {
            type: Sequelize.BIGINT,
            field: 'roleId',
            allowNull: false,
            references: {
              model: 'Role',
              key: 'id',
            },
          },
          createdAt: {
            type: 'timestamp without time zone',
            field: 'createdAt',
            allowNull: false,
            defaultValue: Sequelize.NOW,
          },
          updatedAt: {
            type: 'timestamp without time zone',
            field: 'updatedAt',
            allowNull: true,
          },
        },
      ],
      [
        'Address',
        {
          id: {
            type: Sequelize.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          streetNumber: {
            type: Sequelize.STRING(100),
            field: 'streetNumber',
            allowNull: true,
          },
          streetName: {
            type: Sequelize.STRING(100),
            field: 'streetName',
            allowNull: true,
          },
          apartment: {
            type: Sequelize.STRING(100),
            field: 'apartment',
            allowNull: true,
          },
          zipCode: {
            type: Sequelize.STRING(20),
            field: 'zipCode',
            allowNull: true,
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
          cityId: {
            type: Sequelize.INTEGER,
            field: 'cityId',
            allowNull: false,
            references: {
              model: 'CityMaster',
              key: 'id',
            },
          },
          createdAt: {
            type: 'timestamp without time zone',
            field: 'createdAt',
            allowNull: false,
            defaultValue: Sequelize.NOW,
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
    const tables = ['Role', 'User', 'Address'];

    // Drop each table one by one
    return tables
      .map((table) => migration.dropTable.bind(migration, table))
      .reduce((prev, curr) => prev.then(curr), Promise.resolve());
  },
};
