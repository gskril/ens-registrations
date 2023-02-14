import Head from 'next/head'

import { Container } from '../components/atoms'
import { Table, TableHeader, TableRow } from '../components/table'
import type { Result } from '../types'
import { getStats } from './api/stats'

type PageProps = {
  stats: Result[]
}

export default function Home({ stats }: PageProps) {
  return (
    <>
      <Head>
        <title>ENS Registrations</title>
        <meta
          name="description"
          content="Track the source of ENS Registrations according to ENSIP 14"
        />

        <meta property="og:image" content="" />
        <meta property="og:title" content="ENS Registrations" />
        <meta
          property="og:description"
          content="Track the source of ENS Registrations according to ENSIP 14"
        />
      </Head>

      <main>
        <Container>
          <div className="header">
            <h1>ENS Registrations</h1>
            <p>
              <a
                href="https://discuss.ens.domains/t/ensip-on-chain-source-parameter/16270"
                target="_blank"
                rel="noreferrer"
              >
                ENSIP 14
              </a>{' '}
              provides a way to track the source of ENS registrations on-chain.
            </p>

            <p>
              This dashboard includes transactions made on the official{' '}
              <a
                href="https://etherscan.io/address/0x283af0b28c62c092c9727f1ee09c02ca627eb7f5"
                target="_blank"
                rel="noreferrer"
              >
                .eth Registrar contract
              </a>{' '}
              after February 10th, 2023. Data provided by{' '}
              <a
                href="https://sort.xyz/query/63e66af18758baae915f444e/"
                target="_blank"
                rel="noreferrer"
              >
                sort.xyz
              </a>
              .
            </p>
          </div>

          <Table>
            <TableHeader>
              <span>Source</span>
              <span>Count</span>
            </TableHeader>

            {stats.map((stat) => (
              <TableRow key={stat.source}>
                <span>{stat.source}</span>
                <span>{stat.count}</span>
              </TableRow>
            ))}
          </Table>

          <small style={{ display: 'block', opacity: 0.6, marginTop: '1rem' }}>
            Note: registrations are only counted after a developer adopts this
            standard.
          </small>
        </Container>
      </main>

      <style jsx>{`
        main {
          padding-top: 2rem;
          padding-bottom: 2rem;
        }

        .header {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
      `}</style>
    </>
  )
}

export async function getStaticProps() {
  const stats = await getStats()

  return {
    props: {
      stats,
    },
    revalidate: 60 * 5,
  }
}
