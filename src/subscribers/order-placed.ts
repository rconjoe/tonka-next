import {
  SubscriberArgs,
  SubscriberConfig
} from "@medusajs/framework"

export default async function orderPlacedHandler({
  event
}: SubscriberArgs<{ id: string }>) {
  const orderId = event.data.id
  console.log(`The order ${orderId} was created.`)
}

export const config: SubscriberConfig = {
  event: "order.placed"
}
