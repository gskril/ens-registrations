import Head from 'next/head'

import { Container } from '../components/atoms'
import { Table, TableHeader, TableRow } from '../components/table'
import type { Result } from '../types'
import { getStats } from './api/stats'

type PageProps = {
  lastUpdated: string
  apps: Result[]
  campaigns: Result[]
}

export default function Home({ lastUpdated, apps, campaigns }: PageProps) {
  const total = apps.reduce((acc, stat) => acc + stat.count, 0)
  const totalCampaigns = campaigns.reduce((acc, stat) => acc + stat.count, 0)

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
                href="https://sort.xyz/query/63eb88c4de4b6ffdda620ac5/results"
                target="_blank"
                rel="noreferrer"
              >
                sort.xyz
              </a>
              .
            </p>
          </div>
          <h3> Frontends</h3>
          <h4> Registrar, apps and frontends</h4>
          <p>
            {' '}
            Any app or registrar that implements the standard will show up here
          </p>

          <Table>
            <TableHeader>
              <span>Source</span>
              <span>Count</span>
              <span>%</span>
            </TableHeader>

            {apps.map((stat) => (
              <TableRow key={stat.source}>
                <span>{stat.source}</span>
                <span>{stat.count}</span>
                <span>{((stat.count / total) * 100).toFixed(2)}%</span>
              </TableRow>
            ))}
          </Table>
          <h3> Campaigns </h3>
          <h4> Social media, newsletters, influencers</h4>
          <p>
            {' '}
            If an app has properly implemented the ENSIP14 standard then by
            sending them a link that ends in ?affiliate=123456 then that code
            should be passed to the registrar and show up here.
          </p>

          <Table>
            <TableHeader>
              <span>Source</span>
              <span>Count</span>
              <span>%</span>
            </TableHeader>

            {campaigns.map((camp) => (
              <TableRow key={camp.source}>
                <span>{camp.source}</span>
                <span>{camp.count}</span>
                <span>{((camp.count / total) * 100).toFixed(2)}%</span>
              </TableRow>
            ))}
          </Table>

          <small style={{ margin: '1rem 0 0.125rem' }}>
            Last updated: {lastUpdated}
          </small>

          <small>
            Note: Registrations are only counted after a developer adopts this
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

        h3 {
          padding-top: 1rem;
          padding-bottom: 0.5rem;
          font-weight: 400;
          text-transform: uppercase;
          color: rgb(167, 61, 61);
        }

        h4 {
          padding: 0.5rem 0;
        }
      `}</style>
    </>
  )
}

export async function getStaticProps() {
  const [apps, campaigns] = await Promise.all([getStats(0), getStats(6)])

  // Return the date in format: "Feb 14, 2023, 12:00 AM EST"
  const lastUpdated = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  })

  return {
    props: {
      apps,
      campaigns,
      lastUpdated,
    },
    revalidate: 60 * 5,
  }
}
