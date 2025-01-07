import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Game } from '@/lib/getGames'

const GameCard = ({ id, name, thumbnail, gridSize, creatorAddress }: Game) => {
  return (
    <Link href={`/game/${id}`}>
      <Card className="w-full cursor-pointer hover:shadow-lg transition-all duration-300">
        <CardContent className="p-0 relative">
          <img src={thumbnail} alt={name} className="w-full  object-cover" />
          <div className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded-full text-sm">
            {gridSize}x{gridSize}
          </div>
        </CardContent>
        <CardFooter className="p-4 flex flex-col items-start">
          <h3 className="text-lg font-semibold text-indigo-800">{name}</h3>
          <p className="text-sm text-indigo-600 mt-1">
            Created by: {creatorAddress.slice(0, 6)}...{creatorAddress.slice(-4)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default GameCard

