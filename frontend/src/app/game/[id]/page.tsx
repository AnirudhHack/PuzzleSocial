"use client"

import { notFound } from 'next/navigation'
import Navbar from '../../components/Navbar'
import SlidingPuzzle from '../../components/SlidingPuzzle'
import { getGameById } from '@/lib/getGames'
import { Web3Provider } from '@/app/components/Web3Provider'

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function GamePage({ params }: { params: { id: string } }) {
  const game = await getGameById(params.id);

  if (!game) {
    notFound();
  }

  return (
    <Web3Provider>
      <div className="min-h-screen bg-indigo-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">{game.name}</h1>
          <div className="mb-4 text-center text-indigo-600">
            Created by: {game.creatorAddress.slice(0, 6)}...{game.creatorAddress.slice(-4)}
          </div>
          <SlidingPuzzle gridSize={game.gridSize} tiles={game.tiles} emptyTile={game.emptyTile}/>
        </main>
      </div>
    </Web3Provider>
  )
}

