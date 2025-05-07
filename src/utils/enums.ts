export const REPORT_REASONS = ["Cheating", "Griefing", "Exploiting", "Other"] as const;
export type ReportReason = (typeof REPORT_REASONS)[number];

export const REPORT_STATUSES = ["Pending", "Approved", "Rejected", "Appealed"] as const;
export type ReportStatus = (typeof REPORT_STATUSES)[number];
