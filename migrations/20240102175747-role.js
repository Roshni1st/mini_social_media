module.exports = {
  async up(db, client) {
    // user roles migrations 
    const roles = [
      {
        name :'admin'
      },
      {
        name : 'user'
      }
    ]
     await db.collection('roles').insertMany(roles)
  },

  async down(db, client) {
    await db.collection('roles').deleteMany({name:'admin'},{name:'user'})
  }
};
