import { z } from 'zod'

export const patchUserValidator = z.object({
  email: z.string({ message: 'Required' }).email({ message: 'Invalid email' }),
  name: z.string({ message: 'Required' }).min(3, { message: 'Name must be at least 3 character long' }),
})
