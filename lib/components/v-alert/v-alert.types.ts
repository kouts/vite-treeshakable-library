export const ALERT_TYPES = ['info', 'success', 'warning', 'error'] as const

export type AlertType = (typeof ALERT_TYPES)[number]
