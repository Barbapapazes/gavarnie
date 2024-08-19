import { defineNuxtRouteMiddleware, useUserSession, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useUserSession()

  if (loggedIn.value) {
    return navigateTo('/profile')
  }
})
