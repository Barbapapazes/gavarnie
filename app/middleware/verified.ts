import { defineNuxtRouteMiddleware, useUserSession, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware(() => {
  const { user, loggedIn } = useUserSession()

  if (!loggedIn.value || !user.value?.verifiedAt) {
    return navigateTo('/profile')
  }
})
