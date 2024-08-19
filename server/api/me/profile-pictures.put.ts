import { randomUUID } from 'uncrypto'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const form = await readFormData(event)
  const file = form.get('file') as File

  if (!file || !file.size) {
    throw createError({ statusCode: 400, message: 'No file provided' })
  }

  ensureBlob(file, {
    maxSize: '1MB',
    types: ['image'],
  })

  if (user.avatar) {
    await deleteProfilePicture(user.avatar)
  }

  const filename = randomUUID()

  const avatar = await hubBlob().put(filename, file, {
    addRandomSuffix: false,
    prefix: 'profile-pictures/',
  })

  const updatedUser = {
    ...user,
    avatar: avatar.pathname,
  }
  await updateUser(user.id, { avatar: updatedUser.avatar })
  await updateUserSession(event, updatedUser)

  return sendNoContent(event, 204)
})
