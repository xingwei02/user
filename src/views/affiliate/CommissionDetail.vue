<template>
  <div class="container mx-auto px-4 py-6 max-w-6xl">
    <section class="rounded-2xl p-5 text-white shadow-xl bg-gradient-to-r from-slate-900 via-indigo-900 to-blue-700">
      <div class="flex items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold">佣金明细</h1>
          <p class="text-blue-100 mt-1">系统内嵌页面（真实接口）</p>
        </div>
      </div>
    </section>

    <section class="theme-panel-soft border theme-border rounded-xl p-4 mt-4 overflow-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left border-b theme-border">
            <th class="py-2">创建时间</th>
            <th class="py-2">类型</th>
            <th class="py-2">订单号</th>
            <th class="py-2">金额</th>
            <th class="py-2">状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" class="border-b theme-border/50">
            <td class="py-2">{{ item.created_at }}</td>
            <td class="py-2">{{ item.commission_type }}</td>
            <td class="py-2">{{ item.order_no || '-' }}</td>
            <td class="py-2">{{ item.commission_amount }}</td>
            <td class="py-2">{{ item.status }}</td>
          </tr>
          <tr v-if="items.length===0">
            <td colspan="5" class="py-6 text-center theme-text-muted">暂无佣金记录</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { affiliateAPI } from '../../api'
import { useToast } from '../../composables/useToast'

const { toast } = useToast()
const items = ref<any[]>([])

const load = async () => {
  try {
    const { data } = await affiliateAPI.commissions({ page: 1, page_size: 20 })
    const payload = data?.data || data || {}
    items.value = payload.items || []
  } catch (e) {
    toast.error('佣金明细加载失败')
  }
}

onMounted(load)
</script>
