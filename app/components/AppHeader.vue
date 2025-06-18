<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'
import type { UserSession } from '#auth-utils'

const { $csrfFetch } = useNuxtApp()

const { loggedIn, session, user } = useUserSession()

const links = computed<NavigationMenuItem[]>(() => {
  const links: NavigationMenuItem[] = []

  if (loggedIn.value) {
    links.push({
      label: 'Dashboard',
      to: '/dashboard',
    })
  }

  return links
})

const items = [
  [
    {
      label: 'Profile',
      to: '/profile',
      icon: 'i-ph-user-duotone',
    },
  ],
  [
    {
      label: 'Logout',
      icon: 'i-ph-sign-out-duotone',
      onSelect: async () => {
        await $csrfFetch('/api/_auth/session', {
          method: 'DELETE',
        })

        session.value = {} as UserSession

        await navigateTo('/')
      },
    },
  ],
]

const title = useRuntimeConfig().public.name
const icon = useAppConfig().app.logo
</script>

<template>
  <UHeader
    :title
    :ui="{ title: 'flex items-center' }"
  >
    <template #title>
      <img
        class="h-6 w-6"
        :src="icon"
        aria-hidden
      >

      <span> {{ title }} </span>
    </template>

    <UNavigationMenu :items="links" />

    <template #right>
      <template v-if="loggedIn && user">
        <UDropdownMenu
          :items="items"
          :content="{ align: 'end' }"
        >
          <UButton
            color="neutral"
            aria-label="Profile picture of connected user"
            variant="ghost"
            square
          >
            <AppAvatar :src="user.avatar" />
          </UButton>
        </UDropdownMenu>
      </template>
      <template v-else>
        <UButton
          to="/login"
          color="neutral"
          variant="ghost"
        >
          Login
        </UButton>
        <UButton
          to="/register"
          color="neutral"
          variant="solid"
        >
          Register
        </UButton>
      </template>
    </template>
  </UHeader>
</template>
