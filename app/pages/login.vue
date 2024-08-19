<script lang="ts" setup>
definePageMeta({
  layout: 'centered',
  middleware: 'guest',
})

const title = 'Login'
const description = 'Use one of the following providers to login to your account.'

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
      Already have an account? <NuxtLink
        to="/register"
        class="text-primary font-medium"
      >
        Register
      </NuxtLink>
    </AuthForm>
  </UCard>
</template>
