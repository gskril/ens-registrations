import got from 'got'
import type { NextApiRequest, NextApiResponse } from 'next'

import { SortResponse, Result, StatsResponse } from '../../types'

const api_key = process.env.SORTXYZ_API_KEY
if (!api_key) {
  throw new Error('SORTXYZ_API_KEY not set')
}

const query = `
  select
    SUBSTR(t.function.params[4].value, 1, 10) as "source",
    count(SUBSTR(t.function.params[4].value, 1, 10)) as "count"
  from
    ethereum.transaction t
  where "to" = '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5'
    and t.function.name like 'register%'
  group by SUBSTR(t.function.params[4].value, 1, 10)
  order by count desc
`

export async function getStats(): Promise<Result[]> {
  const sortxyz: SortResponse = await got
    .post('https://api.sort.xyz/v0/sql', {
      json: { query, api_key },
    })
    .json()

  return sortxyz.query_response.results
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StatsResponse>
) {
  try {
    const stats = await getStats()
    res.status(200).json({ result: stats })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err })
  }
}
