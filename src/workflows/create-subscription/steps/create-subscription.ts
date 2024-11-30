import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"
import { LinkDefinition } from "@medusajs/framework/types"
import { SubscriptionInterval } from "src/modules/subscription/types"
import SubscriptionModuleService from "src/modules/subscription/service"
import { SUBSCRIPTION_MODULE } from "src/modules/subscription"

type StepInput = {
  cart_id: string
  order_id: string
  customer_id?: string
  subscription_data: {
    interval: SubscriptionInterval
    period: number
  }
}

const createSubscriptionStep = createStep(
  "create-subscription",
  async ({
    cart_id,
    order_id,
    customer_id,
    subscription_data,
  }: StepInput, { container }) => {
    const subscriptionModuleService: SubscriptionModuleService = container.resolve(SUBSCRIPTION_MODULE)
    const linkDefs: LinkDefinition[] = []

    const subscription = await subscriptionModuleService.createSubscriptions({
      ...subscription_data,
      metadata: {
        main_order_id: order_id,
      },
    })

    return new StepResponse({
      subscription: subscription[0],
      linkDefs,
    }, {
      subscription: subscription[0]
    })
  }, async ({ subscription }, { container }) => {
    // TODO implmement compensation
  }
)

export default createSubscriptionStep
