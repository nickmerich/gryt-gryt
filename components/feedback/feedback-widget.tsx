"use client"

import { useState } from "react"
import { X, MessageSquare, Send } from "lucide-react"

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [feedbackType, setFeedbackType] = useState<"general" | "bug" | "feature" | "rating" | null>(null)
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async () => {
    if ((feedbackType === "rating" && rating === null) || (feedbackType !== "rating" && !feedback.trim())) {
      return
    }

    setIsSubmitting(true)

    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: feedbackType,
          content: feedbackType === "rating" ? rating : feedback,
        }),
      })

      setIsSubmitted(true)
      setTimeout(() => {
        setIsOpen(false)
        // Reset after animation completes
        setTimeout(() => {
          setFeedbackType(null)
          setFeedback("")
          setRating(null)
          setIsSubmitted(false)
        }, 300)
      }, 2000)
    } catch (error) {
      console.error("Failed to submit feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Feedback button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-brutal border-4 border-black hover:bg-green-600 transition-colors z-50"
        aria-label="Give feedback"
      >
        <MessageSquare size={24} />
      </button>

      {/* Feedback modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-4 border-black shadow-brutal w-full max-w-md relative">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-black hover:text-gray-700"
              aria-label="Close feedback"
            >
              <X size={24} />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-black mb-4">{isSubmitted ? "Thank You!" : "Beta Feedback"}</h2>

              {isSubmitted ? (
                <p className="text-green-600 font-bold">
                  Your feedback has been submitted. We appreciate your help in making GRYT better!
                </p>
              ) : feedbackType === null ? (
                <div className="space-y-4">
                  <p className="text-gray-700 mb-4">Help us improve GRYT by sharing your thoughts:</p>

                  <button
                    onClick={() => setFeedbackType("general")}
                    className="w-full p-3 border-4 border-black bg-white hover:bg-gray-100 text-left font-bold"
                  >
                    General Feedback
                  </button>

                  <button
                    onClick={() => setFeedbackType("bug")}
                    className="w-full p-3 border-4 border-black bg-white hover:bg-gray-100 text-left font-bold"
                  >
                    Report a Bug
                  </button>

                  <button
                    onClick={() => setFeedbackType("feature")}
                    className="w-full p-3 border-4 border-black bg-white hover:bg-gray-100 text-left font-bold"
                  >
                    Request a Feature
                  </button>

                  <button
                    onClick={() => setFeedbackType("rating")}
                    className="w-full p-3 border-4 border-black bg-white hover:bg-gray-100 text-left font-bold"
                  >
                    Rate Your Experience
                  </button>
                </div>
              ) : feedbackType === "rating" ? (
                <div className="space-y-4">
                  <p className="text-gray-700 mb-4">How would you rate your experience with GRYT?</p>

                  <div className="flex justify-center space-x-4">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        onClick={() => setRating(value)}
                        className={`w-12 h-12 flex items-center justify-center text-xl font-bold border-4 border-black ${
                          rating === value ? "bg-green-500 text-white" : "bg-white hover:bg-gray-100"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => setFeedbackType(null)}
                      className="px-4 py-2 border-4 border-black bg-white hover:bg-gray-100 font-bold"
                    >
                      Back
                    </button>

                    <button
                      onClick={handleSubmit}
                      disabled={rating === null || isSubmitting}
                      className="px-4 py-2 border-4 border-black bg-green-500 text-white hover:bg-green-600 font-bold disabled:opacity-50 flex items-center"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                      {!isSubmitting && <Send size={16} className="ml-2" />}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-700 mb-4">
                    {feedbackType === "general" && "Share your thoughts about GRYT:"}
                    {feedbackType === "bug" && "Describe the bug you encountered:"}
                    {feedbackType === "feature" && "What feature would you like to see?"}
                  </p>

                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full p-3 border-4 border-black h-32 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder={
                      feedbackType === "bug" ? "What happened? What did you expect to happen?" : "Your feedback..."
                    }
                  />

                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => setFeedbackType(null)}
                      className="px-4 py-2 border-4 border-black bg-white hover:bg-gray-100 font-bold"
                    >
                      Back
                    </button>

                    <button
                      onClick={handleSubmit}
                      disabled={!feedback.trim() || isSubmitting}
                      className="px-4 py-2 border-4 border-black bg-green-500 text-white hover:bg-green-600 font-bold disabled:opacity-50 flex items-center"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                      {!isSubmitting && <Send size={16} className="ml-2" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
