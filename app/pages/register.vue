<script lang="ts" setup>
definePageMeta({
  layout: 'centered',
  middleware: 'guest',
})

const title = 'Register'
const description = 'Use one of the following providers to register for an account.'

useSeoMeta({
  title,
  description,
})
</script>

<template>
  <UCard variant="subtle">
    <AuthForm
      :title
      :description
    >
      By signing in, you agree to our <NuxtLink
        to="/terms"
        class="text-primary font-medium"
      >
        Terms of Service
      </NuxtLink>.
    </AuthForm>
  </UCard>
</template>
