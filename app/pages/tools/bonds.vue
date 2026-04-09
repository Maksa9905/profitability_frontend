<script setup lang="ts">
import { EPrimaryColor, PrimaryColorProvider } from '~/features/dynamical-primary-color';
import { ToolItemButton, EToolItem } from '~/features/investment-tools';

</script>

<template>
    <PrimaryColorProvider :color='EPrimaryColor.BONDS'>
        <div class="flex flex-row gap-4">
            <ToolItemButton :item="EToolItem.BOND" />
        <ToolItemButton :item="EToolItem.DEPOSIT" />
        <ToolItemButton :item="EToolItem.STOCK" />
        </div>
    </PrimaryColorProvider>
</template>
