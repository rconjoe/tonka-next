import { MedusaService } from "@medusajs/framework/utils";
import Post from "./models/post";

class BlogModuleService extends MedusaService({
  Post,
}) { }

export default BlogModuleService
