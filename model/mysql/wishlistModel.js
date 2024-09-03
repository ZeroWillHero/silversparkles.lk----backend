module.exports = (sequelize, DataTypes) => {

    const Wishlist = sequelize.define("wishlist", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id'
            }
        }
    }, {
        timestamps: true
    });

    return Wishlist

}