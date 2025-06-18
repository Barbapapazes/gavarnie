<script lang="ts" setup>
const description = 'Gavarnie is a modern and flexible SaaS template for Nuxt and NuxtHub that can be used to build any application.'

useSeoMeta({
  title: 'Gavarnie - Modern SaaS Template for Nuxt and NuxtHub',
  description,
})
</script>

<template>
  <UPage>
    <UPageHero
      title="Built your SaaS in hours, not days."
      :description="description"
      orientation="horizontal"
      :links="[{ label: 'Explore Starter', color: 'neutral', size: 'lg', icon: 'i-simple-icons-github', to: 'https://github.com/barbapapazes/gavarnie', target: '_blank' }, { label: 'Get Started', trailingIcon: 'i-heroicons-arrow-right', color: 'neutral', size: 'lg', to: 'https://hub.nuxt.com/new?repo=barbapapazes/gavarnie', target: '_blank' }]"
    >
      <template #default>
        <img
          src="/images/gavarnie.jpg"
          class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
        >
      </template>
    </UPageHero>

    <UPageSection>
      <UPageGrid>
        <UPageCard
          icon="i-simple-icons-nuxtdotjs"
          title="Nuxt"
          description="The most powerful Vue.js framework to build modern web applications."
        />
        <UPageCard
          icon="i-ph-puzzle-piece-duotone"
          title="Nuxt UI"
          description="A set of components to build your SaaS faster."
        />
        <UPageCard
          icon="i-ph-lock-key-duotone"
          title="Social Auth"
          description="Connect your app with Twitch, GitHub, and more."
        />
        <UPageCard
          icon="i-ph-envelope-duotone"
          title="Email"
          description="Send transactional emails with ease thanks to Resend."
        />
        <UPageCard
          icon="i-ph-globe-duotone"
          title="NuxtHub"
          description="Deploy your app in seconds with NuxtHub."
        />
        <UPageCard
          icon="i-ph-check-duotone"
          title="Ready to use"
          description="Everything is setup for you. Just start building."
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      title="Free and open-source"
      description="Build indie projects in hours and deploy in minutes for free. No hidden fees. Open-source (MIT)."
      :links="[{ label: 'View source', color: 'neutral', icon: 'i-simple-icons-github', size: 'lg', to: 'https://github.com/barbapapazes/gavarnie', target: '_blank' }]"
    >
      <img
        src="/images/gavarnie2.jpg"
        class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
      >
    </UPageSection>

    <UPageSection>
      <UPageCTA
        title="Start building your SaaS today"
        description="Clone the repository and start building your SaaS today."
        card
        :links="[{ label: 'Start now', color: 'neutral', icon: 'i-simple-icons-nuxtdotjs', size: 'lg', to: 'https://hub.nuxt.com/new?repo=barbapapazes/gavarnie', target: '_blank' }, { label: 'Support the project', color: 'neutral', icon: 'i-simple-icons-github', size: 'lg', to: 'https://github.com/sponsors/barbapapazes', target: '_blank' }]"
      />
    </UPageSection>
  </UPage>
</template>
