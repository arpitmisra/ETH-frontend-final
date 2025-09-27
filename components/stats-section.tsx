"use client"

import useSWR from "swr"
import { GlassCard } from "./glass-card"
import { Activity, Users, Wallet, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetcher } from "@/lib/fetcher"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type React from "react"

type StatsResponse = {
  totals: {
    groups: number
    members: number
    pooledUSD: number
    swapsExecuted: number
  }
  chart: { t: string; pooled: number; swaps: number }[]
}

export function StatsSection() {
  const { data, isLoading, mutate } = useSWR<StatsResponse>("/api/stats", fetcher, {
    refreshInterval: 6000,
    revalidateOnFocus: false,
  })

  return (
    <div className="w-full">
      <GlassCard className="p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h2 id="stats" className="text-sm font-medium tracking-wide">
            Live Statistics
          </h2>
          <Button size="sm" variant="outline" onClick={() => mutate()} aria-label="Refresh statistics">
            Refresh
          </Button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi
            icon={<Users className="size-4 text-primary" aria-hidden="true" />}
            label="Members"
            value={isLoading ? "…" : (data?.totals.members?.toLocaleString() ?? "0")}
          />
          <Kpi
            icon={<Wallet className="size-4 text-primary" aria-hidden="true" />}
            label="Pooled (USD)"
            value={isLoading ? "…" : `$${data?.totals.pooledUSD?.toLocaleString() ?? "0"}`}
          />
          <Kpi
            icon={<Activity className="size-4 text-primary" aria-hidden="true" />}
            label="Swaps"
            value={isLoading ? "…" : (data?.totals.swapsExecuted?.toLocaleString() ?? "0")}
          />
          <Kpi
            icon={<BarChart3 className="size-4 text-primary" aria-hidden="true" />}
            label="Groups"
            value={isLoading ? "…" : (data?.totals.groups?.toLocaleString() ?? "0")}
          />
        </div>

        <div className="mt-5 h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data?.chart ?? []} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="pooled" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(var(--color-primary))" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="oklch(var(--color-primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="t" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} width={32} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "oklch(var(--color-card))",
                  border: "1px solid oklch(var(--color-border))",
                  borderRadius: 10,
                }}
                labelStyle={{ fontSize: 12 }}
              />
              <Area
                type="monotone"
                dataKey="pooled"
                stroke="oklch(var(--color-primary))"
                fill="url(#pooled)"
                strokeWidth={1.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  )
}

function Kpi({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <GlassCard className="p-3">
      <div className="flex items-center gap-2">
        {icon}
        <div className="min-w-0">
          <p className="truncate text-xs text-muted-foreground">{label}</p>
          <p className="truncate text-sm font-semibold">{value}</p>
        </div>
      </div>
    </GlassCard>
  )
}
