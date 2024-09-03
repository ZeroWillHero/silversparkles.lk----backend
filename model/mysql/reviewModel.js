module.exports = (sequelize, DataTypes) => {

    const Review = sequelize.define("review", {
        userId :{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },

        productId :{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id'
            }
        },

        rating :{
            type : DataTypes.INTEGER,
            allowNull : false,
        }


    }, {
        timestamps: true
    })

    return Review;

}