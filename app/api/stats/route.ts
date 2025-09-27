import { NextResponse } from "next/server"

export async function GET() {
  // Mocked data to demonstrate live stats
  const now = Date.now()
  const points = Array.from({ length: 12 }).map((_, i) => {
    const t = new Date(now - (11 - i) * 60_000)
    return {
      t: `${t.getHours()}:${String(t.getMinutes()).padStart(2, "0")}`,
      pooled: Math.round(10000 + Math.random() * 5000),
      swaps: Math.round(10 + Math.random() * 10),
    }
  })

  const groups = [
    { id: "g-eth", name: "ETH Accumulators", asset: "ETH", members: 128, minContributionUSD: 25 },
    { id: "g-btc", name: "BTC Stackers", asset: "WBTC", members: 73, minContributionUSD: 50 },
    { id: "g-matic", name: "MATIC Monthly", asset: "MATIC", members: 92, minContributionUSD: 10 },
  ]

  const res = {
    totals: {
      groups: groups.length,
      members: groups.reduce((a, g) => a + g.members, 0),
      pooledUSD: points[points.length - 1]?.pooled ?? 0,
      swapsExecuted: points.reduce((a, p) => a + p.swaps, 0),
    },
    chart: points,
    groups,
  }

  return NextResponse.json(res, { status: 200 })
}
