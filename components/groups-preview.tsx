"use client"

import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"
import { GlassCard } from "./glass-card"
import { Button } from "@/components/ui/button"
import { UserPlus2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type GroupsResponse = {
  groups: Array<{
    id: string
    name: string
    asset: string
    members: number
    minContributionUSD: number
  }>
}

export function GroupsPreview() {
  const { data, isLoading } = useSWR<GroupsResponse>("/api/stats", fetcher, {
    refreshInterval: 10000,
    revalidateOnFocus: false,
  })

  const groups = data?.groups ?? []

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium tracking-wide">Browse Groups</h2>
        <p className="text-xs text-muted-foreground">Join a group to receive your unique handle</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {(isLoading ? Array.from({ length: 3 }) : groups).map((g, i) => (
          <GlassCard key={g ? g.id : i} className="p-4">
            {g ? <GroupRow g={g} /> : <SkeletonRow />}
          </GlassCard>
        ))}
      </div>
    </div>
  )
}

function GroupRow({ g }: { g: GroupsResponse["groups"][number] }) {
  const { toast } = useToast()

  function onJoin() {
    // In production you would call a contract/mutation and then derive the handle.
    const randomName = `user${Math.floor(Math.random() * 10_000)}`
    const handle = `${randomName}.${g.name}.${g.asset}`

    toast({
      title: "Joined group",
      description: `Your handle: ${handle}`,
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">{g.name}</p>
          <p className="text-xs text-muted-foreground">Target: {g.asset}</p>
        </div>
        <span className="rounded-md border border-border/60 px-2 py-1 text-xs text-muted-foreground">
          {g.members} members
        </span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Min contribution: ${g.minContributionUSD}</p>
        <Button size="sm" onClick={onJoin} className="inline-flex items-center gap-2">
          <UserPlus2 className="size-4" aria-hidden="true" />
          Join
        </Button>
      </div>
    </div>
  )
}

function SkeletonRow() {
  return (
    <div className="animate-pulse">
      <div className="mb-2 h-4 w-1/3 rounded bg-muted" />
      <div className="mb-3 h-3 w-1/4 rounded bg-muted" />
      <div className="h-8 w-full rounded bg-muted" />
    </div>
  )
}
