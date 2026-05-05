<script setup lang="ts">
import { queryParamFirst } from '~/shared/lib/routeQuery'
import { useAuth } from '~/features/auth'

type AuthMode = 'login' | 'register'

const route = useRoute()
const { t } = useI18n()
const { isAuthenticated, init, login, register } = useAuth()

const mode = ref<AuthMode>('login')
const isPending = ref(false)
const errorMessage = ref<string | null>(null)

const loginState = reactive({
  email: '',
  password: ''
})

const registerState = reactive({
  email: '',
  password: ''
})

const redirectPath = computed(
  () => queryParamFirst(route.query, 'redirect') ?? '/tools/deposit'
)

init()

watchEffect(async () => {
  if (!isAuthenticated.value) {
    return
  }

  await navigateTo(redirectPath.value, { replace: true })
})

const resetError = () => {
  errorMessage.value = null
}

const handleLogin = async () => {
  resetError()
  isPending.value = true
  try {
    await login({
      email: loginState.email,
      password: loginState.password
    })
  } catch {
    errorMessage.value = t('auth.errors.invalidCredentials')
  } finally {
    isPending.value = false
  }
}

const handleRegister = async () => {
  resetError()
  isPending.value = true
  try {
    await register({
      email: registerState.email,
      password: registerState.password,
      role: 'USER'
    })
  } catch {
    errorMessage.value = t('auth.errors.registerFailed')
  } finally {
    isPending.value = false
  }
}
</script>

<template>
  <section class="auth-page">
    <div class="auth-card">
      <div class="auth-tabs">
        <UButton
          :variant="mode === 'login' ? 'solid' : 'outline'"
          block
          @click="mode = 'login'"
        >
          {{ $t('auth.tabs.login') }}
        </UButton>
        <UButton
          :variant="mode === 'register' ? 'solid' : 'outline'"
          block
          @click="mode = 'register'"
        >
          {{ $t('auth.tabs.register') }}
        </UButton>
      </div>

      <p class="auth-title">
        {{
          mode === 'login' ? $t('auth.login.title') : $t('auth.register.title')
        }}
      </p>

      <UForm
        v-if="mode === 'login'"
        :state="loginState"
        class="auth-form"
        @submit="handleLogin"
      >
        <UFormField name="email" :label="$t('auth.fields.email')">
          <UInput
            v-model="loginState.email"
            type="email"
            autocomplete="email"
            :placeholder="$t('auth.placeholders.email')"
            class="w-full"
          />
        </UFormField>

        <UFormField name="password" :label="$t('auth.fields.password')">
          <UInput
            v-model="loginState.password"
            type="password"
            autocomplete="current-password"
            :placeholder="$t('auth.placeholders.password')"
            class="w-full"
          />
        </UFormField>

        <UButton type="submit" block :loading="isPending">
          {{ $t('auth.actions.login') }}
        </UButton>

        <p v-if="errorMessage" class="auth-error">
          {{ errorMessage }}
        </p>
      </UForm>

      <UForm
        v-else
        :state="registerState"
        class="auth-form"
        @submit="handleRegister"
      >
        <UFormField name="email" :label="$t('auth.fields.email')">
          <UInput
            v-model="registerState.email"
            type="email"
            autocomplete="email"
            :placeholder="$t('auth.placeholders.email')"
            class="w-full"
          />
        </UFormField>

        <UFormField name="password" :label="$t('auth.fields.password')">
          <UInput
            v-model="registerState.password"
            type="password"
            autocomplete="new-password"
            :placeholder="$t('auth.placeholders.passwordMin')"
            class="w-full"
          />
        </UFormField>

        <UButton type="submit" block :loading="isPending">
          {{ $t('auth.actions.register') }}
        </UButton>
      </UForm>
    </div>
  </section>
</template>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  margin-top: calc(var(--spacing) * 8);
}

.auth-card {
  width: min(100%, 28rem);
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
  padding: calc(var(--spacing) * 5);
  background: var(--ui-bg);
  border-radius: 0.75rem;
  box-shadow: var(--shadow-sm);
}

.auth-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(var(--spacing) * 2);
}

.auth-title {
  font-size: 1.25rem;
  font-weight: 700;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 3);
}

.auth-error {
  color: var(--ui-error);
  font-size: 0.875rem;
}
</style>
