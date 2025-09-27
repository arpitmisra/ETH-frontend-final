import type React from "react"
import { GlassCard } from "./glass-card"
import { Coins, Landmark, Network, Shield, Spline, Layers } from "lucide-react"

const TRACKS: Array<{ title: string; desc: string; icon: React.ComponentType<{ className?: string }> }> = [
  {
    title: "Uniswap V3 Router",
    desc: "Execute pooled swaps for target assets",
    icon: Coins,
  },
  {
    title: "Chainlink Automation",
    desc: "Schedule periodic bulk DCA execution",
    icon: Network,
  },
  {
    title: "ENS (optional)",
    desc: "Human-friendly group names and resolution",
    icon: Landmark,
  },
  {
    title: "OpenZeppelin",
    desc: "Security patterns, guards, and standards",
    icon: Shield,
  },
  {
    title: "Create2 + Minimal Proxy",
    desc: "Efficient group deployments",
    icon: Layers,
  },
  {
    title: "Polygon / EVM",
    desc: "Low-cost DCA execution environment",
    icon: Spline,
  },
]

export function TracksGrid() {
  return (
    <div>
      <h2 className="mb-4 text-sm font-medium tracking-wide">Tracks We Use</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TRACKS.map((t) => (
          <GlassCard key={t.title} className="p-4">
            <div className="flex items-start gap-3">
              <t.icon className="mt-0.5 size-5 text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">{t.title}</p>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Note: User verification is solely via assigned handle: NAME.GROUPNAME.ASSETNAME. No World ID is used.
      </p>
    </div>
  )
}
