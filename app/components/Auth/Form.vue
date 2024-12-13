<script lang="ts" setup>
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <UAuthForm
    :title
    :description
    align="bottom"
    :providers="[
      { label: 'GitHub', icon: 'i-simple-icons-github', color: 'gray', external: true, to: '/auth/github' },
      { label: 'Twitch', icon: 'i-simple-icons-twitch', color: 'gray', external: true, to: '/auth/twitch' },
      { label: 'Google', icon: 'i-simple-icons-google', color: 'gray', external: true, to: '/auth/google' },
    ]"
  >
    <template #footer>
      <slot />
    </template>
  </UAuthForm>
</template>
