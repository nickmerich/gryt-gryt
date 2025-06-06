"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { contractTemplates, getTemplatesByCategory, type ContractTemplate } from "@/lib/contract-templates"
import { Search, Sparkles, ArrowRight, Clock, Target } from "lucide-react"

interface TemplateSelectorProps {
  onSelectTemplate: (template: ContractTemplate) => void
  onClose: () => void
}

export default function TemplateSelector({ onSelectTemplate, onClose }: TemplateSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = getTemplatesByCategory()
  const categoryNames = Object.keys(categories)

  const filteredTemplates = contractTemplates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="h-6 w-6" />
                Choose a Template
              </h2>
              <p className="text-green-100 mt-1">Get started with a pre-written template for your goals</p>
            </div>
            <Button onClick={onClose} variant="ghost" className="text-white hover:bg-white/20 rounded-xl">
              ✕
            </Button>
          </div>
        </div>

        <div className="p-6">
          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-black rounded-xl"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setSelectedCategory(null)}
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                className="rounded-xl border-2 border-black"
              >
                All Categories
              </Button>
              {categoryNames.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className="rounded-xl border-2 border-black"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="border-2 border-black rounded-xl overflow-hidden hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all cursor-pointer group"
                onClick={() => onSelectTemplate(template)}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{template.icon}</span>
                      <div>
                        <h3 className="font-bold text-lg text-black group-hover:text-green-600 transition-colors">
                          {template.title}
                        </h3>
                        <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{template.description}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{template.suggestedTimeframe} days</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      <span>Goal-focused</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-bold text-black mb-2">No templates found</h3>
              <p className="text-gray-600">Try adjusting your search terms or category filter</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 pt-4 border-t-2 border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {filteredTemplates.length} template{filteredTemplates.length !== 1 ? "s" : ""} available
              </p>
              <Button onClick={onClose} variant="outline" className="border-2 border-black rounded-xl">
                Start from Scratch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
