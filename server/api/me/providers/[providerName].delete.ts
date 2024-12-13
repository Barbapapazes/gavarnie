export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const providerName = getRouterParam(event, 'providerName')

  // A user must have at least one provider linked
  const providers = (['twitch', 'github', 'google'] as const).filter(provider => user[`${provider}Id`])

  if (providers.length === 1) {
    throw createError({
      statusCode: 400,
      message: 'You must have at least one provider linked',
    })
  }

  if (providerName === 'twitch') {
    await updateUser(user.id, {
      twitchId: null,
      twitchToken: null,
    })
    await updateUserSession(event, {
      ...user,
      twitchId: null,
    })
  }
  else if (providerName === 'github') {
    await updateUser(user.id, {
      githubId: null,
      githubToken: null,
    })
    await updateUserSession(event, {
      ...user,
      githubId: null,
    })
  }
  else if (providerName === 'google') {
    await updateUser(user.id, {
      googleId: null,
      googleToken: null,
    })
    await updateUserSession(event, {
      ...user,
      googleId: null,
    })
  }
  else {
    throw createError({
      statusCode: 400,
      message: 'Invalid provider',
    })
  }

  return sendNoContent(event, 204)
})
