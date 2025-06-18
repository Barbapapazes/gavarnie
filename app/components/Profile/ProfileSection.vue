<script lang="ts" setup>
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <section class="flex flex-col gap-6 md:flex-row md:gap-16">
    <div class="space-y-1 w-[28rem] shrink-0">
      <h2 class="text-md font-bold">
        {{ title }}
      </h2>
      <p class="text-muted">
        {{ description }}
      </p>
    </div>

    <slot />
  </section>
</template>
