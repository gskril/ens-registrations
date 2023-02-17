import Head from 'next/head'
import Image from 'next/image'

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
        <title>ENSIP14: The Flock Watcher</title>
        <meta
          name="description"
          content="Track the source of ENS Registrations according to ENSIP 14"
        />

        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="180x180"
          href="/favicon.png"
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
            <Image
              src="/flock.jpg"
              alt="Watercolor of a flock of woodpeckers"
              width={400}
              height={400}
              style={{
                alignSelf: 'center',
              }}
            />
            <h1>ENSIP14: The Flock Watcher </h1>
            <p>
              ENS isn&apos;t just one team, but a whole <strong>flock</strong>!
              🐣 There are lots of different apps that register ENS names, and
              organic communities that group together to register their own
              clubs of names. We want to make sure these communities keep
              thriving and that more apps are encouraged to use ENS, so the
              first step is to measure who&apos;s using it. 📊
            </p>

            <p>
              We&apos;ve developed ENSIP14 to make it easier to create an
              onchain record of which registration frontend was used for a name,
              and to enable easy referral links. 🔗 This means you can start an
              ENS campaign with just <strong>one click</strong>! 💻 So
              don&apos;t wait - join the flock! 🐣
            </p>
            <p>
              It&apos;s a new, emerging standard and this website tracks its
              adoption. We created leaderboards to motivate more apps to appear
              here, and to incentivize ENS working groups to develop programs
              that reward creators and community builders.
            </p>

            <p>
              To help the ENS ecosystem grow, make sure the developer of your
              preferred ENS registration app or ENS-enabled wallet is compliant
              with the{' '}
              <a href="https://discuss.ens.domains/t/ensip-on-chain-source-parameter/16270">
                standard
              </a>
              . If you&apos;re a developer, you can{' '}
              <a href="https://discuss.ens.domains/t/ensip-on-chain-source-parameter/16270">
                read the spec here
              </a>
              . The standard is a draft and welcomes feedback from developers!
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
              <span></span>
              <span>Count</span>
              <span>%</span>
            </TableHeader>

            {apps.map((stat) => (
              <TableRow key={stat.source}>
                <span
                  style={{
                    content: "''",
                    display: 'inline-block',
                    background: `#${stat.source.substr(0, 6)}`,
                    backgroundImage: `url('https://metadata.ens.domains/mainnet/avatar/${stat.source}')`,
                    backgroundSize: 'contain',
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '25%',
                    opacity: 0.75,
                  }}
                />
                <span> {stat.source} </span>
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
            sending them a link that ends in ?ensref=12345678 then that code
            should be passed to the registrar and show up here.
          </p>

          <Table>
            <TableHeader>
              <span>Source</span>
              <span></span>
              <span>Count</span>
              <span>%</span>
            </TableHeader>

            {campaigns.map((camp) => (
              <TableRow key={camp.source}>
                <span
                  style={{
                    content: "''",
                    display: 'inline-block',
                    background: `#${camp.source.substr(0, 6)}`,
                    backgroundImage: `url('https://metadata.ens.domains/mainnet/avatar/${camp.source}')`,
                    backgroundSize: 'contain',
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '25%',
                    opacity: 0.75,
                  }}
                />
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

          <Image
            src="/favicon.png"
            alt="Watercolor of a flock of woodpeckers"
            width={160}
            height={160}
            style={{ margin: '2rem auto 0.5rem' }}
          />
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
          gap: 1rem;
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
  const [apps, campaigns] = await Promise.all([getStats(0), getStats(8)])

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
