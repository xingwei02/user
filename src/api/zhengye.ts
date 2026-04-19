/**
 * 正业（多级分销中心）API
 * 已切换到项目真实后端 `/api/v1/affiliate/*`
 * 保持对 `user/src/views/zhengye.vue` 的调用方式不变：直接返回业务 data
 */

import { userApi } from './client'

type DashboardData = {
  opened?: boolean
  affiliate_code?: string
  promotion_path?: string
  my_commission_rate?: number
  max_commission_rate?: number
  upgrade_condition?: string
  paid_commission?: string
  pending_commission?: string
  total_commission?: string
  direct_partners?: number
  total_orders?: number
  total_sales?: string
  discount_rate?: number
}

type StatsData = {
  today?: Record<string, any>
  total?: Record<string, any>
  commission_rate?: number
  discount_rate?: number
  paid_settlement?: string
  pending_settlement?: string
  trend?: Array<{ date: string; amount: number }>
}

type RankData = Record<string, any>
type ContactData = {
  phone?: string
  notice?: string
  group_image_url?: string
  parent_group_image_url?: string
}
type DiscountData = {
  discount_rate?: number
  merchant_page_enabled?: boolean
  group_section_enabled?: boolean
}
type PartnerItem = {
  id: number
  code: string
  email: string
  avatar: string
  level_name: string
  level_icon: string
  rate: number
  today_direct_sales: string
  total_direct_sales: string
  today_network_sales: string
  total_network_sales: string
  total_network_orders: number
  today_settlement: string
  total_settlement: string
  group_visible: boolean
  is_new: boolean
}
type TeamData = {
  direct_count: number
  total_count: number
  network_buyers: number
  graduated_count: number
  members: Array<{
    id: number
    code: string
    email: string
    avatar: string
    self_sales: string
    team_settlement: string
    self_orders: string
    channel_count: string
    is_new: boolean
  }>
  total: number
  page: number
  page_size: number
}
type SettlementData = {
  date: string
  summary: {
    direct_nodes: number
    orders: number
    total_sales: string
    refund_amount: string
    net_sales: string
    original_settlement: string
    refund_deduction: string
    net_settlement: string
    net_settlement_rate: string
    paid_amount: string
    unpaid_amount: string
  }
  items: Array<{
    id: number
    code: string
    email: string
    avatar: string
    self_sales: string
    team_sales: string
    total_sales: string
    refund_amount: string
    net_sales: string
    self_orders: number
    team_orders: number
    net_settlement: string
    original_settlement: string
    refund_deduction: string
    settled_orders: number
    pending_orders: number
    direct_partners: number
    total_partners: number
  }>
  total: number
  page: number
  page_size: number
}
type OrderItem = {
  order_no: string
  channel: string
  product_name: string
  paid_amount: string
  status: string
  partner_commission: string
  my_commission: string
  referrer_cost: string
  created_at: string
}
type LevelRule = {
  enabled: boolean
  metric: 'orders' | 'sales'
  period: 'daily' | 'weekly'
  targetValue: number
  consecutiveDays: number
}
type LevelItem = {
  id: number
  name: string
  icon: string
  rate: number
  member_count: number
  is_entry: boolean
  upgrade_condition: { days: number; daily_amount: number } | null
  style: string
  rule?: LevelRule
}
type LevelGroup = {
  level_id: number
  level_name: string
  rate: number
  members: Array<{
    id: number
    code: string
    email: string
    avatar: string
  }>
}
type LevelsData = {
  my_rate: number
  entry_rate: number
  levels: LevelItem[]
  team_by_level: LevelGroup[]
}

async function unwrap<T>(promise: Promise<{ data: { data: T } }>): Promise<T> {
  const res = await promise
  return res.data.data
}

const formatMoney = (v: unknown): string => {
  const n = Number(v ?? 0)
  return Number.isFinite(n) ? n.toFixed(2) : '0.00'
}

