<template>
  <div class="tm-shell min-h-screen bg-[#f5f5f7] pt-20 md:pt-24 pb-10">
    <div class="mx-auto max-w-5xl px-4">
      <section class="mx-auto mt-10 max-w-3xl text-center">
        <h1 class="text-[44px] leading-tight font-semibold text-[#1f1f1f]">不是副业，是事业</h1>
        <h2 class="mt-3 text-[52px] leading-tight font-semibold">
          <span class="bg-gradient-to-r from-[#c7a86a] to-[#e7d5a6] bg-clip-text text-transparent">零成本成为AI Token商人</span>
        </h2>
        <p class="mx-auto mt-7 max-w-xl text-[18px] leading-8 text-[#666]">
          在AI浪潮中建立你的商业版图<br />
          不需要资金，不需要技术，不需要囤货<br />
          今天注册，今天就能开始赚钱
        </p>
      </section>

      <section class="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
        <article class="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-black/5">
          <div class="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#d8edf8] text-[#2f7fa6]">💼</div>
          <h3 class="text-lg font-semibold text-[#232323]">真正的事业</h3>
          <p class="mt-3 text-sm leading-6 text-[#777]">不是额外人性化<br />你现在经营一门生意<br />你卖的是AI时代的“水和电”</p>
        </article>
        <article class="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-black/5">
          <div class="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#dcf6e8] text-[#199b5f]">⚡</div>
          <h3 class="text-lg font-semibold text-[#232323]">零成本启动</h3>
          <p class="mt-3 text-sm leading-6 text-[#777]">别人囤货要100万<br />你只需要0元<br />没有任何风险</p>
        </article>
        <article class="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-black/5">
          <div class="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f5edd6] text-[#9f7a20]">💰</div>
          <h3 class="text-lg font-semibold text-[#232323]">持续收益</h3>
          <p class="mt-3 text-sm leading-6 text-[#777]">不是一次性买卖<br />客户用一次，你赚一次<br />客户用一年，你赚一年</p>
        </article>
      </section>

      <div class="mt-10 text-center">
        <router-link
          to="/auth/register?redirect=%2Faffiliate-hub"
          class="inline-flex items-center rounded-full bg-gradient-to-r from-[#b9954a] to-[#d9bc72] px-10 py-3 text-base font-semibold text-white shadow-lg shadow-[#d9bc72]/35 hover:opacity-95"
        >
          立即开启我的AI事业
        </router-link>
      </div>
    </div>
  </div>
</template>
