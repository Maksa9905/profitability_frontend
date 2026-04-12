import type { LocationQuery } from 'vue-router'

export function queryParamFirst(
  query: LocationQuery,
  key: string
): string | undefined {
  const raw = query[key]
  if (raw == null) return undefined
  const s = Array.isArray(raw) ? raw[0] : raw
  if (s == null || s === '') return undefined
  return s
}

export function parseOptionalFiniteNumber(
  raw: string | undefined
): number | undefined {
  if (raw === undefined || raw === '') return undefined
  const n = Number(raw)
  return Number.isFinite(n) ? n : undefined
}

export function parseBooleanQuery(raw: string | undefined): boolean {
  return raw === 'true'
}

export function parseQueryEnumMember<T extends string>(
  raw: string | undefined,
  enumObject: Record<string, T | string>
): T | undefined {
  if (!raw) return undefined
  const allowed = new Set(Object.values(enumObject) as string[])
  return allowed.has(raw) ? (raw as T) : undefined
}

export function buildFormStateQuery(
  entries: Record<string, string | number | boolean | undefined | null>
): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [key, value] of Object.entries(entries)) {
    if (value === undefined || value === null) continue
    out[key] =
      typeof value === 'boolean' ? (value ? 'true' : 'false') : String(value)
  }
  return out
}
