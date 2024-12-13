export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const { email, ...body } = await readValidatedBody(event, patchUserValidator.parse)

  const hasEmailChange = email && email !== user.email
  if (hasEmailChange) {
    const config = useRuntimeConfig(event)

    const emailHashed = await hashEmail(email)
    const verifyLink = `${config.app.url}/verify-email/${user.id}/${emailHashed}`
    await useMail(event).send({
      to: [email],
      subject: 'Verify your email address',
      html: `<p>Hello ${body.name},</p>
      <p>Please click the button below to verify your email address.</p>
      <p>Verify your email: <a href="${verifyLink}">${verifyLink}</a></p>
      <p>Best regards,<br>Gavarnie Team</p>`,
    })
  }

  const updatedUser = {
    ...user,
    ...body,
    ...hasEmailChange ? { verifiedAt: null, emailToVerify: email } : {},
  }
  await updateUser(user.id, updatedUser)
  await updateUserSession(event, updatedUser)

  return sendNoContent(event, 204)
})
