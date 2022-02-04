module.exports = {
  async up(queryInterface) {
    const roles = [
      {
        id: 1,
        roleName: 'SuperAdmin',
        status: 'active',
        createdAt: new Date(),
      },
      { id: 2, roleName: 'User', status: 'active', createdAt: new Date() },
    ];

    await queryInterface.bulkInsert('RoleTest', roles, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('RoleTest', null, {});
  },
};
