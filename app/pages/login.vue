<script lang="ts" setup>
import { useSession } from 'h3'

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

/**
 * I'm not sure if this is the best way to handle this, but it works.
 */
const message = useState<string>('message')
if (import.meta.server) {
  const session = await useSession(useRequestEvent()!, {
    password: useRuntimeConfig().session.password,
  })

  message.value = session.data.message

  await session.update({
    message: '',
  })
}
</script>

<template>
  <div>
    <UAlert
      v-if="message"
      class="mb-8"
      color="error"
      variant="outline"
      :close-button="{ icon: 'i-ph-x-bold', color: 'error', variant: 'link', padded: false }"
      :description="message"
      @close="message = ''"
    />

    <UCard variant="subtle">
      <AuthForm
        :title
        :description
      >
        Don't have an account yet? <NuxtLink
          to="/register"
          class="text-primary font-medium"
        >
          Register
        </NuxtLink>
      </AuthForm>
    </UCard>
  </div>
</template>
