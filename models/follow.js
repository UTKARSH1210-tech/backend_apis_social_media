const { Follow, User } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Follow = sequelize.define('Follow', {
        followId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        followerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'userId'
            }
        },
        followeeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'userId'
            }
        }

    });
    return Follow;
};
