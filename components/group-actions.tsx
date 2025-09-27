"use client"

import { Button } from "@/components/ui/button"
import { CirclePlus, FolderPlus, ListChecks } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

export function GroupActions() {
  const router = useRouter()

  const go = useCallback((path: string) => () => router.push(path), [router])

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm" onClick={go("/groups/create")} className="inline-flex items-center gap-2">
        <CirclePlus className="size-4" aria-hidden="true" />
        Create Group
      </Button>
      <Button size="sm" variant="secondary" onClick={go("/groups/add")} className="inline-flex items-center gap-2">
        <FolderPlus className="size-4" aria-hidden="true" />
        Add Group
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={go("/groups")}
        className="inline-flex items-center gap-2 bg-transparent"
      >
        <ListChecks className="size-4" aria-hidden="true" />
        Browse Groups
      </Button>
    </div>
  )
}
