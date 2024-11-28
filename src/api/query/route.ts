import {
  MedusaRequest,
  MedusaResponse
} from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const data = await query.graph({
    entity: "post",
    fields: ["id", "title"],
  })

  res.json({ ...data })
}
