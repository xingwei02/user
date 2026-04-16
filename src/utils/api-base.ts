export function resolveApiBaseUrl(): string {
    const raw = String(import.meta.env.VITE_API_BASE_URL || '').trim()

    if (!raw) {
        return ''
    }

    const normalized = raw.replace(/\/+$/, '')

    if (import.meta.env.PROD) {
        try {
            const url = new URL(normalized)
            const hostname = url.hostname.toLowerCase()
            if (hostname === 'localhost' || hostname === '127.0.0.1') {
                return ''
            }
        } catch {
            return ''
        }
    }

    return normalized
}
