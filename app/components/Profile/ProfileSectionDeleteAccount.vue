<script lang="ts" setup>
import type { FetchError } from 'ofetch'
import type { UserSession } from '#auth-utils'

const { $csrfFetch } = useNuxtApp()

const isOpen = ref(false)
const isLoading = ref(false)

function askConfirmation() {
  isOpen.value = true
}

function closeConfirmation() {
  isOpen.value = false
}

const { session } = useUserSession()

async function onDeleteAccount() {
  isLoading.value = true

  try {
    await $csrfFetch('/api/me', {
      method: 'DELETE',
    })

    await $csrfFetch('/api/_auth/session', {
      method: 'DELETE',
    })

    session.value = {} as UserSession

    useSuccessToast('Account deleted successfully')

    await navigateTo('/')
  }
  catch (error) {
    console.error(error)
    useErrorToast('An error occurred while deleting your account', (error as FetchError).data.message)
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <ProfileSection
    title="Delete Account"
    description="Permanently delete your account."
  >
    <UCard>
      <p>
        Deleting your account is irreversible. All your data will be lost. Are you sure you want to delete your account?
      </p>

      <UButton
        class="mt-4"
        color="error"
        @click="askConfirmation"
      >
        Delete Account
      </UButton>
    </UCard>

    <UModal
      v-model:open="isOpen"
      title="Confirm Account Deletion"
      description="Are you sure you want to delete your account? This action is irreversible and will delete all your data permanently."
      :ui="{ footer: 'justify-end' }"
    >
      <template #footer>
        <UButton
          color="neutral"
          variant="ghost"
          @click="closeConfirmation()"
        >
          Cancel
        </UButton>
        <UButton
          color="error"
          :loading="isLoading"
          @click="onDeleteAccount()"
        >
          Confirm
        </UButton>
      </template>
    </UModal>
  </ProfileSection>
</template>
