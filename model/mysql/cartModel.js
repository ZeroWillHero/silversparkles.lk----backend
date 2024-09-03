module.exports = (sequelize, DataTypes) => {

    const Cart = sequelize.define("cart", {
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
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1 // Default quantity is 1
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        timestamps: true
    });

    return Cart;


}