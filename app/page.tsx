"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Wallet, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MainGate() {
  const router = useRouter()
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // If already connected, skip straight to landing
  useEffect(() => {
    const checkConnected = async () => {
      try {
        const eth = (window as any)?.ethereum
        if (!eth) return
        const accounts = await eth.request({ method: "eth_accounts" })
        if (Array.isArray(accounts) && accounts.length > 0) {
          router.replace("/landing")
        }
      } catch {
        // silently ignore
      }
    }
    checkConnected()
  }, [router])

  const onGo = async () => {
    setError(null)
    setConnecting(true)
    try {
      const eth = (window as any)?.ethereum
      if (!eth) {
        setError("No wallet detected. Please install a wallet like MetaMask.")
        setConnecting(false)
        return
      }
      await eth.request({ method: "eth_requestAccounts" })
      router.push("/landing")
    } catch (e: any) {
      setError(e?.message || "Failed to connect wallet.")
      setConnecting(false)
    }
  }

  return (
    <main className="min-h-dvh flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <div className="rounded-[var(--radius)] border border-border/50 bg-background/40 backdrop-blur-md shadow-lg">
          <div className="p-8 md:p-10 flex flex-col items-center text-center">
            {/* Project Name */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-3 py-1 mb-4">
              <Wallet className="size-4 opacity-80" aria-hidden />
              <span className="text-sm opacity-90">DCA Groups</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-semibold text-pretty">Welcome to DCA Groups</h1>
            <p className="mt-3 text-sm md:text-base opacity-80 text-pretty">
              Connect your wallet to continue to the app landing page.
            </p>

            {/* GO Button */}
            <div className="mt-8">
              <Button
                onClick={onGo}
                disabled={connecting}
                className="group h-11 px-6 text-base rounded-full border border-border/60 bg-background/70 backdrop-blur-sm hover:bg-background/80"
              >
                <span className="inline-flex items-center gap-2">
                  GO
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Button>
            </div>

            {/* Error helper */}
            {error ? (
              <p className="mt-4 text-sm text-red-500">{error}</p>
            ) : (
              <p className="mt-4 text-xs opacity-70">You’ll be redirected to the landing page after connecting.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
