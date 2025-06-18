<script lang="ts" setup>
import type { FetchError } from 'ofetch'
import type { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const { $csrfFetch } = useNuxtApp()
const { user, fetch: fetchUserSession } = useUserSession()

async function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file)
    return

  const formData = new FormData()
  formData.append('file', file)

  try {
    await $csrfFetch('/api/me/profile-pictures', {
      method: 'PUT',
      body: formData,
    })

    await fetchUserSession()
  }
  catch (error) {
    console.error(error)
    useErrorToast('An error occurred while uploading your profile picture', (error as FetchError).data?.message)
  }
}

async function removeAvatar() {
  try {
    await $csrfFetch('/api/me/profile-pictures', {
      method: 'DELETE',
    })

    await fetchUserSession()
  }
  catch (error) {
    console.error(error)
    useErrorToast('An error occurred while removing your profile picture', (error as FetchError).data.message)
  }
}

const fileInput = ref<HTMLInputElement | null>(null)
function triggerFileInput() {
  if (fileInput.value)
    fileInput.value.click()
}

const state = reactive({
  email: user.value?.email,
  name: user.value?.name,
})

type Schema = z.output<typeof patchUserValidator>

async function onSubmitProfileInformation(event: FormSubmitEvent<Schema>) {
  try {
    await $csrfFetch('/api/me', {
      method: 'PATCH',
      body: event.data,
    })

    await fetchUserSession()

    useSuccessToast('Profile information updated successfully')
  }
  catch (error) {
    console.error(error)
    useErrorToast('An error occurred while updating your profile information', (error as FetchError).data.message)
  }
}
</script>

<template>
  <ProfileSection
    title="Profile Information"
    description="Update your account's profile information and email address."
  >
    <div class="grow space-y-8">
      <UCard
        v-if="user"
      >
        <div class="flex justify-start">
          <div
            class="flex flex-col items-center gap-4"
          >
            <div class="group relative size-20">
              <AppAvatar
                class="size-20"
                :src="user.avatar"
              />

              <label class="absolute inset-0 flex justify-center items-center text-transparent text-sm font-semibold border border-dashed border-transparent group-hover:border-primary group-hover:text-default rounded-full transition-all ease-in cursor-pointer group-hover:backdrop-blur group-hover:bg-neutral-700/50">
                Edit
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  hidden
                  @change="onFileChange($event)"
                >
              </label>
            </div>

            <div class="flex flex-row gap-4">
              <UButton
                v-if="user.avatar"
                color="neutral"
                @click="removeAvatar()"
              >
                Remove
              </UButton>
              <UButton
                v-else
                color="neutral"
                @click="triggerFileInput()"
              >
                Upload
              </UButton>
            </div>
          </div>
        </div>
      </UCard>

      <UCard>
        <UForm
          class="space-y-4"
          :state
          :schema="patchUserValidator"
          @submit="onSubmitProfileInformation"
        >
          <div class="space-y-4 max-w-sm">
            <UFormField
              label="Email"
              name="email"
            >
              <UInput
                v-model="state.email"
                required
                class="w-100"
              />
            </UFormField>
            <p
              v-if="!user?.verifiedAt"
              class="text-sm text-error"
            >
              Your email address '{{ user?.emailToVerify }}' is not verified. Please check your inbox for the verification email before continuing to use the application.
            </p>

            <UFormField
              label="Name"
              name="name"
            >
              <UInput
                v-model="state.name"
                required
                class="w-100"
              />
            </UFormField>
          </div>

          <div class="flex flex-row justify-end">
            <UButton
              type="submit"
              color="primary"
            >
              Save
            </UButton>
          </div>
        </UForm>
      </UCard>
    </div>
  </ProfileSection>
</template>
