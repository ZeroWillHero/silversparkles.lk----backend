module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("ads", {
        videoUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        images: {
            type: DataTypes.TEXT, 
            allowNull: true
        }

    }, {
        timestamps: true
    })

    return Product

}
