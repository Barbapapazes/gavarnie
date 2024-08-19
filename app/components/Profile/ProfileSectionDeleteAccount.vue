<script lang="ts" setup>
import type { FetchError } from 'ofetch'

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

    session.value = {}

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
        color="red"
        @click="askConfirmation"
      >
        Delete Account
      </UButton>
    </UCard>

    <UModal v-model="isOpen">
      <UCard :ui="{ footer: { base: 'flex justify-end' } }">
        <template #header>
          <h2 class="text-lg font-semibold">
            Confirm Account Deletion
          </h2>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            This action is <strong>irreversible</strong> and will delete all your data <strong>permanently</strong>.
          </p>
        </template>

        <template #footer>
          <UButton
            color="black"
            variant="ghost"
            @click="closeConfirmation()"
          >
            Cancel
          </UButton>
          <UButton
            color="red"
            :loading="isLoading"
            @click="onDeleteAccount()"
          >
            Confirm
          </UButton>
        </template>
      </UCard>
    </UModal>
  </ProfileSection>
</template>
