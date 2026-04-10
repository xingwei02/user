<template>
  <div class="promotion-link">
    <div class="header">
      <h1>推广链接</h1>
      <p class="subtitle">生成和管理你的推广链接</p>
    </div>

    <div class="content">
      <!-- 主推广链接 -->
      <div class="section">
        <h2>主推广链接</h2>
        <div class="link-card">
          <div class="link-display">
            <div class="link-label">你的推广链接</div>
            <div class="link-box">
              <input 
                type="text" 
                :value="mainLink" 
                readonly 
                class="link-input"
              />
              <button @click="copyMainLink" class="btn btn-copy">
                {{ mainLinkCopied ? '已复制' : '复制链接' }}
              </button>
            </div>
          </div>
          <div class="link-stats">
            <div class="stat">
              <div class="stat-label">点击次数</div>
              <div class="stat-value">{{ stats.clicks }}</div>
            </div>
            <div class="stat">
              <div class="stat-label">转化人数</div>
              <div class="stat-value">{{ stats.conversions }}</div>
            </div>
            <div class="stat">
              <div class="stat-label">转化率</div>
              <div class="stat-value">{{ stats.conversionRate }}%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 自定义链接 -->
      <div class="section">
        <h2>自定义推广链接</h2>
        <div class="custom-link-form">
          <div class="form-group">
            <label>链接标签（可选）</label>
            <input 
              v-model="customLabel" 
              type="text" 
              placeholder="如：微信群、朋友圈等"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label>链接描述（可选）</label>
            <textarea 
              v-model="customDesc" 
              placeholder="描述这个链接的用途"
              class="form-textarea"
              rows="3"
            ></textarea>
          </div>
          <button @click="generateCustomLink" class="btn btn-primary">
            生成自定义链接
          </button>
        </div>

        <!-- 自定义链接列表 -->
        <div v-if="customLinks.length > 0" class="custom-links-list">
          <h3>已生成的自定义链接</h3>
          <div class="links-table">
            <table>
              <thead>
                <tr>
                  <th>标签</th>
                  <th>链接</th>
                  <th>点击</th>
                  <th>转化</th>
                  <th>创建时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="link in customLinks" :key="link.id">
                  <td>{{ link.label || '-' }}</td>
                  <td class="link-cell">
                    <input 
                      type="text" 
                      :value="link.url" 
                      readonly 
                      class="link-input-small"
                    />
                  </td>
                  <td>{{ link.clicks }}</td>
                  <td>{{ link.conversions }}</td>
                  <td>{{ formatDate(link.createdAt) }}</td>
                  <td>
                    <button @click="copyCustomLink(link.url)" class="btn-small">复制</button>
                    <button @click="deleteCustomLink(link.id)" class="btn-small btn-danger">删除</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 推广指南 -->
      <div class="section">
        <h2>推广指南</h2>
        <div class="guide-content">
          <div class="guide-item">
            <h3>📱 社交媒体推广</h3>
            <p>在微信、QQ、微博等社交平台分享你的推广链接，邀请朋友注册。每个新注册用户都会成为你的下级推广伙伴。</p>
          </div>
          <div class="guide-item">
            <h3>💬 群组推广</h3>
            <p>在各类群组中分享推广链接，但要注意遵守群规。可以创建多个自定义链接来追踪不同群组的效果。</p>
          </div>
          <div class="guide-item">
            <h3>📊 数据分析</h3>
            <p>定期查看链接的点击和转化数据，了解哪些推广渠道效果最好，优化你的推广策略。</p>
          </div>
          <div class="guide-item">
            <h3>🎯 等级升级</h3>
            <p>通过推广下级的销售额或订单数，达到升级条件即可自动升级到更高等级，获得更高的返利比例。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface CustomLink {
  id: number
  label: string
  url: string
  clicks: number
  conversions: number
  createdAt: string
}

interface Stats {
  clicks: number
  conversions: number
  conversionRate: number
}

const mainLink = ref('')
const mainLinkCopied = ref(false)
const customLabel = ref('')
const customDesc = ref('')
const customLinks = ref<CustomLink[]>([])
const stats = ref<Stats>({
  clicks: 0,
  conversions: 0,
  conversionRate: 0,
})

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

const copyMainLink = async () => {
  try {
    await navigator.clipboard.writeText(mainLink.value)
    mainLinkCopied.value = true
    setTimeout(() => {
      mainLinkCopied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}

const copyCustomLink = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url)
    alert('链接已复制')
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}

const generateCustomLink = async () => {
  if (!customLabel.value.trim()) {
    alert('请输入链接标签')
    return
  }

  try {
    const response = await fetch('/api/user/promotion/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        label: customLabel.value,
        description: customDesc.value,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      customLinks.value.unshift(data.data)
      customLabel.value = ''
      customDesc.value = ''
      alert('自定义链接已生成')
    } else {
      alert('生成失败，请重试')
    }
  } catch (error) {
    console.error('Failed to generate link:', error)
    alert('网络错误')
  }
}

const deleteCustomLink = async (id: number) => {
  if (!confirm('确定要删除这个链接吗？')) {
    return
  }

  try {
    const response = await fetch(`/api/user/promotion/links/${id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      customLinks.value = customLinks.value.filter(link => link.id !== id)
      alert('链接已删除')
    } else {
      alert('删除失败，请重试')
    }
  } catch (error) {
    console.error('Failed to delete link:', error)
    alert('网络错误')
  }
}

const loadData = async () => {
  try {
    // 加载主链接和统计
    const response = await fetch('/api/user/promotion/main-link')
    if (response.ok) {
      const data = await response.json()
      mainLink.value = data.data.url
      stats.value = data.data.stats
    }

    // 加载自定义链接
    const linksResponse = await fetch('/api/user/promotion/links')
    if (linksResponse.ok) {
      const data = await linksResponse.json()
      customLinks.value = data.data || []
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
.promotion-link {
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

.link-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.link-display {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.link-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.link-box {
  display: flex;
  gap: 8px;
}

.link-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 13px;
  font-family: monospace;
  background: #f9fafb;
}

.link-input-small {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 12px;
  font-family: monospace;
  background: #f9fafb;
}

.btn {
  padding: 10px 16px;
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
  white-space: nowrap;
}

.btn-copy:hover {
  background: #2563eb;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-small {
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  margin-right: 4px;
}

.btn-small:hover {
  background: #f3f4f6;
}

.btn-small.btn-danger {
  border-color: #ef4444;
  color: #ef4444;
}

.btn-small.btn-danger:hover {
  background: #fee2e2;
}

.link-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat {
  background: #f9fafb;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.stat-label {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
}

.custom-link-form {
  background: #f9fafb;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.custom-links-list {
  margin-top: 24px;
}

.custom-links-list h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #1f2937;
}

.links-table {
  overflow-x: auto;
}

.links-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.links-table th {
  background: #f3f4f6;
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
}

.links-table td {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.links-table tr:hover {
  background: #f9fafb;
}

.link-cell {
  max-width: 200px;
}

.guide-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.guide-item {
  background: #f9fafb;
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid #3b82f6;
}

.guide-item h3 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #1f2937;
}

.guide-item p {
  font-size: 13px;
  color: #666;
  margin: 0;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .link-card {
    grid-template-columns: 1fr;
  }

  .link-stats {
    grid-template-columns: 1fr;
  }

  .guide-content {
    grid-template-columns: 1fr;
  }

  .links-table {
    font-size: 12px;
  }

  .links-table th,
  .links-table td {
    padding: 8px;
  }
}
</style>
