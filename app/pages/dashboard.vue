<script lang="ts" setup>
definePageMeta({
  middleware: 'verified',
})

const title = 'Dashboard'

useSeoMeta({
  title,
})
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title
      />

      <!-- Use a UPageBody to build the user dashboard -->
    </UPage>
  </UContainer>
</template>
