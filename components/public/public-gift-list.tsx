"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Grid, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PublicGiftCard } from "@/components/public/public-gift-card"
import type { Gift } from "@/lib/types"

interface PublicGiftListProps {
  initialGifts: Gift[]
}

export function PublicGiftList({ initialGifts }: PublicGiftListProps) {
  const searchParams = useSearchParams()
  const categoryId = searchParams.get("category")

  const [gifts, setGifts] = useState<Gift[]>(initialGifts)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    const fetchGifts = async () => {
      setIsLoading(true)
      try {
        const url = categoryId ? `/api/gifts/public?categoryId=${categoryId}` : "/api/gifts/public"

        const response = await fetch(url)
        const data = await response.json()
        setGifts(data)
      } catch (error) {
        console.error("Error fetching gifts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGifts()
  }, [categoryId])

  const filteredGifts = gifts.filter(
    (gift) =>
      gift.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gift.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:w-auto flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Search gifts..." className="pl-10" value={searchQuery} onChange={handleSearchChange} />
        </div>

        <div className="flex gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>

      {filteredGifts.length === 0 ? (
        <div className="text-center py-12 border rounded-md">
          <h3 className="text-lg font-medium">No gifts found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"
          }
        >
          {filteredGifts.map((gift) => (
            <PublicGiftCard
              key={gift.id}
              gift={gift}
              viewMode={viewMode}
              onReservationComplete={() => {
                // Refresh the gifts list after a reservation
                const updatedGifts = gifts.map((g) => {
                  if (g.id === gift.id) {
                    return { ...g, reservedQuantity: g.reservedQuantity + 1 }
                  }
                  return g
                })
                setGifts(updatedGifts)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

