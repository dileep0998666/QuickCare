"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Users, RefreshCw, Search } from "lucide-react"
import Link from "next/link"

interface QueueStatus {
  position: number | null
  doctorName?: string
  estimatedWait?: string
}

const hospitalInfo: Record<string, { name: string }> = {
  hospa: {
    name: "QuickCare Hospital A",
  },
  hospb: {
    name: "QuickCare Hospital B",
  },
}

export default function StatusPage() {
  const searchParams = useSearchParams()
  const [patientName, setPatientName] = useState("")
  const [selectedHospital, setSelectedHospital] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [queueStatus, setQueueStatus] = useState<QueueStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [doctors, setDoctors] = useState<any[]>([])

  // Pre-fill from URL params if available
  useEffect(() => {
    const hospital = searchParams.get("hospital")
    const doctor = searchParams.get("doctor")
    const name = searchParams.get("name")

    if (hospital) setSelectedHospital(hospital)
    if (doctor) setSelectedDoctor(doctor)
    if (name) setPatientName(decodeURIComponent(name))

    // Auto-check status if all params are present
    if (hospital && doctor && name) {
      checkStatus(hospital, doctor, decodeURIComponent(name))
    }
  }, [searchParams])

  // Fetch doctors when hospital is selected
  useEffect(() => {
    if (selectedHospital && hospitalInfo[selectedHospital]) {
      fetchDoctors(selectedHospital)
    }
  }, [selectedHospital])

  const fetchDoctors = async (hospitalId: string) => {
    try {
      const response = await fetch(`/api/hospitals/${hospitalId}/doctors`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setDoctors(data.doctors || [])
    } catch (error) {
      console.error("Error fetching doctors:", error)
      setDoctors([])
    }
  }

  const checkStatus = async (hospitalId?: string, doctorId?: string, name?: string) => {
    const hospital = hospitalId || selectedHospital
    const doctor = doctorId || selectedDoctor
    const patient = name || patientName

    if (!hospital || !doctor || !patient.trim()) {
      alert("Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      const response = await fetch(
        `/api/hospitals/${hospital}/doctors/${doctor}/status?name=${encodeURIComponent(patient)}`,
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      const doctorInfo = doctors.find((d) => d._id === doctor)
      setQueueStatus({
        position: data.position,
        doctorName: doctorInfo?.name,
        estimatedWait: data.position ? `${(data.position - 1) * 15} minutes` : undefined,
      })
    } catch (error) {
      console.error("Error checking status:", error)
      alert("Error checking status. Please try again or contact the hospital directly.")
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    if (queueStatus) {
      checkStatus()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-slate-800 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">QuickCare</h1>
                <p className="text-slate-300 text-sm">Appointment Status</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-slate-300">System Online</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-2xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Check Appointment Status</h2>
          <p className="text-slate-600">Enter your details to check your current queue position</p>
        </div>

        <Card className="mb-6 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Patient Information
            </CardTitle>
            <CardDescription>Please provide your booking details to check status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="hospital">Select Hospital</Label>
              <select
                id="hospital"
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              >
                <option value="">Choose a hospital</option>
                <option value="hospa">QuickCare Hospital A</option>
                <option value="hospb">QuickCare Hospital B</option>
              </select>
            </div>

            {selectedHospital && (
              <div>
                <Label htmlFor="doctor">Select Doctor</Label>
                <select
                  id="doctor"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                >
                  <option value="">Choose a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      Dr. {doctor.name} - {doctor.specialization}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <Label htmlFor="name">Patient Name</Label>
              <Input
                id="name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter the name used during booking"
              />
            </div>

            <Button
              onClick={() => checkStatus()}
              disabled={loading || !selectedHospital || !selectedDoctor || !patientName.trim()}
              className="w-full bg-slate-700 hover:bg-slate-800"
            >
              {loading ? "Checking..." : "Check Status"}
            </Button>
          </CardContent>
        </Card>

        {queueStatus && (
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Queue Status
                </CardTitle>
                <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {queueStatus.position ? (
                <>
                  <div className="text-center py-6">
                    <div className="text-4xl font-bold text-slate-800 mb-2">#{queueStatus.position}</div>
                    <p className="text-slate-600">Your position in queue</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-lg font-medium text-blue-800">{queueStatus.estimatedWait}</div>
                      <div className="text-sm text-blue-600">Estimated Wait</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <div className="text-lg font-medium text-green-800">{queueStatus.doctorName}</div>
                      <div className="text-sm text-green-600">Doctor</div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800 text-sm">
                      <strong>Please note:</strong> Wait times are estimates. Please arrive at the hospital and check in
                      at the reception for the most accurate information.
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-2xl font-bold text-red-600 mb-2">Not Found</div>
                  <p className="text-slate-600 mb-4">No appointment found with the provided details.</p>
                  <Badge variant="secondary">Please check your booking details or contact the hospital</Badge>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
