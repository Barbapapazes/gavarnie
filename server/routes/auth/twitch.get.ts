export default defineOAuthTwitchEventHandler({
  config: {
    scope: ['user:read:email'],
  },
  async onSuccess(event, { user: oauthUser, tokens }) {
    const { user: userSession } = await getUserSession(event)

    // If the user is already signed in, link the account
    if (userSession?.id) {
      const user = await findUserById(userSession.id)

      if (user) {
        await updateUser(userSession.id, {
          twitchId: oauthUser.id,
          twitchToken: tokens.access_token,
        })

        await updateUserSession(event, {
          ...userSession,
          twitchId: oauthUser.id,
        })
        return sendRedirect(event, '/profile')
      }
    }

    // If the user is not signed in, search for an existing user with that Twitch ID
    // If it exists, sign in as that user and refresh the token
    let user = await findUserByTwitchId(oauthUser.id)
    if (user) {
      await updateUser(user.id, {
        twitchId: oauthUser.id,
        twitchToken: tokens.access_token,
      })

      await updateUserSession(event, {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        verifiedAt: user.verifiedAt,
        githubId: user.githubId,
        twitchId: oauthUser.id,
      },
      )
      return sendRedirect(event, '/profile')
    }

    // If the user is not signed in, search for an existing user with that email address without a Twitch ID
    // If it exists, tells the user to sign in with that account and link the Twitch account
    user = await findUserBy(
      and(
        eq(tables.users.email, oauthUser.email),
        isNull(tables.users.twitchId),
      ),
    )
    if (user) {
      await updateSession(event,
        {
          password: useRuntimeConfig(event).session.password,
        },
        {
          message: 'An existing account for this email already exists. Please login and visit your profile settings to add support for Twitch authentication.',
        })
      return sendRedirect(event, '/login')
    }

    // If the user is not signed in and no user exists with that Twitch ID or email address, create a new user
    const createdUser = await createUser({
      name: oauthUser.display_name as string,
      email: oauthUser.email as string,
      avatar: oauthUser.profile_image_url as string,
      twitchId: oauthUser.id as string,
      twitchToken: tokens.access_token as string,
      verifiedAt: new Date().toUTCString(),
    })

    await updateUserSession(event, {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      avatar: createdUser.avatar,
      verifiedAt: createdUser.verifiedAt,
      twitchId: oauthUser.id,
    })
    return sendRedirect(event, '/profile')
  },
})
