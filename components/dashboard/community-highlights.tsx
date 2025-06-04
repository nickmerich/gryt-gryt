"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageSquare, Award } from "lucide-react"

interface CommunityPost {
  id: number
  user: {
    name: string
    avatar?: string
    initials: string
  }
  content: string
  likes: number
  comments: number
  achievement?: string
}

export default function CommunityHighlights() {
  const posts: CommunityPost[] = [
    {
      id: 1,
      user: {
        name: "Sarah J.",
        initials: "SJ",
      },
      content: "Just completed my 30-day meditation streak! Feeling more focused and calm than ever.",
      likes: 24,
      comments: 5,
      achievement: "30-Day Meditation Streak",
    },
    {
      id: 2,
      user: {
        name: "Michael T.",
        avatar: "/placeholder.svg?key=nkthc",
        initials: "MT",
      },
      content: "Looking for accountability partners for the morning workout challenge. Who's in?",
      likes: 18,
      comments: 12,
    },
    {
      id: 3,
      user: {
        name: "Elena R.",
        initials: "ER",
      },
      content: "Just hit my reading goal for the month! 8 books in 30 days. Next month I'm aiming for 10!",
      likes: 32,
      comments: 7,
      achievement: "Monthly Reading Goal",
    },
  ]

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="border-2 border-black rounded-xl p-3">
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="h-8 w-8 border-2 border-black">
              {post.user.avatar ? (
                <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
              ) : null}
              <AvatarFallback className="bg-purple-100 text-purple-800 font-bold text-xs">
                {post.user.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-sm">{post.user.name}</p>
              {post.achievement && (
                <div className="flex items-center gap-1 text-xs text-amber-600">
                  <Award className="h-3 w-3" />
                  <span>{post.achievement}</span>
                </div>
              )}
            </div>
          </div>

          <p className="text-sm mb-3">{post.content}</p>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              <span>{post.comments}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
