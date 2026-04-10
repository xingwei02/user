<template>
  <div class="my-promotion">
    <div class="header">
      <h1>我的推广</h1>
      <p class="subtitle">查看你的推广等级、进度和佣金</p>
    </div>

    <div class="content">
      <!-- 等级卡片 -->
      <div class="level-card">
        <div class="level-info">
          <div class="level-badge" :class="`level-${progress.currentLevel}`">
            {{ getLevelName(progress.currentLevel) }}
          </div>
          <div class="level-details">
            <div class="detail-item">
              <span class="label">当前返利比例</span>
              <span class="value">{{ progress.currentRate }}%</span>
            </div>
            <div class="detail-item">
              <span class="label">周期</span>
              <span class="value">{{ formatDate(progress.cycleStart) }} ~ {{ formatDate(progress.cycleEnd) }}</span>
            </div>
          </div>
        </div>

        <!-- 升级进度 -->
        <div class="upgrade-section">
          <h3>升级进度</h3>
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progress.progressPercent + '%' }"></div>
            </div>
            <div class="progress-info">
              <span class="current">{{ progress.currentProgress.toFixed(2) }}</span>
              <span class="separator">/</span>
              <span class="target">{{ progress.conditionValue.toFixed(2) }}</span>
              <span class="unit">{{ progress.conditionType === 'amount' ? '元' : '单' }}</span>
            </div>
          </div>
          <p class="progress-text">
            {{ progress.progressPercent.toFixed(0) }}% 完成 - 
            {{ progress.conditionType === 'amount' ? '销售额' : '订单数' }}
            {{ progress.conditionType === 'amount' ? '≥' : '≥' }}
            {{ progress.conditionValue.toFixed(2) }}
          </p>
        </div>
      </div>

      <!-- 推广链接 -->
      <div class="section">
        <h2>推广链接</h2>
        <div class="promotion-link-box">
          <div class="link-input-group">
            <input 
              type="text" 
              :value="promotionLink" 
              readonly 
              class="link-input"
            />
            <button @click="copyLink" class="btn btn-copy">
              {{ linkCopied ? '已复制' : '复制' }}
            </button>
          </div>
          <p class="link-hint">分享这个链接给你的推广伙伴，他们通过这个链接注册后，就会成为你的下级</p>
        </div>
      </div>

      <!-- 佣金统计 -->
      <div class="section">
        <h2>佣金统计</h2>
        <div class="commission-cards">
          <div class="commission-card">
            <div class="card-label">待确认佣金</div>
            <div class="card-value">¥{{ commissionStats.pending.toFixed(2) }}</div>
            <div class="card-hint">{{ commissionStats.pendingCount }} 笔订单</div>
          </div>
          <div class="commission-card">
            <div class="card-label">可提现佣金</div>
            <div class="card-value">¥{{ commissionStats.available.toFixed(2) }}</div>
            <div class="card-hint">可随时提现</div>
          </div>
          <div class="commission-card">
            <div class="card-label">已提现佣金</div>
            <div class="card-value">¥{{ commissionStats.withdrawn.toFixed(2) }}</div>
            <div class="card-hint">历史累计</div>
          </div>
        </div>
      </div>

      <!-- 佣金明细 -->
      <div class="section">
        <h2>佣金明细</h2>
        <div class="table-wrapper">
          <table class="commission-table">
            <thead>
              <tr>
                <th>订单号</th>
                <th>佣金金额</th>
                <th>返利比例</th>
                <th>状态</th>
                <th>确认时间</th>
                <th>可提现时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in commissions" :key="item.orderNo">
                <td class="order-no">{{ item.orderNo }}</td>
                <td class="amount">¥{{ item.commissionAmount.toFixed(2) }}</td>
                <td>{{ item.commissionRate }}%</td>
                <td>
                  <span class="status-badge" :class="`status-${item.status}`">
                    {{ getStatusLabel(item.status) }}
                  </span>
                </td>
                <td>{{ item.confirmAt ? formatDate(item.confirmAt) : '-' }}</td>
                <td>{{ item.availableAt ? formatDate(item.availableAt) : '-' }}</td>
              </tr>
              <tr v-if="commissions.length === 0">
                <td colspan="6" class="empty-state">暂无佣金记录</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Progress {
  currentLevel: number
  currentRate: number
  cycleStart: string
  cycleEnd: string
  conditionType: string
  conditionValue: number
  currentProgress: number
  progressPercent: number
  orderCount: number
}

interface CommissionItem {
  orderNo: string
  commissionAmount: number
  commissionRate: number
  status: string
  confirmAt?: string
  availableAt?: string
  createdAt: string
}

interface CommissionStats {
  pending: number
  available: number
  withdrawn: number
  pendingCount: number
}

const progress = ref<Progress>({
  currentLevel: 1,
  currentRate: 10,
  cycleStart: new Date().toISOString(),
  cycleEnd: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  conditionType: 'amount',
  conditionValue: 500,
  currentProgress: 250,
  progressPercent: 50,
  orderCount: 5,
})