const mapDashboard = (data: any): DashboardData => ({
  opened: true,
  affiliate_code: data?.affiliate_code || '',
  promotion_path: data?.promotion_path || '',
  my_commission_rate: Number(data?.my_rate ?? 0),
  max_commission_rate: Number(data?.max_commission_rate ?? data?.my_rate ?? 0),
  upgrade_condition: data?.upgrade_condition || '',
  paid_commission: formatMoney(data?.paid_commission),
  pending_commission: formatMoney(data?.pending_commission),
  total_commission: formatMoney(data?.total_earnings),
  direct_partners: Number(data?.direct_partners ?? data?.total_partners ?? 0),
  total_orders: Number(data?.total_orders ?? 0),
  total_sales: formatMoney(data?.total_sales),
  discount_rate: Number(data?.discount_rate ?? 0),
})

const mapStats = (data: any): StatsData => ({
  today: {
    total_sales: data?.today?.total_sales != null ? formatMoney(data?.today?.total_sales) : undefined,
    self_sales: data?.today?.self_sales != null ? formatMoney(data?.today?.self_sales) : undefined,
    net_sales: data?.today?.net_sales != null ? formatMoney(data?.today?.net_sales) : undefined,
    self_net_sales: data?.today?.self_net_sales != null ? formatMoney(data?.today?.self_net_sales) : undefined,
    net_settlement: data?.today?.net_settlement != null ? formatMoney(data?.today?.net_settlement) : undefined,
    net_settlement_original: data?.today?.net_settlement_original != null ? formatMoney(data?.today?.net_settlement_original) : undefined,
    net_settlement_refund: data?.today?.net_settlement_refund != null ? formatMoney(data?.today?.net_settlement_refund) : undefined,
    network_orders: data?.today?.network_orders != null ? Number(data?.today?.network_orders) : undefined,
    self_orders: data?.today?.self_orders != null ? Number(data?.today?.self_orders) : undefined,
    new_channels: data?.today?.new_channels != null ? Number(data?.today?.new_channels) : undefined,
    refund_amount: data?.today?.refund_amount != null ? formatMoney(data?.today?.refund_amount) : undefined,
    self_refund: data?.today?.self_refund != null ? formatMoney(data?.today?.self_refund) : undefined,
  },
  total: {
    total_sales: data?.total?.total_sales != null ? formatMoney(data?.total?.total_sales) : undefined,
    self_sales: data?.total?.self_sales != null ? formatMoney(data?.total?.self_sales) : undefined,
    net_sales: data?.total?.net_sales != null ? formatMoney(data?.total?.net_sales) : undefined,
    self_net_sales: data?.total?.self_net_sales != null ? formatMoney(data?.total?.self_net_sales) : undefined,
    net_settlement: data?.total?.net_settlement != null ? formatMoney(data?.total?.net_settlement) : undefined,
    net_settlement_original: data?.total?.net_settlement_original != null ? formatMoney(data?.total?.net_settlement_original) : undefined,
    net_settlement_refund: data?.total?.net_settlement_refund != null ? formatMoney(data?.total?.net_settlement_refund) : undefined,
    network_orders: data?.total?.network_orders != null ? Number(data?.total?.network_orders) : undefined,
    self_orders: data?.total?.self_orders != null ? Number(data?.total?.self_orders) : undefined,
    channels: data?.total?.channels != null ? Number(data?.total?.channels) : undefined,
    refund_amount: data?.total?.refund_amount != null ? formatMoney(data?.total?.refund_amount) : undefined,
    self_refund: data?.total?.self_refund != null ? formatMoney(data?.total?.self_refund) : undefined,
  },
  commission_rate: data?.commission_rate != null ? Number(data?.commission_rate) : undefined,
  discount_rate: data?.discount_rate != null ? Number(data?.discount_rate) : undefined,
  paid_settlement: data?.paid_settlement != null ? formatMoney(data?.paid_settlement) : undefined,
  pending_settlement: data?.pending_settlement != null ? formatMoney(data?.pending_settlement) : undefined,
  trend: Array.isArray(data?.trend)
    ? data.trend.map((item: any) => ({ date: item.date, amount: Number(item.earnings ?? 0) }))
    : [],
})

