import got from 'got'
import type { NextApiRequest, NextApiResponse } from 'next'

import { SortResponse, Result, StatsResponse } from '../../types'

const api_key = process.env.SORTXYZ_API_KEY
if (!api_key) {
  throw new Error('SORTXYZ_API_KEY not set')
}

export async function getStats(offset: number): Promise<Result[]> {
  const query = `
    -- Define a CTE called 'mapped_sources' that extracts the first 8 characters of the secret value and the function name from the 'user14.transaction' table
    WITH mapped_sources AS (
      SELECT 
        SUBSTR(t.function.params[4].value, ${
          offset + 3
        }, 6) AS source_substr, -- Extract the first 8 characters of the secret value
        t.function.name -- Extract the function name
      FROM user14.transaction t
      WHERE "to" = '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5' -- Filter transactions to the ENS Registrar Controller 
        AND t.function.name LIKE 'register%' -- Filter transactions to only those that start with 'register'
        AND status = 1 -- Filter transactions to only those with a successful status
    )

    -- Calculate the counts of unique 'source_substr' values that appear only once in the 'mapped_sources' table
    SELECT 
      'No Source Given' AS source,
      COUNT(*) AS count
    FROM (
      SELECT 
        source_substr
      FROM mapped_sources
      GROUP BY source_substr
      HAVING COUNT(*) = 1
    ) subquery

    -- Concatenate the results with the counts of non-unique 'source_substr' values, which are optionally mapped to new names
    UNION ALL
    SELECT 
      CASE source_substr
        WHEN '03acfa' THEN 'ensfairy.eth' -- If the 'source_substr' is '0x03acfa', map it to 'ensfairy.eth'
        -- Add more mappings here as needed
        ELSE source_substr -- If the 'source_substr' is not mapped, use the original value
      END AS source,
      COUNT(*) AS "count"
    FROM mapped_sources
    GROUP BY source
    HAVING COUNT(*) > 1
    ORDER BY "count" DESC
  `

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
    const stats = await getStats(0)
    res.status(200).json({ result: stats })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err })
  }
}
