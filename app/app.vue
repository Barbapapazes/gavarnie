<script lang="ts" setup>
useHead({
  titleTemplate: title => title ? `${title} - Gavarnie` : 'Gavarnie',
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
  </div>
</template>
