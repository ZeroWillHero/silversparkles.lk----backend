module.exports = (sequelize, DataTypes) => {
    const Collabs = sequelize.define('Collabs', { // Add model name 'Collabs'
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        images: { // Change 'image' to 'images' to match the controller
            type: DataTypes.TEXT, // Use TEXT to store JSON string
            allowNull: false
        }
    }, {
        timestamps: true
    });

    return Collabs;
};