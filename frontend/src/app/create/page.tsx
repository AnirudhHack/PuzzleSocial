"use client"
import Navbar from '../components/Navbar'
import PuzzleCreator from '../components/PuzzleCreator'
import { Web3Provider } from '../components/Web3Provider';

export default function CreatePage() {
  return (
    <Web3Provider>
      
      <div className="min-h-screen bg-gray-100"> {/* Update: Changed background class */}
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">Create Your Puzzle</h1>
          <PuzzleCreator />
        </main>
      </div>
    </Web3Provider>
  )
}

