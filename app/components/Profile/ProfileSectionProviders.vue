<script lang="ts" setup>
import type { FetchError } from 'ofetch'

const { user } = useUserSession()

const isTwitchConnected = computed(() => Boolean(user.value?.twitchId))
const isGithubConnected = computed(() => Boolean(user.value?.githubId))

const { $csrfFetch } = useNuxtApp()
const { fetch: fetchUserSession } = useUserSession()

async function disconnect(providerName: 'github' | 'twitch') {
  try {
    await $csrfFetch(`/api/me/providers/${providerName}`, {
      method: 'DELETE',
    })

    await fetchUserSession()

    useSuccessToast(`Disconnected from ${providerName}`)
  }
  catch (error) {
    console.error(error)
    useErrorToast('An error occurred while disconnecting from the provider', (error as FetchError).data.message)
  }
}
</script>

<template>
  <ProfileSection
    title="Authentication"
    description="Access to your account using another provider."
  >
    <UCard class="grow">
      <p>
        Link one or more of the following providers to your account to access it using them.
      </p>

      <div class="flex flex-row gap-4 mt-4">
        <UButton
          color="neutral"
          :to="isGithubConnected ? undefined : '/auth/github'"
          external
          icon="i-simple-icons-github"
          @click="isGithubConnected ? disconnect('github') : undefined"
        >
          {{ user?.githubId ? 'Remove connection' : 'Connect GitHub' }}
        </UButton>
        <UButton
          color="neutral"
          :to="isTwitchConnected ? undefined : '/auth/twitch'"
          external
          icon="i-simple-icons-twitch"
          @click="isTwitchConnected ? disconnect('twitch') : undefined"
        >
          {{ user?.twitchId ? 'Remove connection' : 'Connect Twitch' }}
        </UButton>
      </div>
    </ucard>
  </ProfileSection>
</template>
