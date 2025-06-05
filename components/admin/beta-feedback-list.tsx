interface Feedback {
  id: number
  feedback_type: string
  content: any
  created_at: string
  username: string
}

interface BetaFeedbackListProps {
  feedback: Feedback[]
}

export default function BetaFeedbackList({ feedback }: BetaFeedbackListProps) {
  return (
    <div className="bg-white border-4 border-black shadow-brutal">
      {feedback.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {feedback.map((item) => (
            <div key={item.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-bold rounded ${
                      item.feedback_type === "bug"
                        ? "bg-red-100 text-red-800"
                        : item.feedback_type === "feature"
                          ? "bg-blue-100 text-blue-800"
                          : item.feedback_type === "rating"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.feedback_type.charAt(0).toUpperCase() + item.feedback_type.slice(1)}
                  </span>
                  <span className="ml-2 font-bold text-black">{item.username}</span>
                </div>
                <span className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString()}</span>
              </div>

              {item.feedback_type === "rating" ? (
                <div className="flex items-center">
                  <div className="text-2xl font-bold text-green-500">{item.content}/5</div>
                  <div className="ml-2 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${star <= item.content ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-700">{item.content}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center text-gray-500">No feedback submitted yet</div>
      )}
    </div>
  )
}