// 后端 ZhengyeRankDimension: { name, value, rank, my_val }
// 前端 zhengye.vue 使用: { code, amount, count, time, minutes, rank }
const mapRankDim = (d: any, type: 'sales' | 'orders' | 'time' | 'minutes' = 'sales') => {
  if (!d) return { code: '--', amount: '0.00', count: 0, time: '--', minutes: 0, rank: 0, my_val: '--' }
  const base = { code: d.name || '--', rank: Number(d.rank ?? 0), my_val: d.my_val || '--' }
  switch (type) {
    case 'orders': return { ...base, amount: '0.00', count: Number(d.value ?? 0), time: '--', minutes: 0 }
    case 'time':   return { ...base, amount: '0.00', count: 0, time: String(d.value ?? '--'), minutes: 0 }
    case 'minutes': return { ...base, amount: '0.00', count: 0, time: '--', minutes: Number(String(d.value ?? '0').replace(/[^0-9]/g, '')) }
    default:       return { ...base, amount: String(d.value ?? '0.00'), count: 0, time: '--', minutes: 0 }
  }
}

const mapRank = (data: any): RankData => {
  if (!data) return {}
  return {
    use_custom: Boolean(data.use_custom),
    date: new Date().toISOString().slice(0, 10),
    top_sales: mapRankDim(data.top_sales, 'sales'),
    top_orders: mapRankDim(data.top_orders, 'orders'),
    earliest_order: mapRankDim(data.earliest_order, 'time'),
    top_team: mapRankDim(data.top_team, 'sales'),
    top_network: mapRankDim(data.top_network, 'sales'),
    fastest_order: mapRankDim(data.fastest_order, 'minutes'),
    // 团队/网络排行榜（简化：用 items 前3条模拟）
    team_rank: {
      group: '综合组',
      group_total: Array.isArray(data.items) ? data.items.length : 0,
      my_rank: data.top_sales?.rank ?? 0,
      my_sales: data.top_sales?.my_val ?? '0.00',
      gap_to_next: '--',
      top3: Array.isArray(data.items) ? data.items.slice(0, 3).map((r: any, i: number) => ({
        rank: i + 1,
        code: r.display_name || '--',
        amount: r.earnings || '0.00',
      })) : [],
    },
    network_rank: {
      group: '综合组',
      group_total: Array.isArray(data.items) ? data.items.length : 0,
      my_rank: data.top_network?.rank ?? 0,
      my_sales: data.top_network?.my_val ?? '0.00',
      gap_to_next: '--',
      top3: Array.isArray(data.items) ? data.items.slice(0, 3).map((r: any, i: number) => ({
        rank: i + 1,
        code: r.display_name || '--',
        amount: r.earnings || '0.00',
      })) : [],
    },
    items: Array.isArray(data.items)
      ? data.items.map((r: any) => ({
          user_id: Number(r.user_id ?? 0),
          display_name: r.display_name || '--',
          earnings: r.earnings || '0.00',
          orders: Number(r.orders ?? 0),
        }))
      : [],
  }
}

const mapPartners = (data: any): PartnerItem[] =>
  Array.isArray(data?.items)
    ? data.items.map((item: any) => ({
        id: Number(item.user_id ?? 0),
        code: item.affiliate_code || `U${String(item.user_id ?? 0).padStart(4, '0')}`,
        email: item.email || item.display_name || '',
        avatar: '',
        level_name: item.level_name || `等级${Number(item.level ?? 1)}`,
        level_icon: item.level_icon || '🏅',
        rate: Number(item.rate ?? 0),
        today_direct_sales: formatMoney(item.today_direct_sales),
        total_direct_sales: formatMoney(item.total_direct_sales),
        today_network_sales: formatMoney(item.today_network_sales),
        total_network_sales: formatMoney(item.total_network_sales),
        total_network_orders: Number(item.total_network_orders ?? 0),
        today_settlement: formatMoney(item.today_settlement),
        total_settlement: formatMoney(item.total_settlement),
        group_visible: Boolean(item.group_visible ?? true),
        is_new: Boolean(item.is_new),
      }))
    : []

