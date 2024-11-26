import { model } from "@medusajs/framework/utils";

const Post = model.define("post", {
  id: model.id().primaryKey(),
  title: model.text(),
})

export default Post
