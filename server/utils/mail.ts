import { Resend } from 'resend'
import type { H3Event } from 'h3'
import { subtle } from 'uncrypto'

export function useMail(event: H3Event) {
  const runtimeConfig = useRuntimeConfig(event)
  const mailConfig = runtimeConfig.mail

  const resend = new Resend(mailConfig.key)

  async function send(options: {
    to: string[]
    subject: string
    html: string
  }) {
    return resend.emails.send({
      from: `${runtimeConfig.name} <${mailConfig.from}>`,
      ...options,
    })
  }

  return {
    send,
  }
}

export async function hashEmail(email: string) {
  return Array.from(
    new Uint8Array(
      await subtle.digest('sha-1', new TextEncoder().encode(email)),
    ),
    b => b.toString(16).padStart(2, '0'))
    .join('')
}
