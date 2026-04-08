<script setup lang="ts">
import { EPrimaryColor } from '../model/types';

const { color = null } = defineProps<{
  color: EPrimaryColor;
}>();
</script>

<template>
  <div :class='["primary-color-provider", color]'>
    <slot />
  </div>
</template>

<style>
.primary-color-provider.deposits {
  --ui-primary: var(--color-deposits-500);
  --ui-color-primary-50: var(--color-deposits-50);
  --ui-color-primary-100: var(--color-deposits-100);
  --ui-color-primary-200: var(--color-deposits-200);
  --ui-color-primary-300: var(--color-deposits-300);
  --ui-color-primary-400: var(--color-deposits-400);
  --ui-color-primary-500: var(--color-deposits-500);
  --ui-color-primary-600: var(--color-deposits-600);
  --ui-color-primary-700: var(--color-deposits-700);
  --ui-color-primary-800: var(--color-deposits-800);
  --ui-color-primary-900: var(--color-deposits-900);
  --ui-color-primary-950: var(--color-deposits-950);
}

.dark .primary-color-provider.deposits {
  --ui-primary: var(--color-deposits-400);
}

.primary-color-provider.bonds {
  --ui-primary: var(--color-bonds-500);
  --ui-color-primary-50: var(--color-bonds-50);
  --ui-color-primary-100: var(--color-bonds-100);
  --ui-color-primary-200: var(--color-bonds-200);
  --ui-color-primary-300: var(--color-bonds-300);
  --ui-color-primary-400: var(--color-bonds-400);
  --ui-color-primary-500: var(--color-bonds-500);
  --ui-color-primary-600: var(--color-bonds-600);
  --ui-color-primary-700: var(--color-bonds-700);
  --ui-color-primary-800: var(--color-bonds-800);
  --ui-color-primary-900: var(--color-bonds-900);
  --ui-color-primary-950: var(--color-bonds-950);
}

.dark .primary-color-provider.bonds {
  --ui-primary: var(--color-bonds-400);
}

.primary-color-provider.stocks {
  --ui-primary: var(--color-stocks-500);
  --ui-color-primary-50: var(--color-stocks-50);
  --ui-color-primary-100: var(--color-stocks-100);
  --ui-color-primary-200: var(--color-stocks-200);
  --ui-color-primary-300: var(--color-stocks-300);
  --ui-color-primary-400: var(--color-stocks-400);
  --ui-color-primary-500: var(--color-stocks-500);
  --ui-color-primary-600: var(--color-stocks-600);
  --ui-color-primary-700: var(--color-stocks-700);
  --ui-color-primary-800: var(--color-stocks-800);
  --ui-color-primary-900: var(--color-stocks-900);
  --ui-color-primary-950: var(--color-stocks-950);
}

.dark .primary-color-provider.stocks {
  --ui-primary: var(--color-stocks-400);
}
</style>