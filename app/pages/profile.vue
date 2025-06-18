<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})

const title = 'Profile'
const description = 'Manage your profile settings.'

useSeoMeta({
  title,
  description,
})
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title
      />
      <UPageBody class="flex flex-col gap-12">
        <ProfileSectionInformation />

        <ProfileSectionProviders />

        <USeparator />

        <ProfileSectionDeleteAccount />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
