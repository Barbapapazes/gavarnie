<script lang="ts" setup>
const description = 'Gavarnie is a modern and flexible SaaS template for Nuxt and NuxtHub that can be used to build any application.'

useSeoMeta({
  title: 'Gavarnie - Modern SaaS Template for Nuxt and NuxtHub',
  description,
})
</script>

<template>
  <div>
    <ULandingHero
      title="Built your SaaS in hours, not days."
      :description
      orientation="horizontal"
      :links="[{ label: 'Explore Starter', color: 'gray', size: 'lg', icon: 'i-simple-icons-github', to: 'https://github.com/barbapapazes/gavarnie', target: '_blank' }, { label: 'Get Started', trailingIcon: 'i-heroicons-arrow-right', color: 'gray', size: 'lg', to: 'https://hub.nuxt.com/new?repo=barbapapazes/gavarnie', target: '_blank' }]"
    >
      <template #default>
        <img
          src="/images/gavarnie.jpg"
          class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
        >
      </template>
    </ULandingHero>

    <ULandingSection>
      <ULandingGrid>
        <ULandingCard
          class="col-span-6 row-span-2"
          icon="i-simple-icons-nuxtdotjs"
          title="Nuxt"
          description="The most powerful Vue.js framework to build modern web applications."
        />
        <ULandingCard
          class="col-span-6 row-span-4"
          icon="i-ph-puzzle-piece-duotone"
          title="Nuxt UI"
          description="A set of components to build your SaaS faster."
        />
        <ULandingCard
          class="col-span-6 row-span-4"
          icon="i-ph-lock-key-duotone"
          title="Social Auth"
          description="Connect your app with Twitch, GitHub, and more."
        />
        <ULandingCard
          class="col-span-6 row-span-2"
          icon="i-ph-envelope-duotone"
          title="Email"
          description="Send transactional emails with ease thanks to Resend."
        />
        <ULandingCard
          class="col-span-6 row-span-2"
          icon="i-ph-globe-duotone"
          title="NuxtHub"
          description="Deploy your app in seconds with NuxtHub."
        />
        <ULandingCard
          class="col-span-6 row-span-2"
          icon="i-ph-check-duotone"
          title="Ready to use"
          description="Everything is setup for you. Just start building."
        />
      </ULandingGrid>
    </ULandingSection>

    <ULandingSection
      title="Free and open-source"
      description="Build indie projects in hours and deploy in minutes for free. No hidden fees. Open-source (MIT)."
      :links="[{ label: 'View source', color: 'gray', icon: 'i-simple-icons-github', size: 'lg', to: 'https://github.com/barbapapazes/gavernie', target: '_blank' }]"
    >
      <img
        src="/images/gavarnie2.jpg"
        class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
      >
    </ULandingSection>

    <ULandingSection>
      <ULandingCTA
        title="Start building your SaaS today"
        description="Clone the repository and start building your SaaS today."
        card
        :links="[{ label: 'Start now', color: 'gray', icon: 'i-simple-icons-nuxtdotjs', size: 'lg', to: 'https://hub.nuxt.com/new?repo=barbapapazes/gavarnie', target: '_blank' }, { label: 'Support the project', color: 'gray', icon: 'i-simple-icons-github', size: 'lg', to: 'https://github.com/sponsors/barbapapazes', target: '_blank' }]"
      />
    </ULandingSection>
  </div>
</template>
