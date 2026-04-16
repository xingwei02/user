/**
 * 正业（多级分销中心）API
 * 开发阶段指向 json-server mock（port 3100），上线后切换到真实后端即可
 */

const MOCK_BASE = (import.meta.env.VITE_MOCK_API_URL as string) || 'http://localhost:3100/api/user'

function buildUrl(path: string, params?: Record<string, any>): string {
  const url = `${MOCK_BASE}${path}`
  if (!params) return url
  const qs = new URLSearchParams(
    Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null)
      .map(([k, v]) => [k, String(v)])
  ).toString()
  return qs ? `${url}?${qs}` : url
}

async function mockRequest(method: string, path: string, body?: unknown, params?: Record<string, any>) {
  const url = buildUrl(path, params)
  const headers: Record<string, string> = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'

  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`Mock API error: ${res.status}`)
  return res.json()
}

export const zhengyeAPI = {
  /** 首页概览 */
  getDashboard: () => mockRequest('GET', '/affiliate/dashboard'),

  /** 详细数据看板 */
  getStats: (period?: '7d' | '30d' | '180d') =>
    mockRequest('GET', '/affiliate/stats', undefined, period ? { period } : undefined),

  /** 封神榜 */
  getRank: () => mockRequest('GET', '/affiliate/rank'),

  /** 伙伴等级返佣 */
  getLevels: () => mockRequest('GET', '/affiliate/levels'),
  saveLevels: (data: unknown) => mockRequest('PUT', '/affiliate/levels', data),

  /** 伙伴联系资料 */
  getContact: () => mockRequest('GET', '/affiliate/contact'),
  saveContact: (data: unknown) => mockRequest('PUT', '/affiliate/contact', data),

  /** 我的伙伴 */
  getPartners: (params?: { keyword?: string; page?: number }) =>
    mockRequest('GET', '/affiliate/partners', undefined, params),
  updatePartnerRate: (partnerId: number, rate: number) =>
    mockRequest('PATCH', `/affiliate/partners/${partnerId}`, { rate }),

  /** 团队结构 */
  getTeam: (params?: { keyword?: string; page?: number }) =>
    mockRequest('GET', '/affiliate/team', undefined, params),

  /** 伙伴结算 */
  getSettlement: (params?: { date?: string; keyword?: string; page?: number }) =>
    mockRequest('GET', '/affiliate/settlement', undefined, params),
  doSettle: (partnerId: number, date: string) =>
    mockRequest('POST', '/affiliate/settlement/pay', { partner_id: partnerId, date }),

  /** 订单记录 */
  getOrders: (params?: { keyword?: string; status?: string; source?: string; page?: number }) =>
    mockRequest('GET', '/affiliate/orders', undefined, params),

  /** 客户优惠 */
  getDiscount: () => mockRequest('GET', '/affiliate/discount'),
  saveDiscount: (data: unknown) => mockRequest('PUT', '/affiliate/discount', data),
}
