const router = require('express').Router();
const { User } = require('../../models');
const { Post } = require('../../models');
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/:id', async (req, res) => {
    try {
      console.log("REQ.BODY",req.body)
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        post_id: req.params.id,
        username: req.session.username
      });
      console.log("IS IT REACHING HERE")
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;