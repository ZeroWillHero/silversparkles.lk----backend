const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorsAliases: false,
}
)

sequelize.authenticate()
    .then(() => {
        console.log('MySql connected..')
    })
    .catch(err => {
        console.log('Error' + err)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require('./productModel.js')(sequelize, DataTypes)
db.user = require('./userModel.js')(sequelize, DataTypes)
db.wishlist = require('./wishlistModel.js')(sequelize, DataTypes);
db.cart = require('./cartModel.js')(sequelize, DataTypes);
db.order = require('./orderModel.js')(sequelize, DataTypes);
db.ads = require('./adsModel.js')(sequelize, DataTypes);
db.review = require('./reviewModel.js')(sequelize, DataTypes);
db.collabs = require('./collabsModel.js')(sequelize, DataTypes);

// Define relationships
// wishlist table relationship with user and product
db.user.hasMany(db.wishlist, { foreignKey: 'userId' });
db.wishlist.belongsTo(db.user, { foreignKey: 'userId' });

db.products.hasMany(db.wishlist, { foreignKey: 'productId' });
db.wishlist.belongsTo(db.products, { foreignKey: 'productId' });

// cart table relationship with user and product
db.user.hasMany(db.cart, { foreignKey: 'userId' });
db.cart.belongsTo(db.user, { foreignKey: 'userId' });

db.products.hasMany(db.cart, { foreignKey: 'productId' });
db.cart.belongsTo(db.products, { foreignKey: 'productId' });

// oder table relationship with user and product
db.user.hasMany(db.order, { foreignKey: 'userId' });
db.order.belongsTo(db.user, { foreignKey: 'userId' });

db.products.hasMany(db.order, { foreignKey: 'productId' });
db.order.belongsTo(db.products, { foreignKey: 'productId' });

// Review table relationship with user and product
db.user.hasMany(db.review, { foreignKey: 'userId' });
db.review.belongsTo(db.user, { foreignKey: 'userId' });

db.products.hasMany(db.review, { foreignKey: 'productId' });
db.review.belongsTo(db.products, { foreignKey: 'productId' });

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    }).catch(err => {
        console.log('re-sync Error',err)
    })
module.exports = db