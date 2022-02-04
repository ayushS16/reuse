module.exports = {
  async up(queryInterface) {
    const roles = [
      {
        id: 1,
        name: 'Super Admin',
        key: 'super_admin',
        createdAt: new Date(),
      },
      {
        id: 2,
        name: 'Business Owner',
        key: 'business_owner',
        createdAt: new Date(),
      },
      {
        id: 3,
        name: 'Delivery Boy',
        key: 'delivery_boy',
        createdAt: new Date(),
      },
      {
        id: 4,
        name: 'Customer',
        key: 'customer',
        createdAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Role', roles, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Role', null, {});
  },
};
