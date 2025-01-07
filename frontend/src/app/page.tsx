"use client"

import Navbar from './components/Navbar'
import GameCard from './components/GameCard'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getGames } from '@/lib/getGames'
import { Suspense } from 'react'
import { Web3Provider } from './components/Web3Provider'

export const revalidate = 60; // Revalidate this page every 60 seconds

async function GamesList() {
  const games = await getGames();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <GameCard key={game.id} {...game} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <Web3Provider>
      <div className="min-h-screen bg-indigo-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-indigo-800">Puzzle Social</h1>
          <p className="text-lg text-indigo-700 text-center mb-8">
            Explore, create, and play puzzle games created by people all around the world on the Lens Network. 
            Discover creative challenges and test your skills!
          </p>
          <Tabs defaultValue="play" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="play" className="text-lg font-semibold">Play</TabsTrigger>
              <TabsTrigger value="create" className="text-lg font-semibold">Create</TabsTrigger>
            </TabsList>
            <TabsContent value="play">
              <Suspense fallback={<div className="text-center">Loading games...</div>}>
                <GamesList />
              </Suspense>
            </TabsContent>
            <TabsContent value="create">
              <div className="bg-white rounded-lg p-6 text-center">
                <h2 className="text-3xl font-bold mb-4 text-indigo-800">Design Your Puzzle</h2>
                <p className="mb-6 text-indigo-600">Create your own custom sliding puzzle and share it across the Lens Network. Let your creativity shine and challenge players globally!</p>
                <Link href="/create">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded">
                    Create New Puzzle
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </Web3Provider>
  )
}

