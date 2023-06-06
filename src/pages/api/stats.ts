import got from 'got'
import type { NextApiRequest, NextApiResponse } from 'next'

import { SortResponse, Result, StatsResponse } from '../../types'

const api_key = process.env.SORTXYZ_API_KEY
if (!api_key) {
  throw new Error('SORTXYZ_API_KEY not set')
}

export async function getStats(offset: number): Promise<Result[]> {
  const query = `
WITH mapped_sources as (
    SELECT t.transaction_hash
    ,p.bin_val::varchar as secret
    ,SUBSTR(p.bin_val::varchar,
      ${ offset + 3 },
        8) as source_substr
    FROM ethereum.transaction t,
      --ethereum.block b,        
      ethereum.transaction_param p
    WHERE p.transaction_id = t.id
      AND t.to_address = '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5'
      --AND b.id = t.block_id 
      AND t.function like 'register%'
      AND p.path = 'secret'
  )
  SELECT 'No Source Given' as source, count(*) as "count"
  FROM
    (SELECT source_substr
      FROM mapped_sources
      GROUP BY source_substr
      HAVING COUNT(*) <= 1) subquery 
  UNION ALL
  SELECT CASE source_substr
    WHEN '03acfad5' THEN 'ensfairy.eth'
    WHEN '00000000' THEN 'No Secret used'
    WHEN '02224567' THEN 'gpt-emoji.eth'
    WHEN '89abcdef' THEN 'gpt-emoji.eth'
    ELSE source_substr
      END as source, count(*) as "count" 
  FROM mapped_sources 
  GROUP BY source 
  HAVING COUNT(*) > 1 
  ORDER BY "count" DESC
`

  const sortxyz: SortResponse = await got
    .post('https://api.sort.xyz/v1/queries/run', {
      headers: {
        'x-api-key': api_key as string,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      json: { 
        query : query
      },
    })
    .json()

  return sortxyz.data.records
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StatsResponse>
) {
  try {
    const stats = await getStats(0)
    res.status(200).json({ result: stats })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err })
  }
}
