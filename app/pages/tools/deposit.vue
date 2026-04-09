<script setup lang="ts">
import { EPrimaryColor, PrimaryColorProvider } from '~/features/dynamical-primary-color';
import { InvestmentCalculatorBanner } from '~/features/investment-tools';

</script>

<template>
    <PrimaryColorProvider :color='EPrimaryColor.DEPOSITS'>
        <div class="title-container">
            <h1 class="title">{{$t('toolItem.deposits.label')}}</h1>
            <p class="description">{{$t('toolItem.deposits.description')}}</p>
        </div>
    </PrimaryColorProvider>
</template>

<style scoped>
.title-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-inline: 1rem;
    border-left: 4px solid var(--ui-primary);
}

.title {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: var(--ui-text);
}

.description {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    color: var(--ui-text-muted);
}
</style>