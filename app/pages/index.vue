<script setup lang="ts">
import { isLinkPreviewBot } from '~/utils/link-preview-bot'

const userAgent = useRequestHeader('user-agent')

if (!isLinkPreviewBot(userAgent)) {
  await navigateTo('/tools/deposit', { replace: true })
}
</script>

<template>
  <div />
</template>
