const { User, Discussion, Comment } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
        likeId: {
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
        commentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Comment,
                key: 'commentId'
            }
        },


    });
    return Like;
};
