export default oauthGoogleEventHandler({
  config: {
    // Example:
    scope: ['email', 'openid', 'profile'],
  },
  async onSuccess(event, { user: googleUser, tokens }) {

    // Fetch the current session if the user is already signed in
    const { user: userSession } = await getUserSession(event)

    // If the user is signed in, link the Google account to the existing user
    if (userSession?.id) {
      const existingUser = await findUserById(userSession.id)
      if (existingUser) {
        await updateUser(userSession.id, {
          googleId: googleUser.sub,
          googleToken: tokens.access_token,
        })
        await updateUserSession(event, { ...userSession, googleId: googleUser.sub })
        return sendRedirect(event, '/profile')
      }
    }

    // Check if there's an existing user with this Google ID or email
    let user = await findUserByGoogleId(googleUser.sub)
    if (user) {
      await updateUser(user.id, {
        googleId: googleUser.sub,
        googleToken: tokens.access_token,
      })
      await updateUserSession(event, {
        ...user,
        googleId: googleUser.sub,
      })
      return sendRedirect(event, '/profile')
    }

    user = await findUserBy(
      and(
        eq(tables.users.email, googleUser.email),
        isNull(tables.users.googleId),
      ),
    )
    if (user) {
      await updateSession(event,
        {
          password: useRuntimeConfig(event).session.password,
        },
        {
          message: 'An existing account for this email already exists. Please login and visit your profile settings to add support for Google authentication.',
        })
      return sendRedirect(event, '/login')
    }

    // If the user is not signed in and no user exists with that Google ID, create a new user
    const createdUser = await createUser({
      name: (googleUser.given_name || 'no name') as string,
      email: googleUser.email as string,
      avatar: googleUser.picture as string,
      googleId: googleUser.sub as string,
      googleToken: tokens.access_token as string,
      verifiedAt: new Date().toUTCString(),
    })

    await updateUserSession(event, {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      avatar: createdUser.avatar,
      verifiedAt: createdUser.verifiedAt,
      googleId: googleUser.sub,
    })
    return sendRedirect(event, '/profile')
  },

},
)
