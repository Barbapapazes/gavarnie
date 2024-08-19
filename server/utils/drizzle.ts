import { drizzle } from 'drizzle-orm/d1'

import * as schema from '../database/schema'

export { sql, eq, and, or, isNull } from 'drizzle-orm'

export const tables = schema

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema })
}

export type User = typeof schema.users.$inferSelect
export type UserInsert = typeof schema.users.$inferInsert
