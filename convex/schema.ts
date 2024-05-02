import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({

    users: defineTable({
    name: v.string(),
    isPinSet: v.boolean(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"])
 })
