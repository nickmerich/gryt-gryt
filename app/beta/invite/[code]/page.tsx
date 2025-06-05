import { redirect } from "next/navigation"
import { getBetaUserByCode, validateBetaCode } from "@/lib/beta-utils"
import BetaSignupForm from "@/components/beta/beta-signup-form"

export default async function BetaInvitePage({
  params,
}: {
  params: { code: string }
}) {
  const { code } = params
  const isValidCode = validateBetaCode(code)

  if (!isValidCode) {
    redirect("/beta/invalid")
  }

  const betaUser = getBetaUserByCode(code)

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-block bg-black p-3 mb-4">
            <h1 className="text-3xl font-bold text-green-500">GRYT</h1>
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">Private Beta Invitation</h2>
          <p className="text-gray-700">
            Welcome, {betaUser?.name || "Friend"}! You've been invited to join our exclusive beta.
          </p>
        </div>

        <div className="bg-white border-4 border-black p-6 shadow-brutal">
          <BetaSignupForm inviteCode={code} email={betaUser?.email} />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Having trouble? Contact us at <span className="text-green-600 font-bold">beta@gryt.app</span>
          </p>
        </div>
      </div>
    </div>
  )
}
