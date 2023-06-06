export type Result = {
  source: string
  count: number
}

export type SortResponse = {
  code: number
  data: {
    durationMs: number
    id: string
    query: string
    records: Result[]
    recordCount: number
  }
}

export type StatsResponse = {
  result?: Result[]
  error?: any
}
