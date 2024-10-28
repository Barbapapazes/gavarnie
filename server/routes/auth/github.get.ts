export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user: oauthUser, tokens }) {
    const { user: userSession } = await getUserSession(event)

    // If the user is already signed in, link the account
    if (userSession?.id) {
      const user = await findUserById(userSession.id)

      if (user) {
        await updateUser(userSession.id, {
          githubId: oauthUser.id,
          githubToken: tokens.access_token,
        })

        await updateUserSession(event, {
          ...userSession,
          githubId: oauthUser.id,
        })
        return sendRedirect(event, '/profile')
      }
    }

    // If the user is not signed in, search for an existing user with that GitHub ID
    // If it exists, sign in as that user and refresh the token
    let user = await findUserByGitHubId(oauthUser.id)

    if (user) {
      await updateUser(user.id, {
        githubId: oauthUser.id,
        githubToken: tokens.access_token,
      })

      await updateUserSession(event, {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        verifiedAt: user.verifiedAt,
        twitchId: user.twitchId,
        githubId: oauthUser.id,
      })
      return sendRedirect(event, '/profile')
    }

    // If the user is not signed in, search for an existing user with that email address without a GitHub ID
    // If it exists, tells the user to sign in with that account and link the GitHub account
    user = await findUserBy(
      and(
        eq(tables.users.email, oauthUser.email),
        isNull(tables.users.githubId),
      ),
    )

    if (user) {
      await updateSession(event,
        {
          password: useRuntimeConfig(event).session.password,
        },
        {
          message: 'An existing account for this email already exists. Please login and visit your profile settings to add support for GitHub authentication.',
        })
      return sendRedirect(event, '/login')
    }

    // Fall back to the user's login if the name is not available
    const userName = oauthUser.name || oauthUser.login

    // If the user is not signed in and no user exists with that GitHub ID or email address, create a new user
    const createdUser = await createUser({
      name: userName as string,
      email: oauthUser.email as string,
      avatar: oauthUser.avatar_url as string,
      githubId: oauthUser.id as number,
      githubToken: tokens.access_token as string,
      verifiedAt: new Date().toUTCString(),
    })

    await updateUserSession(event, {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      avatar: createdUser.avatar,
      verifiedAt: createdUser.verifiedAt,
      githubId: oauthUser.id,
    },
    )

    return sendRedirect(event, '/profile')
  },
})
