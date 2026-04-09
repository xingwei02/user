<template>
  <div class="relative min-h-screen overflow-hidden theme-page pt-24 pb-16">
    <div class="container relative z-10 mx-auto max-w-4xl px-4">
      <section class="rounded-3xl border theme-panel-soft p-6 shadow-xl backdrop-blur-sm lg:p-8">
        <div class="mb-4 inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold theme-text-accent">
          {{ t('personalCenter.tabs.affiliate') }}
        </div>
        <h1 class="text-2xl font-black theme-text-primary lg:text-3xl">{{ t('personalCenter.affiliate.title') }}</h1>
        <p class="mt-3 text-sm leading-7 theme-text-muted">
          {{ t('personalCenter.affiliate.subtitle') }}
        </p>

        <div class="mt-6 rounded-2xl border theme-surface-soft p-5">
          <h2 class="text-base font-bold theme-text-primary">{{ t('personalCenter.affiliate.guestTitle') }}</h2>
          <p class="mt-2 text-sm leading-7 theme-text-muted">
            {{ t('personalCenter.affiliate.guestDesc') }}
          </p>
          <div class="mt-5 flex flex-wrap gap-3">
            <router-link
              to="/auth/login?redirect=%2Fme%2Faffiliate"
              class="inline-flex items-center rounded-xl theme-btn-primary px-5 py-2 text-sm font-bold transition-colors"
            >
              {{ t('personalCenter.affiliate.goLogin') }}
            </router-link>
            <router-link
              to="/auth/register?redirect=%2Fme%2Faffiliate"
              class="inline-flex items-center rounded-xl border theme-btn-secondary px-5 py-2 text-sm font-semibold"
            >
              {{ t('auth.register') }}
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
