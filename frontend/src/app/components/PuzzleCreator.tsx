'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import SlidingPuzzle from './SlidingPuzzle'
import {createPuzzle} from '../../web3Functions/contractFunctions'
import { useEthersSigner } from '../../lib/useEthersSigner'
const PuzzleCreator = () => {
  const [gridSize, setGridSize] = useState(3)
  const [tiles, setTiles] = useState<number[]>(Array.from({ length: gridSize * gridSize }, (_, i) => i + 1))
  const signer = useEthersSigner()

  const handleGridSizeChange = (value: string) => {
    const newSize = parseInt(value)
    setGridSize(newSize)
    setTiles(Array.from({ length: newSize * newSize }, (_, i) => i + 1))
  }

  const handleTileSwap = (index1: number, index2: number) => {
    const newTiles = [...tiles]
    ;[newTiles[index1], newTiles[index2]] = [newTiles[index2], newTiles[index1]]
    setTiles(newTiles)
  }

  const handleCreatePuzzle = async() => {
    // Here you would typically send the puzzle configuration to a backend
    console.log('Created puzzle with configuration:', tiles)
    
    const tx = await createPuzzle(signer, 1, tiles)
    alert('Puzzle created successfully!')
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <Select onValueChange={handleGridSizeChange} defaultValue="3">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select grid size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">3x3</SelectItem>
            <SelectItem value="4">4x4</SelectItem>
            <SelectItem value="5">5x5</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <SlidingPuzzle gridSize={gridSize} tiles={tiles} onTileSwap={handleTileSwap} isCreator emptyTile={gridSize*gridSize} />
      <Button onClick={handleCreatePuzzle} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white">
        Create Puzzle
      </Button>
    </div>
  )
}

export default PuzzleCreator

