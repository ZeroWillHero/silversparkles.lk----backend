module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Name is required' },
                notEmpty: { msg: 'Name is required' }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: { msg: 'Must be a valid email' },
                notNull: { msg: 'Email is required' },
                notEmpty: { msg: 'Email is required' }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Password is required' },
                notEmpty: { msg: 'Password is required' }
            }
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'pending'
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        }
    }, {
        timestamps: true
    })

    return User

}