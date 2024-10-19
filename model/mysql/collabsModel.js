module.exports = (sequelize, DataTypes) => {
    const Collabs = sequelize.define({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
        {
            timestamps: true
        }
    );

    return Collabs;
};