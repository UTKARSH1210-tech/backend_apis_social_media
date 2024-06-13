const { Like, Discussion, User, Hashtag, Follow } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        commentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        discussionId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Discussion,
                key: 'discussionId'
            }
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
            type: DataTypes.TEXT,
            allowNull: false,
        },
        createdOn: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    });
    return Comment;
};