const mapTeam = (data: any): TeamData => ({
  direct_count: Number(data?.summary?.direct_count ?? data?.total ?? 0),
  total_count: Number(data?.summary?.total_count ?? data?.total ?? 0),
  network_buyers: Number(data?.summary?.network_buyers ?? 0),
  graduated_count: Number(data?.summary?.graduated_count ?? 0),
  members: Array.isArray(data?.items)
    ? data.items.map((item: any) => ({
        id: Number(item.user_id ?? 0),
        code: item.affiliate_code || `U${String(item.user_id ?? 0).padStart(4, '0')}`,
        email: item.display_name || '',
        avatar: '',
        self_sales: formatMoney(item.self_sales),
        team_settlement: formatMoney(item.team_settlement),
        self_orders: String(item.total_orders ?? 0),
        channel_count: String(item.channel_count ?? 0),
        is_new: Boolean(item.is_new),
      }))
    : [],
  total: Number(data?.total ?? 0),
  page: Number(data?.page ?? 1),
  page_size: Number(data?.page_size ?? 20),
})

const mapSettlement = (data: any): SettlementData => {
  const items = Array.isArray(data?.items) ? data.items : []
  // 从 items 聚合 summary
  let totalPending = 0
  let totalSettled = 0
  for (const item of items) {
    totalPending += Number(item.pending_amount ?? 0)
    totalSettled += Number(item.settled_amount ?? 0)
  }
  return {
    date: items[0]?.settle_date || '',
    summary: {
      direct_nodes: Number(data?.total ?? 0),
      orders: 0,
      total_sales: '0.00',
      refund_amount: '0.00',
      net_sales: '0.00',
      original_settlement: formatMoney(totalSettled),
      refund_deduction: '0.00',
      net_settlement: formatMoney(totalPending),
      net_settlement_rate: '0.00',
      paid_amount: formatMoney(totalSettled),
      unpaid_amount: formatMoney(totalPending),
    },
    items: items.map((item: any) => ({
      id: Number(item.user_id ?? 0),
      code: item.affiliate_code || `U${String(item.user_id ?? 0).padStart(4, '0')}`,
      email: item.display_name || '',
      avatar: '',
      self_sales: formatMoney(item.self_sales),
      team_sales: formatMoney(item.team_sales),
      total_sales: formatMoney(item.total_sales),
      refund_amount: '0.00',
      net_sales: formatMoney(item.team_sales),
      self_orders: Number(item.self_orders ?? 0),
      team_orders: Number(item.team_orders ?? 0),
      net_settlement: formatMoney(item.pending_amount),
      original_settlement: formatMoney(item.settled_amount),
      refund_deduction: '0.00',
      settled_orders: 0,
      pending_orders: 0,
      direct_partners: 0,
      total_partners: 0,
    })),
    total: Number(data?.total ?? 0),
    page: Number(data?.page ?? 1),
    page_size: Number(data?.page_size ?? 20),
  }
}

const mapOrders = (data: any): OrderItem[] =>
  Array.isArray(data?.items)
    ? data.items.map((item: any) => ({
        order_no: item.order_no || String(item.order_id ?? ''),
        channel: item.channel || '我的直销',
        product_name: item.product_name || '-',
        paid_amount: formatMoney(item.amount),
        status: item.status || '',
        partner_commission: formatMoney(item.partner_commission),
        my_commission: formatMoney(item.commission),
        referrer_cost: formatMoney(item.referrer_cost),
        created_at: item.created_at || '',
      }))
    : []

