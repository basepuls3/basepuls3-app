"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PollCard } from "@/components/poll-card"
import { PollFilters } from "@/components/poll-filters"
import { Plus, TrendingUp, Clock, Users } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const mockPolls = [
  {
    id: "1",
    title: "Should we implement a new governance token for the community?",
    description:
      "This poll will determine if we should create a new governance token to give community members voting power on future decisions.",
    creator: "0x1234567890abcdef1234567890abcdef12345678",
    createdAt: "2024-01-15T10:00:00Z",
    endsAt: "2024-01-25T10:00:00Z",
    totalVotes: 1247,
    totalReward: 2.5,
    status: "active" as const,
    category: "Governance",
    fundingType: "community" as const,
    options: [
      { id: "1a", text: "Yes, implement governance token", votes: 847, percentage: 68 },
      { id: "1b", text: "No, keep current system", votes: 400, percentage: 32 },
    ],
  },
  {
    id: "2",
    title: "Which feature should we prioritize next?",
    description:
      "Help us decide what to build next for the platform. Your vote will directly influence our development roadmap.",
    creator: "0xabcdef1234567890abcdef1234567890abcdef12",
    createdAt: "2024-01-14T15:30:00Z",
    endsAt: "2024-01-28T15:30:00Z",
    totalVotes: 892,
    totalReward: 1.8,
    status: "active" as const,
    category: "Product",
    fundingType: "self" as const,
    options: [
      { id: "2a", text: "Mobile app", votes: 356, percentage: 40 },
      { id: "2b", text: "Advanced analytics", votes: 267, percentage: 30 },
      { id: "2c", text: "API integration", votes: 178, percentage: 20 },
      { id: "2d", text: "Multi-language support", votes: 91, percentage: 10 },
    ],
  },
  {
    id: "3",
    title: "Community meetup location preference",
    description: "Where should we host our next community meetup? This is a simple poll with no rewards.",
    creator: "0x9876543210fedcba9876543210fedcba98765432",
    createdAt: "2024-01-13T09:00:00Z",
    endsAt: "2024-01-20T09:00:00Z",
    totalVotes: 234,
    totalReward: 0,
    status: "active" as const,
    category: "Events",
    fundingType: "none" as const,
    options: [
      { id: "3a", text: "San Francisco", votes: 94, percentage: 40 },
      { id: "3b", text: "New York", votes: 70, percentage: 30 },
      { id: "3c", text: "London", votes: 47, percentage: 20 },
      { id: "3d", text: "Virtual event", votes: 23, percentage: 10 },
    ],
  },
  {
    id: "4",
    title: "Protocol upgrade proposal #42",
    description: "Technical proposal to upgrade the smart contract with new security features and gas optimizations.",
    creator: "0xfedcba9876543210fedcba9876543210fedcba98",
    createdAt: "2024-01-10T12:00:00Z",
    endsAt: "2024-01-18T12:00:00Z",
    totalVotes: 1856,
    totalReward: 5.2,
    status: "ended" as const,
    category: "Governance",
    fundingType: "community" as const,
    options: [
      { id: "4a", text: "Approve upgrade", votes: 1299, percentage: 70 },
      { id: "4b", text: "Reject upgrade", votes: 557, percentage: 30 },
    ],
  },
]

export default function DappPage() {
  const [filters, setFilters] = useState({
    search: "",
    status: "All Status",
    category: "All Categories",
    fundingType: "All Funding",
    sortBy: "Latest",
  })

  const filteredPolls = mockPolls.filter((poll) => {
    if (
      filters.search &&
      !poll.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !poll.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false
    }
    if (filters.status !== "All Status" && poll.status !== filters.status.toLowerCase()) {
      return false
    }
    if (filters.category !== "All Categories" && poll.category !== filters.category) {
      return false
    }
    if (filters.fundingType !== "All Funding") {
      const fundingMap = {
        "Self-funded": "self",
        Community: "community",
        "No rewards": "none",
      }
      if (poll.fundingType !== fundingMap[filters.fundingType as keyof typeof fundingMap]) {
        return false
      }
    }
    return true
  })

  const stats = {
    totalPolls: mockPolls.length,
    activePolls: mockPolls.filter((p) => p.status === "active").length,
    totalVotes: mockPolls.reduce((sum, poll) => sum + poll.totalVotes, 0),
    totalRewards: mockPolls.reduce((sum, poll) => sum + poll.totalReward, 0),
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Explore Polls</h1>
          <p className="text-muted-foreground">Discover and participate in community-driven decisions</p>
        </div>
        <Button asChild size="lg">
          <Link href="/dapp/create">
            <Plus className="h-4 w-4 mr-2" />
            Create Poll
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-2xl font-bold">{stats.totalPolls}</span>
          </div>
          <p className="text-sm text-muted-foreground">Total Polls</p>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-green-500" />
            <span className="text-2xl font-bold">{stats.activePolls}</span>
          </div>
          <p className="text-sm text-muted-foreground">Active Polls</p>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-500" />
            <span className="text-2xl font-bold">{stats.totalVotes.toLocaleString()}</span>
          </div>
          <p className="text-sm text-muted-foreground">Total Votes</p>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{stats.totalRewards.toFixed(1)} ETH</span>
          </div>
          <p className="text-sm text-muted-foreground">Total Rewards</p>
        </div>
      </div>

      {/* Filters */}
      <PollFilters filters={filters} onFiltersChange={setFilters} />

      {/* Polls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPolls.map((poll) => (
          <PollCard
            key={poll.id}
            poll={poll}
            onVote={(pollId, optionId) => {
              console.log("Vote:", pollId, optionId)
              // TODO: Implement voting logic
            }}
            onViewDetails={(pollId) => {
              console.log("View details:", pollId)
              // TODO: Navigate to poll details
            }}
          />
        ))}
      </div>

      {filteredPolls.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No polls found matching your criteria.</p>
          <Button asChild className="mt-4">
            <Link href="/dapp/create">Create the first poll</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
