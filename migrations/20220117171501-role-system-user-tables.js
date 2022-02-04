module.exports = {
  up(migration, Sequelize) {
    const tables = [
      [
        'RoleTest',
        {
          id: {
            type: Sequelize.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
          },
          roleName: {
            type: Sequelize.STRING(32),
            field: 'roleName',
            allowNull: false,
          },
          status: {
            type: Sequelize.ENUM('active', 'inactive'),
            field: 'status',
            allowNull: false,
            defaultValue: 'active',
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
        'SystemUser',
        {
          id: {
            type: Sequelize.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          cognitoUserPoolId: {
            type: Sequelize.STRING(128),
            field: 'cognitoUserPoolId',
            allowNull: false,
          },
          firstName: {
            type: Sequelize.STRING(32),
            field: 'firstName',
            allowNull: false,
          },
          lastName: {
            type: Sequelize.STRING(32),
            field: 'lastName',
            allowNull: true,
          },
          birthDate: {
            type: Sequelize.DATEONLY,
            field: 'birthDate',
            allowNull: false,
          },
          country: {
            type: Sequelize.STRING(64),
            field: 'country',
            allowNull: false,
          },
          state: {
            type: Sequelize.STRING(64),
            field: 'state',
            allowNull: false,
          },
          city: {
            type: Sequelize.STRING(64),
            field: 'city',
            allowNull: true,
          },
          zipCode: {
            type: Sequelize.STRING(10),
            field: 'zipCode',
            allowNull: true,
          },
          apartment: {
            type: Sequelize.STRING(64),
            field: 'apartment',
            allowNull: true,
          },
          streetName: {
            type: Sequelize.STRING(64),
            field: 'streetName',
            allowNull: true,
          },
          streetNumber: {
            type: Sequelize.STRING(32),
            field: 'streetNumber',
            allowNull: true,
          },
          mobileNumberCountryCode: {
            type: Sequelize.STRING(10),
            field: 'mobileNumberCountryCode',
            allowNull: false,
          },
          mobileNumberAreaCode: {
            type: Sequelize.STRING(10),
            field: 'mobileNumberAreaCode',
            allowNull: false,
          },
          mobileNumber: {
            type: Sequelize.STRING(10),
            field: 'mobileNumber',
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING(128),
            field: 'email',
            allowNull: false,
          },
          username: {
            type: Sequelize.STRING(128),
            field: 'username',
            allowNull: false,
          },
          avatar: {
            type: Sequelize.STRING(256),
            field: 'avatar',
            allowNull: true,
          },
          status: {
            type: Sequelize.ENUM('active', 'inactive', 'blocked'),
            field: 'status',
            allowNull: false,
            defaultValue: 'active',
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
        'SystemUserRole',
        {
          id: {
            type: Sequelize.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          systemUserId: {
            type: Sequelize.BIGINT,
            field: 'systemUserId',
            allowNull: false,
            references: {
              model: 'SystemUser',
              key: 'id',
            },
          },
          roleId: {
            type: Sequelize.INTEGER,
            field: 'roleId',
            allowNull: false,
            references: {
              model: 'RoleTest',
              key: 'id',
            },
          },
          status: {
            type: Sequelize.ENUM('active', 'inactive'),
            field: 'status',
            allowNull: false,
            defaultValue: 'active',
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
      return () =>
        migration.createTable(table[0], table[1], table[2], table[3]);
    }

    let promises = Promise.resolve();

    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];
      promises = promises.then(getCreateTable(table));
    }

    return promises;
  },

  down(migration) {
    const tables = ['RoleTest', 'SystemUser', 'SystemUserRole'];

    // Drop each table one by one
    return tables
      .map((table) => migration.dropTable.bind(migration, table))
      .reduce((prev, curr) => prev.then(curr), Promise.resolve());
  },
};
