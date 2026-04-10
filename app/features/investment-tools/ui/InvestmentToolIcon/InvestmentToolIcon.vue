<script lang="ts" setup>
import { toolsIcons } from '../../lib/toolsIcons'
import type { EToolItem } from '../../model/types'

const { item } = defineProps<{
  item: EToolItem
}>()
</script>

<template>
  <UIcon :name="toolsIcons[item]" />
</template>
