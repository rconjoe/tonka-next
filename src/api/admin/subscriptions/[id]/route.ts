import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data: [subscription] } = await query.graph({
    entity: "subscription",
    fields: [
      "*",
      "orders.*",
      "customer_link.*",
      // @ts-expect-error
      ...(req.validatedQuery?.fields.split(",") || []),
    ],
    filters: {
      id: [req.params.id],
    },
  })

  res.json({
    subscription,
  })
}
