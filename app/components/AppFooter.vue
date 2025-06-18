<script lang="ts" setup>
const title = useRuntimeConfig().public.name

const appConfig = useAppConfig()
const notice = appConfig.footer.notice
const smallLinks = appConfig.footer.smallLinks
const socials = appConfig.socials
</script>

<template>
  <UFooter
    :ui="{ left: 'text-sm text-gray-600 dark:text-gray-300' }"
  >
    <template #left>
      {{ title }} - {{ notice }}
    </template>

    <UNavigationMenu :items="smallLinks" />

    <template #right>
      <UButton
        v-for="social in socials"
        :key="social.title"
        square
        color="neutral"
        variant="ghost"
        v-bind="social"
      />
    </template>
  </UFooter>
</template>