const mapLevels = (data: any): LevelsData => ({
  my_rate: Number(data?.my_rate ?? 0),
  entry_rate: Number(data?.entry_rate ?? 0),
  levels: Array.isArray(data?.levels)
    ? data.levels.map((item: any, index: number) => ({
        id: Number(item.id ?? index + 1),
        name: item.name || `等级${index + 1}`,
        icon: item.icon || '🏅',
        rate: Number(item.rate ?? 0),
        member_count: Number(item.member_count ?? 0),
        is_entry: Boolean(item.is_entry),
        upgrade_condition: item.upgrade_condition
          ? {
              days: Number(item.upgrade_condition.days ?? 0),
              daily_amount: Number(item.upgrade_condition.daily_amount ?? 0),
            }
          : null,
        style: item.style || 'default',
        rule: item.rule
          ? {
              enabled: Boolean(item.rule.enabled),
              metric: item.rule.metric === 'sales' ? 'sales' : 'orders',
              period: item.rule.period === 'weekly' ? 'weekly' : 'daily',
              targetValue: Number(item.rule.targetValue ?? 0),
              consecutiveDays: Number(item.rule.consecutiveDays ?? 0),
            }
          : undefined,
      }))
    : [],
  team_by_level: Array.isArray(data?.team_by_level)
    ? data.team_by_level.map((group: any) => ({
        level_id: Number(group.level_id ?? 0),
        level_name: group.level_name || '',
        rate: Number(group.rate ?? 0),
        members: Array.isArray(group.members)
          ? group.members.map((member: any) => ({
              id: Number(member.id ?? 0),
              code: member.code || '',
              email: member.email || '',
              avatar: member.avatar || '',
            }))
          : [],
      }))
    : [],
})

export const zhengyeAPI = {
  /** 首页概览 */
  getDashboard: async (): Promise<DashboardData> => mapDashboard(await unwrap(userApi.get('/affiliate/dashboard-v2'))),

  /** 详细数据看板 */
  getStats: async (period?: '7d' | '30d' | '180d'): Promise<StatsData> =>
    mapStats(await unwrap(userApi.get('/affiliate/stats', { params: period ? { period } : undefined }))),

  /** 封神榜 */
  getRank: async (): Promise<RankData> => mapRank(await unwrap(userApi.get('/affiliate/rank'))),

  /** 伙伴等级返佣 */
  getLevels: async (): Promise<LevelsData> => mapLevels(await unwrap(userApi.get('/affiliate/levels'))),
  saveLevels: async (data: unknown): Promise<LevelsData> => mapLevels(await unwrap(userApi.put('/affiliate/levels', data))),

  /** 伙伴联系资料 */
  getContact: async (): Promise<ContactData> => unwrap(userApi.get('/affiliate/contact')),
  saveContact: async (data: unknown): Promise<ContactData> => unwrap(userApi.put('/affiliate/contact', data)),

  /** 我的伙伴 */
  getPartners: async (params?: { keyword?: string; page?: number; page_size?: number }): Promise<PartnerItem[]> =>
    mapPartners(await unwrap(userApi.get('/affiliate/partners', { params }))),
  updatePartnerRate: async (partnerId: number, rate: number): Promise<{ partner_id: number; rate: number }> =>
    unwrap(userApi.patch(`/affiliate/partners/${partnerId}`, { rate })),

  /** 团队结构 */
  getTeam: async (params?: { keyword?: string; page?: number; page_size?: number; depth?: number }): Promise<TeamData> =>
    mapTeam(await unwrap(userApi.get('/affiliate/team', { params }))),

  /** 伙伴结算 */
  getSettlement: async (params?: { date?: string; keyword?: string; page?: number; page_size?: number }): Promise<SettlementData> =>
    mapSettlement(await unwrap(userApi.get('/affiliate/settlement', { params }))),
  doSettle: async (partnerId: number, date: string): Promise<{ partner_id: number; date: string }> =>
    unwrap(userApi.post('/affiliate/settlement/pay', { partner_id: partnerId, date })),

  /** 订单记录 */
  getOrders: async (params?: {
    keyword?: string
    status?: string
    source?: string
    page?: number
    page_size?: number
    date_from?: string
    date_to?: string
  }): Promise<OrderItem[]> => mapOrders(await unwrap(userApi.get('/affiliate/orders', { params }))),

  /** 客户优惠 */
  getDiscount: async (): Promise<DiscountData> => unwrap(userApi.get('/affiliate/discount')),
  saveDiscount: async (data: unknown): Promise<DiscountData> => unwrap(userApi.put('/affiliate/discount', data)),
}
