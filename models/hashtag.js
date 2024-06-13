const { Discussion } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define('Hashtag', {
        hashtagId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: false
        },
        discussionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Discussion,
                key: 'discussionId'
            }
        }
    });
    return Hashtag;
};
