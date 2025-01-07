'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Confetti from "react-confetti"

interface SlidingPuzzleProps {
  gridSize: number
  tiles?: number[]
  onTileSwap?: (index1: number, index2: number) => void
  isCreator?: boolean
  emptyTile: number
}

const SlidingPuzzle = ({ gridSize, tiles: initialTiles, onTileSwap, isCreator = false, emptyTile }: SlidingPuzzleProps) => {
  const [tiles, setTiles] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [isWon, setIsWon] = useState(false)

  const EMPTY_TILE = emptyTile//gridSize * gridSize
  console.log("tiles", tiles)
  useEffect(() => {
    if (initialTiles) {
      setTiles(initialTiles)
    } else {
      resetGame()
    }
  }, [gridSize, initialTiles])

  const resetGame = () => {
    const newTiles = Array.from({ length: gridSize * gridSize }, (_, i) => i + 1)
    // if (!isCreator) {
    //   shuffleArray(newTiles)
    // }
    setTiles(initialTiles || newTiles)
    setMoves(0)
    setIsWon(false)
  }

  const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
  }

  const handleTileClick = (index: number) => {
    if (isWon && !isCreator) return

    const emptyIndex = tiles.indexOf(EMPTY_TILE)
    if (isAdjacent(index, emptyIndex)) {
      const newTiles = [...tiles]
      ;[newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]]
      setTiles(newTiles)
      if (!isCreator) {
        setMoves(moves + 1)
        if (isSolved(newTiles)) {
          setIsWon(true)
        }
      }
      if (onTileSwap) {
        onTileSwap(index, emptyIndex)
      }
    }
  }

  const isAdjacent = (index1: number, index2: number) => {
    const row1 = Math.floor(index1 / gridSize)
    const col1 = index1 % gridSize
    const row2 = Math.floor(index2 / gridSize)
    const col2 = index2 % gridSize

    return (
      (Math.abs(row1 - row2) === 1 && col1 === col2) ||
      (Math.abs(col1 - col2) === 1 && row1 === row2)
    )
  }

  const isSolved = (tiles: number[]) => {
    return tiles.every((tile, index) => tile === index + 1)
  }

  return (
    <div className="flex flex-col items-center">
      {
        isWon && <Confetti />
      }
      {/* <div className={`grid grid-cols-${gridSize} gap-2 mb-4`}> */}
      <div
        className="grid gap-2 mb-4"
        style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
      >
        {tiles.map((tile, index) => (
          <button
            key={index}
            // style={{
            //   backgroundColor: tile === EMPTY_TILE ? '#e2e8f0' : '#213ed7', // Default color
            //   color: tile !== EMPTY_TILE ? '#ffffff' : '',
            // }}
            className={`w-16 h-16 flex items-center justify-center text-xl font-bold rounded-md transition-colors duration-300 ${
              tile === EMPTY_TILE
                ? 'bg-indigo-200'
                : 'bg-indigo-500 text-white hover:bg-indigo-600'
            }`}
            onClick={() => handleTileClick(index)}
            disabled={isWon && !isCreator}
          >
            {tile === EMPTY_TILE ? '' : tile}
          </button>
        ))}
      </div>
      {!isCreator && (
        <>
          <div className="mb-4 text-indigo-800">Moves: {moves}</div>
          {isWon && <div className="mb-4 text-2xl font-bold text-indigo-800">You won!</div>}
          <Button onClick={resetGame} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Reset Game
          </Button>
        </>
      )}
    </div>
  )
}

export default SlidingPuzzle

