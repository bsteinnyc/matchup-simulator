"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import { nbaTeams } from "./data/nbaTeams"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Home() {
  const [team1, setTeam1] = useState<(typeof nbaTeams)[0] | null>(null)
  const [team2, setTeam2] = useState<(typeof nbaTeams)[0] | null>(null)
  const [result, setResult] = useState<string | null>(null)

  const simulateGame = () => {
    if (!team1 || !team2) return
    const winner = Math.random() < 0.5 ? team1 : team2
    setResult(`${winner.name} wins!`)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-5xl flex justify-between items-center">
        <div className="w-1/3 flex flex-col items-center">
          <Select onValueChange={(value) => setTeam1(nbaTeams.find((team) => team.id === Number.parseInt(value)))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select team 1" />
            </SelectTrigger>
            <SelectContent>
              {nbaTeams.map((team) => (
                <SelectItem key={team.id} value={team.id.toString()}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {team1 && (
            <Image src={team1.logo || "/placeholder.svg"} alt={team1.name} width={100} height={100} className="mt-4" />
          )}
        </div>

        <Button onClick={simulateGame} disabled={!team1 || !team2} className="mx-4">
          <Play className="mr-2 h-4 w-4" /> Run Simulation
        </Button>

        <div className="w-1/3 flex flex-col items-center">
          <Select onValueChange={(value) => setTeam2(nbaTeams.find((team) => team.id === Number.parseInt(value)))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select team 2" />
            </SelectTrigger>
            <SelectContent>
              {nbaTeams.map((team) => (
                <SelectItem key={team.id} value={team.id.toString()}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {team2 && (
            <Image src={team2.logo || "/placeholder.svg"} alt={team2.name} width={100} height={100} className="mt-4" />
          )}
        </div>
      </div>

      {result && <div className="mt-8 text-2xl font-bold">{result}</div>}
    </main>
  )
}

