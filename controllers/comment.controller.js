const CommentServ = require("../services/comment.service");
const Comment = new CommentServ();
const joi = require("joi");

class CommentCtrl {
  get_blogs_com = async (req, res) => {
    try {
      const result = await Comment.all_comments(Number(req.params.id));
      res.json({ result });
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  post_comment = async (req, res) => {
    const schemaValidate = joi.object({
      comment_msg: joi.string().required()
    });
    const schemaValidated = schemaValidate.validate(req.body);
    if (schemaValidated.error) {
      return res.status(415).json(schemaValidated.error.details);
    }
    try {
      const result = await Comment.sendComment({
        ...req.body,
        blog_id: Number(req.params.id),
        commenter_id: req.user_id
      });
      res.status(201).json({ result });
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  reply_comment = async (req, res) => {
    const schemaValidate = joi.object({
      reply_msg: joi.string().required()
    });
    const schemaValidated = schemaValidate.validate(req.body);
    if (schemaValidated.error) {
      return res.status(415).json(schemaValidated.error.details);
    }
    try {
      const result = await Comment.replyComment(
        {
          ...req.body,
          replyer_id: req.user_id
        },
        Number(req.params.id),
        req.user_id
      );
      res.status(202).json({ result });
    } catch (err) {
      res.status(400).json(err.message);
    }
  };
}

module.exports = CommentCtrl;
