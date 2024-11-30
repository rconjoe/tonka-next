import moment from "moment";
import { MedusaService } from "@medusajs/framework/utils";
import Subscription from "./models/subscription";
import {
  CreateSubscriptionData,
  SubscriptionData,
  SubscriptionInterval,
  SubscriptionStatus
} from "./types";

class SubscriptionModuleService extends MedusaService({
  Subscription
}) {

  // @ts-expect-error
  async createSubscriptions(
    data: CreateSubscriptionData | CreateSubscriptionData[]
  ): Promise<SubscriptionData[]> {
    const input = Array.isArray(data) ? data : [data]

    const subscriptions = await Promise.all(
      input.map(async (subscription) => {
        const subscriptionDate = subscription.subscription_date || new Date()
        const expirationDate = this.getExpirationDate({
          subscription_date: subscriptionDate,
          interval: subscription.interval,
          period: subscription.period,
        })

        return await super.createSubscriptions({
          ...subscription,
          subscription_date: subscriptionDate,
          last_order_date: subscriptionDate,
          next_order_date: this.getNextOrderDate({
            last_order_date: subscriptionDate,
            expiration_date: expirationDate,
            interval: subscription.interval,
            period: subscription.period,
          }),
          expiration_date: expirationDate,
        })
      })
    )

    return subscriptions
  }

  getNextOrderDate({
    last_order_date,
    expiration_date,
    interval,
    period,
  }: {
    last_order_date: Date
    expiration_date: Date
    interval: SubscriptionInterval
    period: number
  }): Date | null {
    const nextOrderDate = moment(last_order_date)
      .add(
        period,
        interval === SubscriptionInterval.MONTHLY ? "month" : "year"
      )
    const expirationMomentDate = moment(expiration_date)

    return nextOrderDate.isAfter(expirationMomentDate) ? null : nextOrderDate.toDate()
  }

  getExpirationDate({
    subscription_date,
    interval,
    period,
  }: {
    subscription_date: Date,
    interval: SubscriptionInterval,
    period: number
  }) {
    return moment(subscription_date)
      .add(
        period,
        interval === SubscriptionInterval.MONTHLY ? "month" : "year"
      ).toDate()
  }
}

export default SubscriptionModuleService
