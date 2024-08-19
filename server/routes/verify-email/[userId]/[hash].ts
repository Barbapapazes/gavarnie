export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const userId = getRouterParam(event, 'userId')

  if (String(user.id) !== userId) {
    throw createError({ statusCode: 403, message: 'Forbidden' })
  }

  if (!user.emailToVerify) {
    return sendRedirect(event, '/profile')
  }

  const hash = getRouterParam(event, 'hash')
  const emailHashed = await hashEmail(user.emailToVerify)

  if (hash !== emailHashed) {
    throw createError({ statusCode: 400, message: 'Invalid hash' })
  }

  const updatedUser = {
    ...user,
    email: user.emailToVerify,
    emailToVerify: null,
    verifiedAt: new Date().toUTCString(),
  }
  await updateUser(user.id, { verifiedAt: updatedUser.verifiedAt })
  await updateUserSession(event, updatedUser)

  return sendRedirect(event, '/profile')
})
