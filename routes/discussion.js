const express = require('express');
const router = express.Router();
const { Discussion, Hashtag, User, Comment, Like } = require('../models');
const auth = require('../middlewares/auth');
const { Op } = require('sequelize');

// Create Discussion
router.post('/', async (req, res) => {
    try {
        const { userId, text, image, hashtags } = req.body;
        const discussion = await Discussion.create({ userId, text, image });
        if (hashtags && hashtags.length) {
            const hashtagInstances = hashtags.map(tag => ({ tag, discussionId: discussion.discussionId }));
            await Hashtag.bulkCreate(hashtagInstances);
        }
        res.status(201).json(discussion);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error', error });
    }
});

// Update Discussion
router.put('/:discussionId', async (req, res) => {
    try {
        const { discussionId } = req.params;
        const { text, image, hashtags } = req.body;
        const discussion = await Discussion.findByPk(discussionId);
        if (!discussion) return res.status(404).json({ message: 'Discussion not found' });
        if (text) discussion.text = text;
        if (image) discussion.image = image;
        await discussion.save();
        if (hashtags && hashtags.length) {
            await Hashtag.destroy({ where: { discussionId: discussion.discussionId } });
            const hashtagInstances = hashtags.map(tag => ({ tag, discussionId: discussion.discussionId }));
            await Hashtag.bulkCreate(hashtagInstances);
        }
        res.status(200).json(discussion);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error', error });
    }
});

// Delete Discussion
router.delete('/:discussionId', async (req, res) => {
    try {
        await Discussion.destroy({ where: { discussionId: req.params.id } });
        res.json({ message: 'Discussion deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete discussion' });
    }
});

// Get Discussions by Tag
router.get('/tags', async (req, res) => {
    try {
        const { tags } = req.body;
        // const { tags } = req.query;
        // console.log(tags)
        // const tagsArray = tags.split(',');
        const tagsArray = tags;
        console.log("this is tags array", tagsArray)
        const discussions = await Discussion.findAll({
            include: {
                model: Hashtag,
                where: { tag: { [Op.in]: tagsArray } },
                attributes: []
            }
        });
        res.status(200).json(discussions);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error', error });
    }
});



// Get Discussions by Text
router.get('/search', async (req, res) => {
    try {
        const { text } = req.query;
        const discussions = await Discussion.findAll({
            where: { text: { [Op.iLike]: `%${text}%` } }
        });
        res.status(200).json(discussions);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Comment on discussion
router.post('/comment/:discussionId', async (req, res) => {
    try {
        const { discussionId } = req.params;
        const { text, userId } = req.body;
        console.log(text, userId)
        const comment = await Comment.create({ discussionId, userId, text });
        res.status(201).json(comment);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error', error });
    }
});

// Like a discussion
router.post('/like/:discussionId', async (req, res) => {
    try {
        const { discussionId } = req.params;
        const { userId } = req.body;
        const like = await Like.create({ discussionId, userId });
        res.status(201).json(like);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Like a comment
router.post('/like/comment/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId } = req.body;
        const like = await Like.create({ commentId, userId });
        res.status(201).json(like);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error', error });
    }
});

// Reply to a comment
router.post('/reply/comment/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        const { text, userId } = req.body;
        const reply = await Comment.create({ parentId: commentId, userId, text });
        res.status(201).json(reply);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Delete a comment
router.delete('/comment/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findByPk(commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        await comment.destroy();
        res.status(204).json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Update a Comment
router.put('/comment/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        const { text } = req.body;
        const comment = await Comment.findByPk(commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        comment.text = text;
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Like Counter 
router.get('/likeCount/:discussionId', async (req, res) => {
    try {
        const { discussionId } = req.params;
        // const { userId } = req.body;
        const totalLikes = await Like.count({
            where: { discussionId }
        });

        res.status(201).json({ totalLikes });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


router.get('/gethashtages/:hashtag', async (req, res) => {
    try {
        const { hashtag } = req.params;

        const discussions = await Discussion.findAll({
            include: [{
                model: Hashtag,
                where: { tag: hashtag },
                // through: { attributes: [] }  // Exclude join table attributes
            }]
        });

        res.status(200).json(discussions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});



module.exports = router;
