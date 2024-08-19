export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  await useDrizzle().delete(tables.users).where(eq(tables.users.id, user.id)).catch((error) => {
    throw createError({
      statusCode: 500,
      message: error.message,
    })
  })

  return sendNoContent(event, 204)
})
