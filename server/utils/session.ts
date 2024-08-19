import type { H3Event } from 'h3'
import type { User, UserSessionRequired } from '#auth-utils'

/**
 * Require a verified user session, throw a 401 error if the user is not verified
 * @param event
 * @param opts Options to customize the error message and status code
 * @param opts.statusCode The status code to use for the error (defaults to 401)
 * @param opts.message The message to use for the error (defaults to Unauthorized)
 */
export async function requireVerifiedUserSession(event: H3Event, opts: { statusCode?: number, message?: string } = {}): Promise<UserSessionRequired> {
  const userSession = await getUserSession(event)

  if (!userSession.user || !userSession.user.verifiedAt) {
    throw createError({
      statusCode: opts.statusCode || 401,
      message: opts.message || 'Unauthorized',
    })
  }

  return userSession as UserSessionRequired
}

export async function updateUserSession(event: H3Event, user: User) {
  await replaceUserSession(event, { user })
}
