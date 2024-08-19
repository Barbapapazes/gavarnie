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
  <UCard>
    <AuthForm
      :title
      :description
    >
      By signing in, you agree to our <NuxtLink
        to="/"
        class="text-primary font-medium"
      >
        Terms of Service
      </NuxtLink>.
    </AuthForm>
  </UCard>
</template>
