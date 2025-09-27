import { Suspense } from "react"
import { Github, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { StatsSection } from "@/components/stats-section"
import { GroupActions } from "@/components/group-actions"
import { TracksGrid } from "@/components/tracks-grid"
import { GroupsPreview } from "@/components/groups-preview"

export default function Page() {
  return (
    <main className="min-h-[100dvh] antialiased">
      <header className="sticky top-0 z-30 w-full border-b border-border/60 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium tracking-wide">DCA Groups</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <a href="#stats" className="text-sm">
                Live Stats
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="#groups" className="text-sm">
                Browse Groups
              </a>
            </Button>
            <Button variant="default" size="sm" asChild>
              <a href="#tracks" className="text-sm">
                Tracks Used
              </a>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-14 md:pb-16 md:pt-20">
          <div className="grid gap-6 md:grid-cols-2 md:gap-10">
            <div className="flex flex-col justify-center">
              <h1 className={cn("text-pretty text-3xl font-semibold tracking-tight md:text-5xl")}>
                Collective DCA on-chain, simple and Sybil-resistant without World ID
              </h1>
              <p className="mt-3 text-balance text-sm leading-relaxed text-muted-foreground md:text-base">
                Verify users by assigning a unique handle as they create or join a group:
                <strong className="ml-1">NAME.GROUPNAME.ASSETNAME</strong>. Pool contributions, execute scheduled swaps,
                and govern frequency together.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <GroupActions />
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2"
                    aria-label="View source on GitHub"
                  >
                    <Github className="size-4" />
                    Source
                  </a>
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                No World ID required. Identity is the handle you get on join or creation.
              </p>
            </div>
            <div className="flex items-center">
              <Suspense
                fallback={
                  <div className="h-[280px] w-full rounded-xl border border-border/60 bg-card/60 backdrop-blur" />
                }
              >
                <StatsSection />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <section id="groups" className="mx-auto max-w-6xl px-4 py-10 md:py-16">
        <GroupsPreview />
      </section>

      <section id="tracks" className="mx-auto max-w-6xl px-4 pb-16">
        <TracksGrid />
      </section>

      <footer className="border-t border-border/60 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} DCA Groups</p>
          <nav aria-label="Footer">
            <ul className="flex items-center gap-3">
              <li>
                <a href="#stats" className="text-xs text-muted-foreground hover:text-foreground">
                  Stats
                </a>
              </li>
              <li>
                <a href="#groups" className="text-xs text-muted-foreground hover:text-foreground">
                  Groups
                </a>
              </li>
              <li>
                <a href="#tracks" className="text-xs text-muted-foreground hover:text-foreground">
                  Tracks
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </main>
  )
}
