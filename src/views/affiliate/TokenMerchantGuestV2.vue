<template>
  <div class="token-merchant-v2 min-h-screen bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(59,130,246,.18),transparent),radial-gradient(1000px_500px_at_80%_0%,rgba(14,165,233,.14),transparent)] pt-24 md:pt-28 pb-12">
    <div class="container mx-auto max-w-6xl px-4">
      <section class="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-800 p-7 text-white shadow-2xl">
        <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p class="text-xs tracking-[0.22em] uppercase text-blue-200">TOKEN MERCHANT</p>
            <h1 class="mt-2 text-3xl font-black md:text-4xl">数字商品分销合伙人计划</h1>
            <p class="mt-3 max-w-2xl text-sm leading-7 text-blue-100">
              游客模式展示页（新版本）。可先查看规则、收益模型与流程；登录后进入完整合伙人后台查看实时数据、佣金明细与提现记录。
            </p>
            <div class="mt-5 flex flex-wrap gap-3">
              <router-link to="/auth/login?redirect=%2Faffiliate-hub" class="rounded-xl bg-white px-5 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50">登录进入后台</router-link>
              <router-link to="/auth/register?redirect=%2Faffiliate-hub" class="rounded-xl border border-white/40 px-5 py-2 text-sm font-semibold hover:bg-white/10">注册合伙人账号</router-link>
            </div>
          </div>
          <div class="grid w-full max-w-sm grid-cols-2 gap-3 text-sm">
            <div class="rounded-xl border border-white/20 bg-white/10 p-3">
              <div class="text-blue-100">一级佣金</div>
              <div class="mt-1 text-2xl font-black">20%</div>
            </div>
            <div class="rounded-xl border border-white/20 bg-white/10 p-3">
              <div class="text-blue-100">二级佣金</div>
              <div class="mt-1 text-2xl font-black">8%</div>
            </div>
            <div class="rounded-xl border border-white/20 bg-white/10 p-3">
              <div class="text-blue-100">结算周期</div>
              <div class="mt-1 text-lg font-bold">T+7</div>
            </div>
            <div class="rounded-xl border border-white/20 bg-white/10 p-3">
              <div class="text-blue-100">提现门槛</div>
              <div class="mt-1 text-lg font-bold">按系统配置</div>
            </div>
          </div>
        </div>
      </section>

      <section class="mt-5 grid gap-4 md:grid-cols-3">
        <div class="rounded-2xl border theme-border theme-panel-soft p-5">
          <h3 class="text-base font-bold">01 · 注册并绑定</h3>
          <p class="mt-2 text-sm leading-7 theme-text-muted">注册账号后登录合伙人后台，系统自动生成唯一推广身份与邀请链接。</p>
        </div>
        <div class="rounded-2xl border theme-border theme-panel-soft p-5">
          <h3 class="text-base font-bold">02 · 分享推广</h3>
          <p class="mt-2 text-sm leading-7 theme-text-muted">通过社群、内容站、短链接渠道进行推广，系统自动识别归因。</p>
        </div>
        <div class="rounded-2xl border theme-border theme-panel-soft p-5">
          <h3 class="text-base font-bold">03 · 获取佣金</h3>
          <p class="mt-2 text-sm leading-7 theme-text-muted">订单有效后计入佣金池，满足规则即可发起提现申请。</p>
        </div>
      </section>

      <section class="mt-5 rounded-2xl border theme-border theme-panel-soft p-6">
        <h2 class="text-xl font-black">常见问题</h2>
        <div class="mt-4 space-y-3 text-sm leading-7">
          <div>
            <div class="font-semibold">Q1：游客能看到真实佣金吗？</div>
            <div class="theme-text-muted">不能。游客页仅展示规则与示例，真实数据需登录后查看。</div>
          </div>
          <div>
            <div class="font-semibold">Q2：是否支持两级分佣？</div>
            <div class="theme-text-muted">支持，比例以当前系统配置为准。</div>
          </div>
          <div>
            <div class="font-semibold">Q3：页面是否独立？</div>
            <div class="theme-text-muted">是，当前版本路由为 <code>/token-merchant-v2</code>，不影响原有页面。</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
