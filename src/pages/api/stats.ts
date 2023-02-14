import got from 'got'
import type { NextApiRequest, NextApiResponse } from 'next'

import { SortResponse, Result, StatsResponse } from '../../types'

const api_key = process.env.SORTXYZ_API_KEY
if (!api_key) {
  throw new Error('SORTXYZ_API_KEY not set')
}

const query = `
  SELECT
  mapped_source AS "source",
  COUNT(SUBSTR(mapped_source, 1, 8)) AS "count"
  FROM (
  SELECT
    CASE SUBSTR(t.function.params[4].value, 1, 8)
      WHEN '0x03acfa' THEN 'ensfairy.eth'
      -- Add more mappings here
      ELSE SUBSTR(t.function.params[4].value, 1, 8)
    END AS mapped_source
  FROM user14.transaction t
  WHERE "to" = '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5'
    AND t.function.name LIKE 'register%'
    AND status = 1
  ) subquery_alias
  GROUP BY mapped_source
  HAVING COUNT(SUBSTR(mapped_source, 1, 8)) > 1
  ORDER BY "count" DESC;
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
