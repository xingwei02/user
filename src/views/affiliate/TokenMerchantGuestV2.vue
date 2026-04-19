<template>
  <div class="tm-page min-h-screen bg-[#f0f0f0] pt-20 md:pt-24 pb-16 font-sans">

    <!-- Section 1: Hero -->
    <section class="mx-auto max-w-4xl px-4 py-16 text-center">
      <h1 class="text-4xl md:text-5xl font-semibold text-[#1a1a1a] leading-tight">{{ t('tm.hero.title1') }}</h1>
      <h2 class="mt-2 text-4xl md:text-5xl font-semibold leading-tight bg-gradient-to-r from-[#b8924a] to-[#d4b06a] bg-clip-text text-transparent">{{ t('tm.hero.title2') }}</h2>
      <p class="mt-8 text-[15px] leading-8 text-[#666]">
        {{ t('tm.hero.desc1') }}<br/>
        {{ t('tm.hero.desc2') }}<br/>
        {{ t('tm.hero.desc3') }}
      </p>
      <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <div class="bg-white rounded-2xl p-6 text-center shadow-sm">
          <div class="mx-auto w-12 h-12 rounded-full bg-[#e8f4fd] flex items-center justify-center text-2xl mb-4">💼</div>
          <div class="font-semibold text-[#1a1a1a] mb-2">{{ t('tm.card1.title') }}</div>
          <p class="text-sm text-[#888] leading-6">{{ t('tm.card1.desc') }}</p>
        </div>
        <div class="bg-white rounded-2xl p-6 text-center shadow-sm">
          <div class="mx-auto w-12 h-12 rounded-full bg-[#e8f9f0] flex items-center justify-center text-2xl mb-4">⚡</div>
          <div class="font-semibold text-[#1a1a1a] mb-2">{{ t('tm.card2.title') }}</div>
          <p class="text-sm text-[#888] leading-6">{{ t('tm.card2.desc') }}</p>
        </div>
        <div class="bg-white rounded-2xl p-6 text-center shadow-sm">
          <div class="mx-auto w-12 h-12 rounded-full bg-[#fdf6e8] flex items-center justify-center text-2xl mb-4">💰</div>
          <div class="font-semibold text-[#1a1a1a] mb-2">{{ t('tm.card3.title') }}</div>
          <p class="text-sm text-[#888] leading-6">{{ t('tm.card3.desc') }}</p>
        </div>
      </div>
      <div class="mt-10">
        <button type="button" @click="handlePrimaryAction" class="inline-block rounded-full bg-gradient-to-r from-[#b8924a] to-[#c9a55a] text-white font-semibold px-10 py-3 text-base shadow-md hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">{{ primaryActionLabel }}</button>
      </div>
    </section>

    <!-- Section 2: What is AI Token Merchant -->
    <section class="mx-auto max-w-3xl px-4 py-12 text-center">
      <h2 class="text-3xl font-semibold text-[#1a1a1a]">{{ t('tm.what.title') }}</h2>
      <p class="mt-3 text-sm text-[#888] leading-7">{{ t('tm.what.sub1') }}<br/>{{ t('tm.what.sub2') }}<br/>{{ t('tm.what.sub3') }}</p>
      <div class="mt-8 bg-white rounded-2xl p-8 text-left shadow-sm text-[15px] leading-9 text-[#333]">
        <p class="font-semibold text-[#1a1a1a]">{{ t('tm.what.imagine') }}</p>
        <p>{{ t('tm.what.p1') }}</p>
        <p>{{ t('tm.what.p2') }}</p>
        <p>{{ t('tm.what.p3') }}</p>
        <p class="text-[#b8924a] font-semibold">{{ t('tm.what.highlight') }}</p>
        <p>{{ t('tm.what.p4') }}</p>
        <p>{{ t('tm.what.p5') }}</p>
        <p>{{ t('tm.what.p6') }}</p>
        <p>{{ t('tm.what.p7') }}</p>
        <p>{{ t('tm.what.p8') }}</p>
        <p class="text-[#b8924a] font-semibold">{{ t('tm.what.cta1') }}</p>
        <p class="text-[#b8924a] font-semibold">{{ t('tm.what.cta2') }}</p>
      </div>
      <div class="mt-8">
        <button type="button" @click="handlePrimaryAction" class="inline-block rounded-full bg-gradient-to-r from-[#b8924a] to-[#c9a55a] text-white font-semibold px-10 py-3 text-base shadow-md hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">{{ primaryActionLabel }}</button>
      </div>
    </section>

    <!-- Section 3: Compare -->
    <section class="mx-auto max-w-4xl px-4 py-12 text-center">
      <h2 class="text-3xl font-semibold text-[#1a1a1a]">{{ t('tm.compare.title') }}</h2>
      <p class="mt-2 text-sm text-[#888]">{{ t('tm.compare.sub') }}</p>
      <div class="mt-8 grid md:grid-cols-2 gap-4 text-left">
        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <div class="font-semibold text-[#888] mb-4">{{ t('tm.compare.trad') }}</div>
          <ul class="space-y-3 text-sm text-[#555]">
            <li v-for="item in tradItems" :key="item" class="flex items-center gap-2"><span class="text-red-400">✕</span>{{ item }}</li>
          </ul>
        </div>
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-[#e8d5a8]">
          <div class="font-semibold text-[#1a1a1a] mb-4">{{ t('tm.compare.ai') }}</div>
          <ul class="space-y-3 text-sm text-[#555]">
            <li v-for="item in aiItems" :key="item" class="flex items-center gap-2"><span class="text-green-500">✓</span>{{ item }}</li>
          </ul>
        </div>
      </div>
      <p class="mt-6 text-[#b8924a] font-semibold text-sm">{{ t('tm.compare.footer1') }}<br/>{{ t('tm.compare.footer2') }}</p>
    </section>

    <!-- Section 4: Income Sources -->
    <section class="mx-auto max-w-3xl px-4 py-12 text-center">
      <h2 class="text-3xl font-semibold text-[#1a1a1a]">{{ t('tm.income.title') }}</h2>
      <p class="mt-2 text-sm text-[#888]">{{ t('tm.income.sub') }}</p>
      <div class="mt-8 space-y-4 text-left">
        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-xl bg-[#e8f0fd] flex items-center justify-center text-xl">💳</div>
            <div><div class="font-semibold">{{ t('tm.income.buy.title') }}</div><div class="text-xs text-[#888]">{{ t('tm.income.buy.sub') }}</div></div>
          </div>
          <div class="bg-[#f8f8f8] rounded-xl p-4 text-sm text-[#555] leading-7">
            <p class="font-semibold">{{ t('tm.income.example') }}</p>
            <p>{{ t('tm.income.buy.ex1') }}</p>
            <p>{{ t('tm.income.buy.ex2') }}</p>
            <p>{{ t('tm.income.buy.ex3') }}</p>
          </div>
          <p class="mt-3 text-xs text-[#aaa]">{{ t('tm.income.settle') }} &nbsp;&nbsp; {{ t('tm.income.ratio') }}</p>
        </div>
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-[#e8d5a8]">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-xl bg-[#e8f9f0] flex items-center justify-center text-xl">🔄</div>
            <div><div class="font-semibold">{{ t('tm.income.use.title') }}</div><div class="text-xs text-[#888]">{{ t('tm.income.use.sub') }}</div></div>
          </div>
          <div class="bg-[#f8f8f8] rounded-xl p-4 text-sm text-[#555] leading-7">
            <p class="font-semibold">{{ t('tm.income.example') }}</p>
            <p>{{ t('tm.income.use.ex1') }}</p>
            <p>{{ t('tm.income.use.ex2') }}</p>
            <p>{{ t('tm.income.use.ex3') }}</p>
          </div>
          <p class="mt-3 text-xs text-[#aaa]">{{ t('tm.income.settle') }} &nbsp;&nbsp; {{ t('tm.income.ratio') }}</p>
          <div class="mt-3 bg-[#fdf6e8] rounded-xl p-4 text-sm text-[#b8924a] leading-6">
            <p class="font-semibold">{{ t('tm.income.key') }}</p>
            <p>{{ t('tm.income.key1') }}</p>
            <p>{{ t('tm.income.key2') }}</p>
            <p>{{ t('tm.income.key3') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 5: Business Mode -->
    <section class="mx-auto max-w-4xl px-4 py-12 text-center">
      <h2 class="text-3xl font-semibold text-[#1a1a1a]">{{ t('tm.mode.title') }}</h2>
      <p class="mt-2 text-sm text-[#888] leading-7">{{ t('tm.mode.sub1') }}<br/>{{ t('tm.mode.sub2') }}</p>
      <div class="mt-8 grid md:grid-cols-2 gap-4 text-left">
        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl">👤</div>
            <div><div class="font-semibold">{{ t('tm.mode.personal.title') }}</div><div class="text-xs text-[#888]">{{ t('tm.mode.personal.sub') }}</div></div>
          </div>
          <p class="text-sm font-semibold mb-2">{{ t('tm.mode.fit') }}</p>
          <ul class="text-sm text-[#555] space-y-1 mb-4">
            <li v-for="item in personalFit" :key="item" class="flex items-center gap-2"><span class="text-blue-400">✓</span>{{ item }}</li>
          </ul>
          <p class="text-sm font-semibold mb-2">{{ t('tm.mode.feature') }}</p>
          <ul class="text-sm text-[#555] space-y-1 mb-5">
            <li v-for="item in personalFeature" :key="item" class="flex items-center gap-2"><span class="text-blue-400">✓</span>{{ item }}</li>
          </ul>
          <button type="button" @click="handlePrimaryAction" class="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60">{{ primaryActionLabel }}</button>
        </div>
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-[#e8d5a8]">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-[#fdf6e8] flex items-center justify-center text-[#b8924a] text-xl">🏢</div>
            <div><div class="font-semibold">{{ t('tm.mode.enterprise.title') }}</div><div class="text-xs text-[#888]">{{ t('tm.mode.enterprise.sub') }}</div></div>
          </div>
          <p class="text-sm font-semibold mb-2">{{ t('tm.mode.fit') }}</p>
          <ul class="text-sm text-[#555] space-y-1 mb-4">
            <li v-for="item in enterpriseFit" :key="item" class="flex items-center gap-2"><span class="text-[#b8924a]">✓</span>{{ item }}</li>
          </ul>
          <p class="text-sm font-semibold mb-2">{{ t('tm.mode.feature') }}</p>
          <ul class="text-sm text-[#555] space-y-1 mb-5">
            <li v-for="item in enterpriseFeature" :key="item" class="flex items-center gap-2"><span class="text-[#b8924a]">☆</span>{{ item }}</li>
          </ul>
          <button type="button" @click="handlePrimaryAction" class="block w-full text-center bg-gradient-to-r from-[#b8924a] to-[#c9a55a] text-white rounded-xl py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60">{{ primaryActionLabel }}</button>
        </div>
      </div>
      <p class="mt-4 text-xs text-[#aaa]">{{ t('tm.mode.tip') }}</p>
    </section>

    <!-- Section 6: 3 Steps -->
    <section class="mx-auto max-w-4xl px-4 py-12 text-center">
      <h2 class="text-3xl font-semibold text-[#1a1a1a]">{{ t('tm.steps.title') }}</h2>
      <p class="mt-2 text-sm text-[#888]">{{ t('tm.steps.sub') }}</p>
      <div class="mt-8 grid md:grid-cols-3 gap-4 text-left">
        <div class="bg-white rounded-2xl p-6 shadow-sm relative">
          <div class="absolute -top-3 -left-1 w-8 h-8 rounded-xl bg-blue-500 text-white text-sm font-bold flex items-center justify-center">1</div>
          <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl mb-4 mt-2">👤</div>
          <div class="font-semibold mb-2">{{ t('tm.steps.s1.title') }}</div>
          <p class="text-sm text-[#888] leading-7">{{ t('tm.steps.s1.desc') }}</p>
        </div>
        <div class="bg-white rounded-2xl p-6 shadow-sm relative">
          <div class="absolute -top-3 -left-1 w-8 h-8 rounded-xl bg-purple-500 text-white text-sm font-bold flex items-center justify-center">2</div>
          <div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl mb-4 mt-2">🔗</div>
          <div class="font-semibold mb-2">{{ t('tm.steps.s2.title') }}</div>
          <p class="text-sm text-[#888] leading-7">{{ t('tm.steps.s2.desc') }}</p>
        </div>
        <div class="bg-white rounded-2xl p-6 shadow-sm relative">
          <div class="absolute -top-3 -left-1 w-8 h-8 rounded-xl bg-green-500 text-white text-sm font-bold flex items-center justify-center">3</div>
          <div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl mb-4 mt-2">💵</div>
          <div class="font-semibold mb-2">{{ t('tm.steps.s3.title') }}</div>
          <p class="text-sm text-[#888] leading-7">{{ t('tm.steps.s3.desc') }}</p>
        </div>
      </div>
      <p class="mt-6 text-[#b8924a] font-semibold text-sm">{{ t('tm.steps.footer') }}</p>
      <p class="text-sm text-[#555]">{{ t('tm.steps.footer2') }}</p>
      <div class="mt-6">
        <button type="button" @click="handlePrimaryAction" class="inline-block rounded-full bg-gradient-to-r from-[#b8924a] to-[#c9a55a] text-white font-semibold px-10 py-3 text-base shadow-md hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">{{ primaryActionLabel }}</button>
      </div>
    </section>

    <!-- Section 7: Income Calculator -->
    <section class="mx-auto max-w-3xl px-4 py-12 text-center">
      <h2 class="text-3xl font-semibold text-[#1a1a1a]">{{ t('tm.calc.title') }}</h2>
      <p class="mt-2 text-sm text-[#888]">{{ t('tm.calc.sub') }}</p>
      <div class="mt-8 bg-white rounded-2xl p-8 shadow-sm text-left">
        <p class="text-center font-semibold text-[#1a1a1a] mb-1">{{ t('tm.calc.drag') }}</p>
        <p class="text-center text-xs text-[#aaa] mb-4">{{ t('tm.calc.dragnote') }}</p>
        <input type="range" min="1" max="50" v-model="monthlyReferrals" class="w-full accent-[#b8924a]" />
        <div class="flex justify-between text-xs text-[#aaa] mt-1 mb-4"><span>{{ t('tm.calc.random') }}</span><span>{{ t('tm.calc.unlimited') }}</span></div>
        <p class="text-center text-[#b8924a] font-bold text-lg">{{ t('tm.calc.monthly', { n: monthlyReferrals }) }}</p>
        <p class="text-center text-sm text-[#888] mb-6">{{ t('tm.calc.monthnote') }}</p>
        <p class="text-center font-semibold text-[#1a1a1a] mb-4">{{ t('tm.calc.trend') }}</p>
        <div class="relative h-32 mb-4">
          <svg viewBox="0 0 600 120" class="w-full h-full">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#c9a55a" stop-opacity="0.3"/>
                <stop offset="100%" stop-color="#c9a55a" stop-opacity="0.02"/>
              </linearGradient>
            </defs>
            <polygon :points="chartFill" fill="url(#chartGrad)"/>
            <polyline :points="chartLine" fill="none" stroke="#c9a55a" stroke-width="2"/>
            <circle v-for="(pt, i) in chartPoints" :key="i" :cx="pt.x" :cy="pt.y" r="3" fill="#4a90d9"/>
          </svg>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-sm">
          <div class="bg-[#f8f8f8] rounded-xl p-3"><div class="text-xs text-[#aaa]">{{ t('tm.calc.stat1') }}</div><div class="font-bold mt-1">{{ totalCustomers }}+</div><div class="text-xs text-[#aaa]">{{ t('tm.calc.stat1note') }}</div></div>
          <div class="bg-[#f8f8f8] rounded-xl p-3"><div class="text-xs text-[#aaa]">{{ t('tm.calc.stat2') }}</div><div class="font-bold mt-1 text-[#b8924a]">¥{{ month1 }}+</div><div class="text-xs text-[#aaa]">{{ t('tm.calc.stat2note') }}</div></div>
          <div class="bg-[#f8f8f8] rounded-xl p-3"><div class="text-xs text-[#aaa]">{{ t('tm.calc.stat3') }}</div><div class="font-bold mt-1 text-[#b8924a]">¥{{ month12 }}+</div><div class="text-xs text-[#aaa]">{{ t('tm.calc.stat3note') }}</div></div>
          <div class="bg-[#f8f8f8] rounded-xl p-3"><div class="text-xs text-[#aaa]">{{ t('tm.calc.stat4') }}</div><div class="font-bold mt-1 text-[#b8924a]">¥{{ yearTotal }}+</div><div class="text-xs text-[#aaa]">{{ t('tm.calc.stat4note') }}</div></div>
        </div>
        <div class="mt-4 bg-[#fdf6e8] rounded-xl p-4 text-center text-sm text-[#b8924a]">
          <p class="font-semibold">{{ t('tm.calc.highlight', { ratio: growthRatio }) }}</p>
          <p class="mt-1 text-xs">{{ t('tm.calc.highlightnote') }}</p>
        </div>
        <p class="mt-3 text-xs text-[#ccc] text-center">{{ t('tm.calc.disclaimer') }}</p>
      </div>
      <div class="mt-8">
        <button type="button" @click="handlePrimaryAction" class="inline-block rounded-full bg-gradient-to-r from-[#b8924a] to-[#c9a55a] text-white font-semibold px-10 py-3 text-base shadow-md hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">{{ primaryActionLabel }}</button>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { affiliateAPI } from '../../api'
import { useUserAuthStore } from '../../stores/userAuth'
import { captureAffiliateFromRoute, getAffiliateCode } from '../../utils/affiliate'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const userAuthStore = useUserAuthStore()
const opening = ref(false)
const pageChecking = ref(true)

const primaryActionLabel = computed(() => {
  if (opening.value) return '提交中...'
  if (userAuthStore.isAuthenticated) {
    return userAuthStore.isTokenMerchant ? '进入正业中心' : '立即开通 Token 商'
  }
  return t('tm.hero.cta')
})

const handlePrimaryAction = async () => {
  if (pageChecking.value) return
  if (opening.value) return
  if (!userAuthStore.isAuthenticated) {
    await router.push('/auth/register?redirect=%2Ftoken-merchant-v2')
    return
  }
  if (userAuthStore.isTokenMerchant) {
    await router.push('/zhengye')
    return
  }
  opening.value = true
  try {
    const inviterCode = typeof route.query.inviter_code === 'string'
      ? route.query.inviter_code
      : getAffiliateCode()
    await affiliateAPI.open(inviterCode ? { inviter_code: inviterCode } : undefined)
    userAuthStore.syncUserProfile({ is_token_merchant: true, token_merchant_at: new Date().toISOString() })
    await router.push('/zhengye')
  } catch (error) {
    console.error('open token merchant failed', error)
    window.alert('开通失败，请稍后重试')
  } finally {
    opening.value = false
  }
}

const monthlyReferrals = ref(5)

const avgMonthlySpend = 500
const buyCommission = 0.2
const useCommission = 0.08

const month1 = computed(() => Math.round(monthlyReferrals.value * avgMonthlySpend * buyCommission))
const month12 = computed(() => {
  let total = 0
  for (let m = 1; m <= 12; m++) total += monthlyReferrals.value * m * avgMonthlySpend * useCommission
  return Math.round(total / 12)
})
const yearTotal = computed(() => {
  let total = 0
  for (let m = 1; m <= 12; m++) total += monthlyReferrals.value * m * avgMonthlySpend * (buyCommission + useCommission)
  return Math.round(total)
})
const totalCustomers = computed(() => Math.round(monthlyReferrals.value * 12 * 1.06))
const growthRatio = computed(() => (month12.value / Math.max(month1.value, 1)).toFixed(1))

const chartPoints = computed(() => {
  const pts = []
  for (let i = 0; i < 12; i++) {
    const x = 30 + i * 50
    const income = monthlyReferrals.value * (i + 1) * avgMonthlySpend * useCommission
    const maxIncome = monthlyReferrals.value * 12 * avgMonthlySpend * useCommission
    const y = 110 - (income / maxIncome) * 90
    pts.push({ x, y })
  }
  return pts
})
const chartLine = computed(() => chartPoints.value.map(p => `${p.x},${p.y}`).join(' '))
const chartFill = computed(() => {
  const pts = chartPoints.value
  if (!pts.length) return ''
  const first = pts[0]!
  const last = pts[pts.length - 1]!
  return `${first.x},110 ` + pts.map(p => `${p.x},${p.y}`).join(' ') + ` ${last.x},110`
})

const tradItems = computed(() => [
  t('tm.compare.trad1'), t('tm.compare.trad2'), t('tm.compare.trad3'),
  t('tm.compare.trad4'), t('tm.compare.trad5'), t('tm.compare.trad6'),
])
const aiItems = computed(() => [
  t('tm.compare.ai1'), t('tm.compare.ai2'), t('tm.compare.ai3'),
  t('tm.compare.ai4'), t('tm.compare.ai5'), t('tm.compare.ai6'),
])
const personalFit = computed(() => [t('tm.mode.personal.fit1'), t('tm.mode.personal.fit2'), t('tm.mode.personal.fit3'), t('tm.mode.personal.fit4')])
const personalFeature = computed(() => [t('tm.mode.personal.feat1'), t('tm.mode.personal.feat2'), t('tm.mode.personal.feat3'), t('tm.mode.personal.feat4')])
const enterpriseFit = computed(() => [t('tm.mode.enterprise.fit1'), t('tm.mode.enterprise.fit2'), t('tm.mode.enterprise.fit3'), t('tm.mode.enterprise.fit4')])
const enterpriseFeature = computed(() => [t('tm.mode.enterprise.feat1'), t('tm.mode.enterprise.feat2'), t('tm.mode.enterprise.feat3'), t('tm.mode.enterprise.feat4')])

onMounted(async () => {
  try {
    await captureAffiliateFromRoute(route)
    // 路由守卫已保证进来的是已登录用户，onMounted 不再重复检查登录态
    if (userAuthStore.isTokenMerchant) {
      // 已是 Token 商，留在页面展示宣传内容，按钮会引导进入正业中心
      pageChecking.value = false
      return
    }
    const code = getAffiliateCode()
    if (!code) {
      // 注册客户无推广码，也可以直接申请 Token 商
      pageChecking.value = false
      return
    }
    const response = await affiliateAPI.getPublicContext(code)
    if (!response?.data?.data?.merchant_page_enabled) {
      // 推广码存在但商家页未开启，仍然允许注册客户申请（不强制跳走）
      pageChecking.value = false
      return
    }
    pageChecking.value = false
  } catch {
    pageChecking.value = false
  }
})
</script>