const commissions = ref<CommissionItem[]>([])
const commissionStats = ref<CommissionStats>({
  pending: 0,
  available: 0,
  withdrawn: 0,
  pendingCount: 0,
})

const promotionLink = ref('')
const linkCopied = ref(false)

const getLevelName = (level: number): string => {
  const names: Record<number, string> = {
    1: '铜牌',
    2: '银牌',
    3: '金牌',
  }
  return names[level] || '未知'
}

const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    pending: '待确认',
    available: '可提现',
    withdrawn: '已提现',
    invalid: '已失效',
  }
  return labels[status] || status
}

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(promotionLink.value)
    linkCopied.value = true
    setTimeout(() => {
      linkCopied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}

const loadData = async () => {
  try {
    // 加载推广进度
    const progressResponse = await fetch('/api/user/promotion/progress')
    if (progressResponse.ok) {
      const data = await progressResponse.json()
      progress.value = data.data
    }

    // 加载佣金列表
    const commissionsResponse = await fetch('/api/user/promotion/commissions')
    if (commissionsResponse.ok) {
      const data = await commissionsResponse.json()
      commissions.value = data.data || []

      // 计算统计数据
      commissionStats.value = {
        pending: commissions.value
          .filter(c => c.status === 'pending')
          .reduce((sum, c) => sum + c.commissionAmount, 0),
        available: commissions.value
          .filter(c => c.status === 'available')
          .reduce((sum, c) => sum + c.commissionAmount, 0),
        withdrawn: commissions.value
          .filter(c => c.status === 'withdrawn')
          .reduce((sum, c) => sum + c.commissionAmount, 0),
        pendingCount: commissions.value.filter(c => c.status === 'pending').length,
      }
    }

    // 生成推广链接
    const userResponse = await fetch('/api/user/profile')
    if (userResponse.ok) {
      const userData = await userResponse.json()
      promotionLink.value = `${window.location.origin}?ref=${userData.data.affiliateCode}`
    }
  } catch (error) {
    console.error('Failed to load data:', error)
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.my-promotion {
  padding: 24px;
  max-width: 1000px;
  margin: 0 auto;
}

.header {
  margin-bottom: 32px;
}

.header h1 {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.subtitle {
  color: #666;
  margin: 0;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.level-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 32px;
  color: white;
}

.level-info {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
}

.level-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  font-size: 18px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
}

.level-badge.level-1 {
  background: rgba(251, 191, 36, 0.3);
}

.level-badge.level-2 {
  background: rgba(96, 165, 250, 0.3);
}

.level-badge.level-3 {
  background: rgba(236, 72, 153, 0.3);
}

.level-details {
  flex: 1;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
}

.detail-item .label {
  opacity: 0.8;
}

.detail-item .value {
  font-weight: 600;
  font-size: 16px;
}

.upgrade-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.upgrade-section h3 {
  font-size: 14px;
  margin: 0 0 12px 0;
  opacity: 0.9;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  transition: width 0.3s;
}

.progress-info {
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-size: 14px;
  white-space: nowrap;
}

.progress-info .current {
  font-weight: 600;
  font-size: 16px;
}

.progress-info .target {
  font-weight: 600;
}

.progress-text {
  margin: 12px 0 0 0;
  font-size: 13px;
  opacity: 0.9;
}

.section {
  background: white;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid #e5e7eb;
}

.section h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #1f2937;
}

.promotion-link-box {
  background: #f9fafb;
  border-radius: 8px;
  padding: 16px;
}

.link-input-group {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.link-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  font-family: monospace;
  background: white;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-copy {
  background: #3b82f6;
  color: white;
}

.btn-copy:hover {
  background: #2563eb;
}

.link-hint {
  font-size: 13px;
  color: #666;
  margin: 0;
}

.commission-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.commission-card {
  background: #f9fafb;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e5e7eb;
}

.card-label {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
}

.card-value {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.card-hint {
  font-size: 12px;
  color: #999;
}

.table-wrapper {
  overflow-x: auto;
}

.commission-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.commission-table th {
  background: #f3f4f6;
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
}

.commission-table td {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.commission-table tr:hover {
  background: #f9fafb;
}

.order-no {
  font-family: monospace;
  font-size: 12px;
  color: #666;
}

.amount {
  font-weight: 600;
  color: #1f2937;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.status-pending {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.status-available {
  background: #dbeafe;
  color: #0c4a6e;
}

.status-badge.status-withdrawn {
  background: #dcfce7;
  color: #166534;
}

.status-badge.status-invalid {
  background: #fee2e2;
  color: #991b1b;
}

.empty-state {
  text-align: center;
  color: #999;
  padding: 40px 12px !important;
}

@media (max-width: 768px) {
  .level-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .commission-cards {
    grid-template-columns: 1fr;
  }

  .commission-table {
    font-size: 12px;
  }

  .commission-table th,
  .commission-table td {
    padding: 8px;
  }
}
</style>
