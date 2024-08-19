export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  if (!user.avatar) {
    return sendNoContent(event, 204)
  }

  await deleteProfilePicture(user.avatar)

  const updatedUser = {
    ...user,
    avatar: null,
  }
  await updateUser(user.id, { avatar: updatedUser.avatar })
  await updateUserSession(event, updatedUser)

  return sendNoContent(event, 204)
})
