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
