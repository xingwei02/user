<template>
  <div class="token-merchant-page container mx-auto max-w-6xl px-4 pt-28 pb-8 md:pt-32">
    <section class="rounded-2xl p-6 text-white shadow-xl bg-gradient-to-r from-slate-900 via-blue-900 to-blue-700">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold">推广合伙人中心</h1>
          <p class="mt-2 text-blue-100">游客模式预览页面（登录后可查看完整数据与明细）</p>
        </div>
        <router-link to="/auth/login?redirect=%2Faffiliate-hub" class="inline-flex items-center justify-center rounded-xl bg-white/95 text-blue-700 font-semibold px-4 py-2 hover:bg-white">
          登录查看完整数据
        </router-link>
      </div>
    </section>

    <section class="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
      <div class="theme-panel-soft border theme-border rounded-xl p-4">
        <div class="text-xs theme-text-muted">累计佣金</div>
        <div class="text-2xl font-bold mt-2">--</div>
      </div>
      <div class="theme-panel-soft border theme-border rounded-xl p-4">
        <div class="text-xs theme-text-muted">待结算</div>
        <div class="text-2xl font-bold mt-2 text-amber-500">--</div>
      </div>
      <div class="theme-panel-soft border theme-border rounded-xl p-4">
        <div class="text-xs theme-text-muted">可提现</div>
        <div class="text-2xl font-bold mt-2 text-emerald-500">--</div>
      </div>
      <div class="theme-panel-soft border theme-border rounded-xl p-4">
        <div class="text-xs theme-text-muted">已提现</div>
        <div class="text-2xl font-bold mt-2">--</div>
      </div>
    </section>

    <section class="grid md:grid-cols-2 gap-4 mt-4">
      <div class="theme-panel-soft border theme-border rounded-xl p-4">
        <h3 class="text-lg font-semibold">邀请工具</h3>
        <div class="mt-3 text-sm theme-text-muted">邀请码</div>
        <div class="mt-1 rounded-lg border theme-border px-3 py-2 font-mono">登录后显示</div>
        <div class="mt-3 text-sm theme-text-muted">邀请链接</div>
        <div class="mt-1 rounded-lg border theme-border px-3 py-2 break-all text-sm">登录后显示</div>
      </div>
      <div class="theme-panel-soft border theme-border rounded-xl p-4">
        <h3 class="text-lg font-semibold">2级分佣规则（展示）</h3>
        <ul class="mt-2 text-sm leading-7 theme-text-secondary list-disc pl-5">
          <li>一级佣金：20%</li>
          <li>二级佣金：8%</li>
          <li>订单完成后 T+7 解冻</li>
          <li>退款/拒付自动冲正</li>
          <li>提现门槛：登录后按系统配置显示</li>
        </ul>
      </div>
    </section>
  </div>
</template>
