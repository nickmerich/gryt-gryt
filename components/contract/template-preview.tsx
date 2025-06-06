"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ContractTemplate } from "@/lib/contract-templates"
import { ArrowLeft, Clock, Target, Heart, Sparkles, Scissors, CheckCircle } from "lucide-react"

interface TemplatePreviewProps {
  template: ContractTemplate
  onUseTemplate: () => void
  onBack: () => void
}

export default function TemplatePreview({ template, onUseTemplate, onBack }: TemplatePreviewProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
          <div className="flex items-center gap-4">
            <Button onClick={onBack} variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-xl p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{template.icon}</span>
              <div>
                <h2 className="text-2xl font-bold">{template.title}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {template.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-green-100">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{template.suggestedTimeframe} days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
          {/* Description */}
          <div className="mb-6">
            <p className="text-lg text-gray-700 leading-relaxed">{template.description}</p>
          </div>

          {/* Template Sections */}
          <div className="space-y-6">
            {/* Identity */}
            <Card className="border-2 border-green-200 rounded-xl overflow-hidden">
              <div className="bg-green-50 p-4 border-b-2 border-green-200">
                <h3 className="font-bold text-green-800 flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Your Identity
                </h3>
              </div>
              <div className="p-4">
                <p className="text-gray-700 leading-relaxed">{template.identity}</p>
              </div>
            </Card>

            {/* Gratitude */}
            <Card className="border-2 border-green-200 rounded-xl overflow-hidden">
              <div className="bg-green-50 p-4 border-b-2 border-green-200">
                <h3 className="font-bold text-green-800 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Express Gratitude
                </h3>
              </div>
              <div className="p-4">
                <p className="text-gray-700 leading-relaxed">{template.gratitude}</p>
              </div>
            </Card>

            {/* Goal */}
            <Card className="border-2 border-green-200 rounded-xl overflow-hidden">
              <div className="bg-green-50 p-4 border-b-2 border-green-200">
                <h3 className="font-bold text-green-800 flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Primary Goal
                </h3>
              </div>
              <div className="p-4">
                <p className="text-gray-700 leading-relaxed">{template.goal}</p>
              </div>
            </Card>

            {/* Sacrifices */}
            <Card className="border-2 border-green-200 rounded-xl overflow-hidden">
              <div className="bg-green-50 p-4 border-b-2 border-green-200">
                <h3 className="font-bold text-green-800 flex items-center gap-2">
                  <Scissors className="h-5 w-5" />
                  Sacrifices You'll Make
                </h3>
              </div>
              <div className="p-4">
                <p className="text-gray-700 leading-relaxed">{template.sacrifices}</p>
              </div>
            </Card>

            {/* Habits */}
            <Card className="border-2 border-green-200 rounded-xl overflow-hidden">
              <div className="bg-green-50 p-4 border-b-2 border-green-200">
                <h3 className="font-bold text-green-800 flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Habits to Cultivate
                </h3>
              </div>
              <div className="p-4">
                <p className="text-gray-700 leading-relaxed">{template.habits}</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t-2 border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <p>This template will populate all sections of your contract.</p>
              <p>You can customize any part after applying the template.</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={onBack} variant="outline" className="border-2 border-black rounded-xl">
                Back to Templates
              </Button>
              <Button
                onClick={onUseTemplate}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl border-2 border-green-400 font-bold px-6"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Use This Template
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
