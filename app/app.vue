<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig()
useHead({
  titleTemplate: title => title ? `${title} - ${runtimeConfig.public.name}` : runtimeConfig.public.name,
})
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
