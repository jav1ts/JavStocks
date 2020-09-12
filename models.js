const { Sequelize } = require('sequelize');
require('dotenv').config();
// const bcrypt = require('bcrypt')

const db = new Sequelize(
    process.env.DATABASE_URL || 'postgres://localhost:5432/stocks_db',
    {
        dialect: 'postgres',
        database: 'stocks_db',
        define: {
            underscored: true,
            returning: true
        }
    });

const User = db.define('users', {
    email: {
        type: Sequelize.toString,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    balance: {
        type: Sequelize.INTEGER
    }
});

const Stock = db.define('stocks', {
    companyName: Sequelize.STRING,
    ticker: Sequelize.STRING,
    qty: Sequelize.INTEGER
})

User.hasMany(Stock, {
    onDelete: 'cascade',
});

Stock.belongsTo(User)

// User.beforeCreate(async (user, options) => {
//     const hashedPassword = await bcrypt.has(user.password, 12)
//     user.password = hashedPassword;
// })

module.exports = { User, Stock, db };