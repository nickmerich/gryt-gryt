import Link from "next/link"

export default function InvalidBetaPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="inline-block bg-black p-3 mb-4">
          <h1 className="text-3xl font-bold text-green-500">GRYT</h1>
        </div>

        <div className="bg-white border-4 border-black p-6 shadow-brutal">
          <h2 className="text-2xl font-bold text-black mb-4">Invalid Invitation Code</h2>
          <p className="text-gray-700 mb-6">The beta invitation code you've used is invalid or has expired.</p>

          <div className="flex justify-center">
            <Link
              href="/"
              className="bg-green-500 text-white px-6 py-3 font-bold border-4 border-black shadow-brutal hover:bg-green-600 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-600">
            Think this is a mistake? Contact us at <span className="text-green-600 font-bold">beta@gryt.app</span>
          </p>
        </div>
      </div>
    </div>
  )
}
