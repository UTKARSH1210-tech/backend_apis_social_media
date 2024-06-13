const { User } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Discussion = sequelize.define('Discussion', {
        discussionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'userId'
            }
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });

    // Discussion.belongsTo(User, { foreignKey: 'userId' });
    // User.hasMany(Discussion, { foreignKey: 'userId' });
    return Discussion;
};
