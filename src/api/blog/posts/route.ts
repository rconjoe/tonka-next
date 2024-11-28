import type {
  MedusaRequest,
  MedusaResponse
} from "@medusajs/framework/http"
import { RemoteLink } from "@medusajs/framework/modules-sdk"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { createPostWorkflow } from "src/workflows/create-post"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {

  const remoteLink: RemoteLink = req.scope.resolve(ContainerRegistrationKeys.REMOTE_LINK)
  const { result: post } = await createPostWorkflow(req.scope)
    .run({
      input: {
        title: "My Post",
      }
    })

  res.json({
    post
  })
}
