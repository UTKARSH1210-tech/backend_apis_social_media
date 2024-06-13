const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, DataTypes);
db.Discussion = require('./discussion')(sequelize, DataTypes);
db.Hashtag = require('./hashtag')(sequelize, DataTypes);
db.Comment = require('./comment')(sequelize, DataTypes);
db.Like = require('./like')(sequelize, DataTypes);
db.Follow = require('./follow')(sequelize, DataTypes);

// Define relationships
db.User.hasMany(db.Discussion, { foreignKey: 'userId' });
db.Discussion.belongsTo(db.User, { foreignKey: 'userId' });

// db.Discussion.belongsToMany(db.Hashtag, { through: 'DiscussionHashtags' });
db.Hashtag.belongsTo(db.Discussion, { foreignKey: 'discussionId' });
db.Discussion.hasMany(db.Hashtag, { foreignKey: 'discussionId' })

db.User.hasMany(db.Comment, { foreignKey: 'userId' });
db.Comment.belongsTo(db.User, { foreignKey: 'userId' });

db.Discussion.hasMany(db.Comment, { foreignKey: 'discussionId' });
db.Comment.belongsTo(db.Discussion, { foreignKey: 'discussionId' });

// db.User.belongsToMany(db.User, { as: 'Followers', through: db.Follow, foreignKey: 'followingId' });
// db.User.belongsToMany(db.User, { as: 'Following', through: db.Follow, foreignKey: 'followerId' });

db.Discussion.hasMany(db.Like, { foreignKey: 'discussionId' });
db.Like.belongsTo(db.Discussion, { foreignKey: 'discussionId' });

db.Comment.hasMany(db.Like, { foreignKey: 'commentId' });
db.Like.belongsTo(db.Comment, { foreignKey: 'commentId' });

// db.Comment.belongsTo(db.Like, { foreignKey: 'likeId' });
// db.Like.hasMany(db.Comment, { foreignKey: 'likeId' });

db.User.hasMany(db.Like, { foreignKey: 'userId' });
db.Like.belongsTo(db.User, { foreignKey: 'userId' });

db.Follow.belongsTo(db.User, { foreignKey: 'followerId', as: 'follower' });
db.Follow.belongsTo(db.User, { foreignKey: 'followeeId', as: 'followee' });

db.User.hasMany(db.Follow, { foreignKey: 'followerId' });
db.User.hasMany(db.Follow, { foreignKey: 'followeeId' });

module.exports = db;
