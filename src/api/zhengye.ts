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
  has_parent?: boolean
  effective_commission_rate?: number
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
  parent_contact_qq?: string
  parent_contact_wx?: string
  parent_contact_other?: string
  parent_announcement?: string
}

type StatsData = {
  today?: Record<string, any>
  total?: Record<string, any>
  effective_commission_rate?: number
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
type BalanceData = {
  user_id?: number
  balance?: string | number
  frozen_balance?: string | number
  pending_balance?: string | number
  total_income?: string | number
  total_withdraw?: string | number
}
type BalanceLogItem = {
  id: number
  type: string
  amount: string
  balance_before: string
  balance_after: string
  related_type: string
  related_id: number
  remark: string
  created_at: string
}
type BalanceLogsData = {
  items: BalanceLogItem[]
  total: number
  page: number
  page_size: number
}

export type WithdrawSettingsData = {
  id?: number
  min_amount?: string
  interval_days?: number
  fee_rate?: number
  require_realname?: boolean
  enabled?: boolean
}

export type WithdrawRequestItem = {
  id: number
  amount: string
  fee: string
  actual_amount: string
  channel: string
  account: string
  alipay_name: string
  status: string
  reject_reason: string
  created_at: string
  processed_at: string
}

export type WithdrawRequestsData = {
  items: WithdrawRequestItem[]
  total: number
  page: number
  page_size: number
}

type TransferableCommissionItem = {
  id: number
  order_id: number
  order_no: string
  product_name: string
  commission_amount: string
  status: string
  can_transfer: boolean
  transferred_to_balance: boolean
  available_at: string
  created_at: string
}
type TransferableCommissionData = {
  items: TransferableCommissionItem[]
  total: number
  page: number
  page_size: number
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
type PartnerOrderDetailItem = {
  order_id: number
  order_no: string
  product_name: string
  original_amount: string
  final_amount: string
  channel_discount: string
  final_channel: string
  partner_commission: string
  my_commission: string
  referrer_cost: string
  status: string
  is_settled: boolean
  is_self: boolean
  created_at: string
}
type PartnerOrderDetailData = {
  items: PartnerOrderDetailItem[]
  total: number
  page: number
  page_size: number
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
type SettlementSummary = {
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
type SettlementData = {
  date: string
  summary: SettlementSummary
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
  order_id: number
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
type OrderCommissionLayerItem = {
  level: number
  user_id: number
  display_name: string
  role: string
  commission_rate: number
  commission_amount: string
  status: string
}
type OrderCommissionDetailData = {
  order_id: number
  order_no: string
  product_name: string
  original_amount: string
  final_amount: string
  channel_discount: string
  final_channel: string
  status: string
  created_at: string
  layers: OrderCommissionLayerItem[]
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
  upgrade_condition: { days: number; daily_amount: number; orders?: number } | null
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
  can_configure?: boolean
  block_reason?: string
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

const parseNumericText = (v: unknown, fallback = 0): number => {
  if (typeof v === 'number') return Number.isFinite(v) ? v : fallback
  const raw = String(v ?? '').trim()
  if (!raw) return fallback
  const direct = Number(raw)
  if (Number.isFinite(direct)) return direct
  const matched = raw.match(/\d+(?:\.\d+)?/)
  if (!matched) return fallback
  const parsed = Number(matched[0])
  return Number.isFinite(parsed) ? parsed : fallback
}

const mapDashboard = (data: any): DashboardData => ({
  opened: true,
  affiliate_code: data?.affiliate_code || '',
  promotion_path: data?.promotion_path || '',
  has_parent: Boolean(data?.has_parent),
  effective_commission_rate: data?.effective_commission_rate != null ? Number(data?.effective_commission_rate) : undefined,
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
  parent_contact_qq: data?.parent_contact_qq || '',
  parent_contact_wx: data?.parent_contact_wx || '',
  parent_contact_other: data?.parent_contact_other || '',
  parent_announcement: data?.parent_announcement || '',
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
  effective_commission_rate: data?.effective_commission_rate != null ? Number(data?.effective_commission_rate) : undefined,
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
  if (!d) return { code: '--', amount: '0.00', count: 0, time: '--', minutes: 0, duration_text: '--', rank: 0, my_val: '--' }
  const base = { code: d.name || '--', rank: Number(d.rank ?? 0), my_val: d.my_val || '--' }
  switch (type) {
    case 'orders':
      return { ...base, amount: '0.00', count: parseNumericText(d.value, 0), time: '--', minutes: 0, duration_text: '--' }
    case 'time':
      return { ...base, amount: '0.00', count: 0, time: String(d.value ?? '--'), minutes: 0, duration_text: '--' }
    case 'minutes': {
      const raw = String(d.value ?? '').trim()
      const minutes = parseNumericText(raw, 0)
      const durationText = raw || '5分21秒'
      return { ...base, amount: '0.00', count: 0, time: '--', minutes, duration_text: durationText }
    }
    default:
      return { ...base, amount: String(d.value ?? '0.00'), count: 0, time: '--', minutes: 0, duration_text: '--' }
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
  const summary = data?.summary || {}
  return {
    date: items[0]?.settle_date || '',
    summary: {
      direct_nodes: Number(summary?.direct_nodes ?? data?.total ?? 0),
      orders: Number(summary?.orders ?? 0),
      total_sales: formatMoney(summary?.total_sales),
      refund_amount: formatMoney(summary?.refund_amount),
      net_sales: formatMoney(summary?.net_sales),
      original_settlement: formatMoney(summary?.original_settlement),
      refund_deduction: formatMoney(summary?.refund_deduction),
      net_settlement: formatMoney(summary?.net_settlement),
      net_settlement_rate: String(summary?.net_settlement_rate ?? '0.00'),
      paid_amount: formatMoney(summary?.paid_amount),
      unpaid_amount: formatMoney(summary?.unpaid_amount),
    },
    items: items.map((item: any) => ({
      id: Number(item.user_id ?? 0),
      code: item.affiliate_code || `U${String(item.user_id ?? 0).padStart(4, '0')}`,
      email: item.display_name || '',
      avatar: '',
      self_sales: formatMoney(item.self_sales),
      team_sales: formatMoney(item.team_sales),
      total_sales: formatMoney(item.total_sales),
      refund_amount: formatMoney(item.refund_amount),
      net_sales: formatMoney(item.net_sales ?? item.total_sales),
      self_orders: Number(item.self_orders ?? 0),
      team_orders: Number(item.team_orders ?? 0),
      net_settlement: formatMoney(item.net_settlement ?? item.pending_amount),
      original_settlement: formatMoney(item.original_settlement ?? (Number(item.pending_amount ?? 0) + Number(item.settled_amount ?? 0))),
      refund_deduction: formatMoney(item.refund_deduction),
      settled_orders: Number(item.settled_orders ?? 0),
      pending_orders: Number(item.pending_orders ?? 0),
      direct_partners: Number(item.direct_partners ?? 0),
      total_partners: Number(item.total_partners ?? 0),
    })),
    total: Number(data?.total ?? 0),
    page: Number(data?.page ?? 1),
    page_size: Number(data?.page_size ?? 20),
  }
}

const mapOrders = (data: any): OrderItem[] =>
  Array.isArray(data?.items)
    ? data.items.map((item: any) => ({
        order_id: Number(item.order_id ?? 0),
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

const mapPartnerOrderDetails = (data: any): PartnerOrderDetailData => ({
  items: Array.isArray(data?.items)
    ? data.items.map((item: any) => ({
        order_id: Number(item.order_id ?? 0),
        order_no: item.order_no || '',
        product_name: item.product_name || '-',
        original_amount: formatMoney(item.original_amount),
        final_amount: formatMoney(item.final_amount),
        channel_discount: formatMoney(item.channel_discount),
        final_channel: item.final_channel || '-',
        partner_commission: formatMoney(item.partner_commission),
        my_commission: formatMoney(item.my_commission),
        referrer_cost: formatMoney(item.referrer_cost),
        status: item.status || '',
        is_settled: Boolean(item.is_settled),
        is_self: Boolean(item.is_self),
        created_at: item.created_at || '',
      }))
    : [],
  total: Number(data?.total ?? 0),
  page: Number(data?.page ?? 1),
  page_size: Number(data?.page_size ?? 20),
})

const mapOrderCommissionDetail = (data: any): OrderCommissionDetailData => ({
  order_id: Number(data?.order_id ?? 0),
  order_no: data?.order_no || '',
  product_name: data?.product_name || '-',
  original_amount: formatMoney(data?.original_amount),
  final_amount: formatMoney(data?.final_amount),
  channel_discount: formatMoney(data?.channel_discount),
  final_channel: data?.final_channel || '-',
  status: data?.status || '',
  created_at: data?.created_at || '',
  layers: Array.isArray(data?.layers)
    ? data.layers.map((item: any) => ({
        level: Number(item.level ?? 0),
        user_id: Number(item.user_id ?? 0),
        display_name: item.display_name || '-',
        role: item.role || '',
        commission_rate: Number(item.commission_rate ?? 0),
        commission_amount: formatMoney(item.commission_amount),
        status: item.status || '',
      }))
    : [],
})

const mapLevels = (data: any): LevelsData => ({
  my_rate: Number(data?.my_rate ?? 0),
  entry_rate: Number(data?.entry_rate ?? 0),
  can_configure: Boolean(data?.can_configure),
  block_reason: data?.block_reason || '',
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
              orders: Number(item.upgrade_condition.orders ?? 0),
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

const mapBalance = (data: any): BalanceData => ({
  user_id: Number(data?.user_id ?? 0),
  balance: formatMoney(data?.balance),
  frozen_balance: formatMoney(data?.frozen_balance),
  pending_balance: formatMoney(data?.pending_balance),
  total_income: formatMoney(data?.total_income),
  total_withdraw: formatMoney(data?.total_withdraw),
})

const mapBalanceLogs = (data: any): BalanceLogsData => ({
  items: Array.isArray(data?.items)
    ? data.items.map((item: any) => ({
        id: Number(item.id ?? 0),
        type: item.type || '',
        amount: formatMoney(item.amount),
        balance_before: formatMoney(item.balance_before),
        balance_after: formatMoney(item.balance_after),
        related_type: item.related_type || '',
        related_id: Number(item.related_id ?? 0),
        remark: item.remark || '',
        created_at: item.created_at || '',
      }))
    : [],
  total: Number(data?.total ?? 0),
  page: Number(data?.page ?? 1),
  page_size: Number(data?.page_size ?? 20),
})

const mapTransferableCommissions = (data: any): TransferableCommissionData => ({
  items: Array.isArray(data?.items)
    ? data.items.map((item: any) => ({
        id: Number(item.id ?? 0),
        order_id: Number(item.order_id ?? 0),
        order_no: item.order_no || '',
        product_name: item.product_name || '-',
        commission_amount: formatMoney(item.commission_amount),
        status: item.status || '',
        can_transfer: Boolean(item.can_transfer),
        transferred_to_balance: Boolean(item.transferred_to_balance),
        available_at: item.available_at || '',
        created_at: item.created_at || '',
      }))
    : [],
  total: Number(data?.total ?? 0),
  page: Number(data?.page ?? 1),
  page_size: Number(data?.page_size ?? 100),
})

const mapWithdrawSettings = (data: any): WithdrawSettingsData => ({
  id: Number(data?.id ?? 0),
  min_amount: formatMoney(data?.min_amount),
  interval_days: Number(data?.interval_days ?? 0),
  fee_rate: Number(data?.fee_rate ?? 0),
  require_realname: Boolean(data?.require_realname),
  enabled: Boolean(data?.enabled),
})

const mapWithdrawRequests = (data: any): WithdrawRequestsData => ({
  items: Array.isArray(data?.items)
    ? data.items.map((item: any) => ({
        id: Number(item?.id ?? 0),
        amount: formatMoney(item?.amount),
        fee: formatMoney(item?.fee),
        actual_amount: formatMoney(item?.actual_amount),
        channel: item?.channel || '',
        account: item?.account || '',
        alipay_name: item?.alipay_name || '',
        status: item?.status || '',
        reject_reason: item?.reject_reason || '',
        created_at: item?.created_at || '',
        processed_at: item?.processed_at || '',
      }))
    : [],
  total: Number(data?.total ?? 0),
  page: Number(data?.page ?? 1),
  page_size: Number(data?.page_size ?? 20),
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
  getPartnerOrdersByDate: async (partnerId: number, params?: { start_date?: string; end_date?: string; keyword?: string; page?: number; page_size?: number }): Promise<PartnerOrderDetailData> =>
    mapPartnerOrderDetails(await unwrap(userApi.get(`/affiliate/partners/${partnerId}/orders`, { params }))),
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
  getOrderCommissionDetail: async (orderId: number): Promise<OrderCommissionDetailData> =>
    mapOrderCommissionDetail(await unwrap(userApi.get(`/affiliate/orders/${orderId}/commission-detail`))),

  /** 客户优惠 */
  getDiscount: async (): Promise<DiscountData> => unwrap(userApi.get('/affiliate/discount')),
  saveDiscount: async (data: unknown): Promise<DiscountData> => unwrap(userApi.put('/affiliate/discount', data)),

  /** 我的结算 / 钱包基础能力 */
  getBalance: async (): Promise<BalanceData> => mapBalance(await unwrap(userApi.get('/affiliate/balance'))),
  getBalanceLogs: async (params?: { page?: number; page_size?: number }): Promise<BalanceLogsData> =>
    mapBalanceLogs(await unwrap(userApi.get('/affiliate/balance-logs', { params }))),
  getTransferableCommissions: async (params?: { page?: number; page_size?: number }): Promise<TransferableCommissionData> =>
    mapTransferableCommissions(await unwrap(userApi.get('/affiliate/transferable-commissions', { params }))),
  transferCommissionToBalance: async (data: { commission_ids: number[]; amount: number; verify_code?: string }): Promise<Record<string, unknown>> =>
    unwrap(userApi.post('/affiliate/transfer', data)),
  getWithdrawSettings: async (): Promise<WithdrawSettingsData> =>
    mapWithdrawSettings(await unwrap(userApi.get('/affiliate/withdraw-settings'))),
  getWithdrawRequests: async (params?: { page?: number; page_size?: number }): Promise<WithdrawRequestsData> =>
    mapWithdrawRequests(await unwrap(userApi.get('/affiliate/withdraw-requests', { params }))),
  applyWithdraw: async (data: { amount: number; alipay_account: string; real_name: string; verify_code: string }): Promise<Record<string, unknown>> =>
    unwrap(userApi.post('/affiliate/withdraw', data)),
}
