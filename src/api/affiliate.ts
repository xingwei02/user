import { api, userApi } from './client'
import type { AffiliateWithdrawApplyPayload } from './types'

export const affiliateAPI = {
    trackClick: (data: { affiliate_code: string; visitor_key?: string; landing_path?: string; referrer?: string }) =>
        api.post('/public/affiliate/click', data),
    getPublicContext: (code: string) => api.get('/public/affiliate/context', { params: { code } }),
    open: (data?: { inviter_code?: string }) => userApi.post('/affiliate/open', data),
    dashboard: () => userApi.get('/affiliate/dashboard'),
    commissions: (params?: any) => userApi.get('/affiliate/commissions', { params }),
    withdraws: (params?: any) => userApi.get('/affiliate/withdraws', { params }),
    applyWithdraw: (data: AffiliateWithdrawApplyPayload) =>
        userApi.post('/affiliate/withdraws', data),
}
