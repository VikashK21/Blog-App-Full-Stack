const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class CommentServ {
  async all_comments(blog_id) {
    try {
      const result = await prisma.comment.findMany({ where: { blog_id }, include: {commenter: true} });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async sendComment(comment) {
    try {
      const result = await prisma.comment.create({
        data: comment
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async replyComment(reply, id, userId) {
    try {
      const result2 = await prisma.comment.findUnique({ where: { id } });
      let replyMessage = {};
      replyMessage[reply.replyer_id] = [reply.reply_msg];
      console.log(result2.reply_msg[0]);
      if (result2.reply_msg.length > 0 ) {
        let laterMessage = JSON.parse(result2.reply_msg[0]);
        console.log(laterMessage.hasOwnProperty(userId));
        if (laterMessage.hasOwnProperty(userId)) {
          console.log('vikash');
          (laterMessage[userId]).push(reply.reply_msg)
        }
        replyMessage = {...replyMessage, ...laterMessage}
      }
      const result = await prisma.comment.update({
        where: { id },
        data: {
          reply_msg: JSON.stringify(replyMessage)
        }
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = CommentServ;
