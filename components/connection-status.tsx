"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

interface ConnectionStatusProps {
  hospitals: Array<{
    id: string
    name: string
    url: string
    status?: "online" | "offline" | "checking"
  }>
}

export function ConnectionStatus({ hospitals }: ConnectionStatusProps) {
  const [showStatus, setShowStatus] = useState(false)

  const offlineHospitals = hospitals.filter((h) => h.status === "offline")
  const onlineHospitals = hospitals.filter((h) => h.status === "online")

  useEffect(() => {
    if (offlineHospitals.length > 0) {
      setShowStatus(true)
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => setShowStatus(false), 10000)
      return () => clearTimeout(timer)
    }
  }, [offlineHospitals.length])

  if (!showStatus || offlineHospitals.length === 0) return null

  return (
    <Alert className="mb-6 border-yellow-200 bg-yellow-50">
      <AlertTriangle className="h-4 w-4 text-yellow-600" />
      <AlertDescription className="text-yellow-800">
        <div className="flex items-center justify-between">
          <div>
            <strong>Connection Notice:</strong> {offlineHospitals.length} hospital
            {offlineHospitals.length > 1 ? "s are" : " is"} currently not accessible.
            {onlineHospitals.length > 0 &&
              ` ${onlineHospitals.length} hospital${onlineHospitals.length > 1 ? "s are" : " is"} available.`}
          </div>
          <button onClick={() => setShowStatus(false)} className="text-yellow-600 hover:text-yellow-800 ml-4">
            ×
          </button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
