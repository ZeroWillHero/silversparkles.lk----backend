module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("product", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.ENUM('chains', 'pendants', 'rings', 'earrings', 'bracelets', 'anklets', 'bundles', 'watches'),
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        metal: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weight: {
            type: DataTypes.TEXT,
           
        },
        length: {
            type: DataTypes.TEXT,
            
        },
        width: {
            type: DataTypes.TEXT,
            
        },
        ring_size: {
            type: DataTypes.TEXT,
            
        },
        color: {
            type: DataTypes.TEXT,
            
        },
        stone: {
            type: DataTypes.ENUM('natural-diamonds', 'american-diamonds'),
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM('men', 'women'),
            allowNull: false
        },
        iced_product: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        style: {
            type: DataTypes.ENUM('Cuban', 'Tennis', 'Figaro', 'Rope', 'Palm', 'Our Exclusive'),
            allowNull: true
        },
        review: {
            type: DataTypes.TEXT,
            defaultValue: JSON.stringify([
                { "one": "0" },
                { "two": "0" },
                { "three": "0" },
                { "four": "0" },
                { "five": "0" }
            ]),
            allowNull: false
        },
        images: {
            type: DataTypes.TEXT, 
            allowNull: false
        }

    }, {
        timestamps: true
    })

    return Product

}
