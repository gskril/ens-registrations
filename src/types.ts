export type Result = {
  source: string
  count: number
}

export type SortResponse = {
  id: string
  success: boolean
  query_response: {
    collections: string[]
    column_fields: Result[]
    results: Result[]
    query_id: string
    stats: {
      elapsed_time_ms: number
      throttled_time_micros: number
    }
    status: string
  }
}

export type StatsResponse = {
  result?: Result[]
  error?: any
}
