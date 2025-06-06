"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Save, Download, FileText, Heart, Target, Scissors, Sparkles, Eye, Edit3 } from "lucide-react"
import { cn } from "@/lib/utils"
import TemplateSelector from "@/components/contract/template-selector"
import TemplatePreview from "@/components/contract/template-preview"
import type { ContractTemplate } from "@/lib/contract-templates"

export default function PersonalContractPage() {
  const [isEditing, setIsEditing] = useState(true)
  const [targetDate, setTargetDate] = useState<Date>()
  const [contractData, setContractData] = useState({
    identity: "",
    gratitude: "",
    goal: "",
    sacrifices: "",
    habits: "",
    signature: "",
  })
  const [savedContract, setSavedContract] = useState<string>("")
  const [showTemplates, setShowTemplates] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null)
  const [showTemplatePreview, setShowTemplatePreview] = useState(false)

  const generateContract = () => {
    const dateString = targetDate ? format(targetDate, "MMMM dd, yyyy") : "[Target Date]"

    const contract = `
PERSONAL COMMITMENT CONTRACT

Dear Future Me,

${contractData.identity || "[Your identity and who you are]"}

${contractData.gratitude || "[Express your gratitude]"}

I am writing this letter to commit to achieving my primary goal: ${contractData.goal || "[Your primary goal]"} by ${dateString}.

To achieve this goal, I am willing to make the following sacrifices:
${contractData.sacrifices || "[List your sacrifices]"}

I commit to cultivating these habits for my self-improvement:
${contractData.habits || "[List your habits]"}

This contract represents my dedication to personal growth and my commitment to becoming the best version of myself.

Signed with determination,
${contractData.signature || "[Your signature]"}

Date: ${format(new Date(), "MMMM dd, yyyy")}
    `.trim()

    setSavedContract(contract)
    setIsEditing(false)
  }

  const downloadContract = () => {
    const element = document.createElement("a")
    const file = new Blob([savedContract], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "personal-contract.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleSelectTemplate = (template: ContractTemplate) => {
    setSelectedTemplate(template)
    setShowTemplates(false)
    setShowTemplatePreview(true)
  }

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      setContractData({
        identity: selectedTemplate.identity,
        gratitude: selectedTemplate.gratitude,
        goal: selectedTemplate.goal,
        sacrifices: selectedTemplate.sacrifices,
        habits: selectedTemplate.habits,
        signature: contractData.signature, // Keep existing signature
      })

      // Set suggested target date
      const suggestedDate = new Date()
      suggestedDate.setDate(suggestedDate.getDate() + selectedTemplate.suggestedTimeframe)
      setTargetDate(suggestedDate)

      setShowTemplatePreview(false)
      setSelectedTemplate(null)
    }
  }

  const handleCloseTemplates = () => {
    setShowTemplates(false)
    setSelectedTemplate(null)
    setShowTemplatePreview(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 p-4 sm:p-0">
      <div className="space-y-6 sm:space-y-8 pb-8">
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-green-500/10 via-black/10 to-green-600/10"></div>
          <div className="relative backdrop-blur-sm border-3 sm:border-4 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 bg-white/90 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-glow-green">
                    <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl lg:text-4xl font-black leading-tight text-black">
                      Personal{" "}
                      <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                        Contract
                      </span>
                    </h1>
                    <p className="text-sm sm:text-base font-medium text-gray-700">
                      Create a meaningful commitment to yourself
                    </p>
                  </div>
                </div>
                <p className="text-base sm:text-lg font-medium leading-relaxed text-gray-700">
                  Write a personal letter of commitment that will serve as your{" "}
                  <span className="font-bold px-2 py-1 rounded-lg text-green-700 bg-green-50 border border-green-200">
                    roadmap to success
                  </span>{" "}
                  and hold you accountable to your goals. 📝
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className={`flex-1 sm:flex-none ${
                  isEditing
                    ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                    : "bg-white hover:bg-green-50 text-black border-black"
                } rounded-xl sm:rounded-2xl border-3 font-bold px-4 sm:px-6 py-3 text-sm sm:text-base min-h-[44px] shadow-[4px_4px_0px_0px_rgba(34,197,94,0.5)]`}
              >
                {isEditing ? (
                  <Edit3 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                ) : (
                  <Eye className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                )}
                {isEditing ? "Edit Contract" : "Preview Contract"}
              </Button>
              <Button
                onClick={() => setShowTemplates(true)}
                variant="outline"
                className="flex-1 sm:flex-none bg-white hover:bg-green-50 border-black text-black border-3 rounded-xl sm:rounded-2xl font-bold px-4 sm:px-6 py-3 text-sm sm:text-base min-h-[44px]"
              >
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Use Template
              </Button>
              {savedContract && (
                <Button
                  onClick={downloadContract}
                  variant="outline"
                  className="flex-1 sm:flex-none bg-white hover:bg-green-50 border-black text-black border-3 rounded-xl sm:rounded-2xl font-bold px-4 sm:px-6 py-3 text-sm sm:text-base min-h-[44px]"
                >
                  <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Download
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Contract Form/Preview */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-sm border-3 sm:border-4 rounded-xl sm:rounded-2xl overflow-hidden bg-white/95 border-black">
              <div className="bg-gradient-to-r from-green-500 via-green-600 to-black p-4 sm:p-6 text-white">
                <div className="flex items-center gap-2 sm:gap-3">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                  <h2 className="text-lg sm:text-xl font-bold">
                    {isEditing ? "Create Your Contract" : "Your Personal Contract"}
                  </h2>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {isEditing ? (
                  <div className="space-y-6">
                    {/* Identity Section */}
                    <div>
                      <Label className="text-base font-bold mb-2 block text-black">
                        <Heart className="h-4 w-4 inline mr-2 text-green-600" />
                        Your Identity
                      </Label>
                      <Textarea
                        placeholder="Write about who you are, your values, and what defines you..."
                        className="min-h-[100px] border-2 border-black rounded-xl resize-none"
                        value={contractData.identity}
                        onChange={(e) => setContractData({ ...contractData, identity: e.target.value })}
                      />
                    </div>

                    {/* Gratitude Section */}
                    <div>
                      <Label className="text-base font-bold mb-2 block text-black">
                        <Sparkles className="h-4 w-4 inline mr-2 text-green-600" />
                        Express Gratitude
                      </Label>
                      <Textarea
                        placeholder="What are you grateful for in your life right now..."
                        className="min-h-[80px] border-2 border-black rounded-xl resize-none"
                        value={contractData.gratitude}
                        onChange={(e) => setContractData({ ...contractData, gratitude: e.target.value })}
                      />
                    </div>

                    {/* Goal Section */}
                    <div>
                      <Label className="text-base font-bold mb-2 block text-black">
                        <Target className="h-4 w-4 inline mr-2 text-green-600" />
                        Primary Goal
                      </Label>
                      <Textarea
                        placeholder="Describe your main goal in detail..."
                        className="min-h-[80px] border-2 border-black rounded-xl resize-none"
                        value={contractData.goal}
                        onChange={(e) => setContractData({ ...contractData, goal: e.target.value })}
                      />
                    </div>

                    {/* Target Date */}
                    <div>
                      <Label className="text-base font-bold mb-2 block text-black">
                        <CalendarIcon className="h-4 w-4 inline mr-2 text-green-600" />
                        Target Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal border-2 border-black rounded-xl min-h-[44px]",
                              !targetDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {targetDate ? format(targetDate, "PPP") : "Pick a target date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 border-2 border-black rounded-xl">
                          <Calendar mode="single" selected={targetDate} onSelect={setTargetDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Sacrifices Section */}
                    <div>
                      <Label className="text-base font-bold mb-2 block text-black">
                        <Scissors className="h-4 w-4 inline mr-2 text-green-600" />
                        Sacrifices You'll Make
                      </Label>
                      <Textarea
                        placeholder="What are you willing to give up or sacrifice to achieve your goal..."
                        className="min-h-[100px] border-2 border-black rounded-xl resize-none"
                        value={contractData.sacrifices}
                        onChange={(e) => setContractData({ ...contractData, sacrifices: e.target.value })}
                      />
                    </div>

                    {/* Habits Section */}
                    <div>
                      <Label className="text-base font-bold mb-2 block text-black">
                        <Target className="h-4 w-4 inline mr-2 text-green-600" />
                        Habits to Cultivate
                      </Label>
                      <Textarea
                        placeholder="List the habits you will develop and maintain..."
                        className="min-h-[100px] border-2 border-black rounded-xl resize-none"
                        value={contractData.habits}
                        onChange={(e) => setContractData({ ...contractData, habits: e.target.value })}
                      />
                    </div>

                    {/* Signature */}
                    <div>
                      <Label className="text-base font-bold mb-2 block text-black">Your Signature</Label>
                      <Input
                        placeholder="Type your full name"
                        className="border-2 border-black rounded-xl min-h-[44px]"
                        value={contractData.signature}
                        onChange={(e) => setContractData({ ...contractData, signature: e.target.value })}
                      />
                    </div>

                    <Button
                      onClick={generateContract}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl border-3 border-green-400 font-bold px-6 py-3 text-base min-h-[48px] shadow-[4px_4px_0px_0px_rgba(34,197,94,0.5)]"
                    >
                      <Save className="h-5 w-5 mr-2" />
                      Generate Contract
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedContract ? (
                      <div className="bg-white border-2 border-black rounded-xl p-6 font-mono text-sm leading-relaxed whitespace-pre-line">
                        {savedContract}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-600">
                          No contract generated yet. Fill out the form and click "Generate Contract".
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips Card */}
            <Card className="border-3 sm:border-4 rounded-xl sm:rounded-2xl overflow-hidden bg-white/95 border-black">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Writing Tips
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <h4 className="font-bold text-black mb-2">Be Specific</h4>
                  <p className="text-sm text-gray-700">Use concrete details and measurable outcomes in your goals.</p>
                </div>
                <div>
                  <h4 className="font-bold text-black mb-2">Be Honest</h4>
                  <p className="text-sm text-gray-700">Write authentically about your motivations and challenges.</p>
                </div>
                <div>
                  <h4 className="font-bold text-black mb-2">Be Realistic</h4>
                  <p className="text-sm text-gray-700">Set achievable goals with reasonable timelines.</p>
                </div>
                <div>
                  <h4 className="font-bold text-black mb-2">Be Committed</h4>
                  <p className="text-sm text-gray-700">This contract is a promise to yourself - make it meaningful.</p>
                </div>
              </div>
            </Card>

            {/* Progress Card */}
            <Card className="border-3 sm:border-4 rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 to-green-100 border-black">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Contract Progress
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { label: "Identity", completed: !!contractData.identity },
                  { label: "Gratitude", completed: !!contractData.gratitude },
                  { label: "Goal", completed: !!contractData.goal },
                  { label: "Target Date", completed: !!targetDate },
                  { label: "Sacrifices", completed: !!contractData.sacrifices },
                  { label: "Habits", completed: !!contractData.habits },
                  { label: "Signature", completed: !!contractData.signature },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        item.completed ? "bg-green-500 border-green-500" : "border-gray-300"
                      }`}
                    >
                      {item.completed && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <span className={`text-sm font-medium ${item.completed ? "text-green-700" : "text-gray-600"}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      {/* Template Selector */}
      {showTemplates && <TemplateSelector onSelectTemplate={handleSelectTemplate} onClose={handleCloseTemplates} />}

      {/* Template Preview */}
      {showTemplatePreview && selectedTemplate && (
        <TemplatePreview
          template={selectedTemplate}
          onUseTemplate={handleUseTemplate}
          onBack={() => {
            setShowTemplatePreview(false)
            setShowTemplates(true)
          }}
        />
      )}
    </div>
  )
}
