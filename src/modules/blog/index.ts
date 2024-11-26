import BlogModuleService from "./service";
import { Module } from "@medusajs/framework/utils"

export const BLOG_MODULE = "blog"

// This export tells medusa the name of the module and its main service.
export default Module(BLOG_MODULE, {
  service: BlogModuleService
})
