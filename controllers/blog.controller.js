const BlogService = require("../services/blog.service");
const Blog_T = new BlogService();
const joi = require("joi");

class blogCtrl {
  all_blogs = async (req, res) => {
    try {
      const result = await Blog_T.all_blogs();
      res.json({ result, id: req.user_id });
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  new_blog = async (req, res) => {
    const schemaValidate = joi.object({
      title: joi.string().max(50).required(),
      post: joi.string().required(),
      post_url: joi.array()
    });
    const schemaValidated = schemaValidate.validate(req.body);
    if (schemaValidated.error) {
      return res.status(415).json(schemaValidated.error.details);
    }
    try {
      const result = await Blog_T.add_blog(req.user_id, req.body);
      res.status(202).json({ result });
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  edit_blog = async (req, res) => {
    const schemaValidate = joi.object({
      title: joi.string().max(50),
      post: joi.string(),
      post_url: joi.array()
    });
    const schemaValidated = schemaValidate.validate(req.body);
    if (schemaValidated.error) {
      return res.status(415).json(schemaValidated.error.details);
    }
    try {
      const result = await Blog_T.edit_blog(
        req.user_id,
        Number(req.params.id),
        req.body
      );
      if (typeof result == "object") {
        return res.status(202).json({ result });
      }
      res.status(404).json({ result });
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  likes_dislikes = async (req, res) => {
    try {
      console.log(req.body, "this is the req");
      // console.log(`${req.params.id} --> paramas, ${req.user_id} --> user_id, ${req.body} --> body.`);
      const result = await Blog_T.likes_dislikes(
        Number(req.params.id),
        req.user_id,
        req.body
      );
      res.json({ result });
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  del_blog = async (req, res) => {
    try {
      const result = await Blog_T.del_blog(Number(req.params.id), req.user_id);
      res.json({ result });
    } catch (err) {
      res.status(400).json(err.message);
    }
  };
}

module.exports = blogCtrl;
