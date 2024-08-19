import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  emailToVerify: text('email_to_verify'),
  name: text('name').notNull(),
  avatar: text('avatar'),
  githubId: integer('github_id').unique(),
  githubToken: text('github_token'),
  twitchId: text('twitch_id').unique(),
  twitchToken: text('twitch_token'),
  verifiedAt: text('verified_at'),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => sql`(current_timestamp)`),
  updatedAt: text('updated_at')
    .notNull()
    .$defaultFn(() => sql`(current_timestamp)`)
    .$onUpdateFn(() => sql`(current_timestamp)`),
})
