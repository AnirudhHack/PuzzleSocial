import {getAllPuzzles} from '../web3Functions/contractFunctions'

export interface Game {
    id: string;
    name: string;
    thumbnail: string;
    gridSize: number;
    creatorAddress: string;
    tiles:number[];
    emptyTile:number;
  }
  
  export async function getGames(): Promise<Game[]> {
    // Simulate API call with a delay
    // await new Promise(resolve => setTimeout(resolve, 1000));
    const data = await getAllPuzzles()
    console.log("data ", data)
    const games =  data.map((item:any) =>{
      return { 
        id: item.id, 
        name: "Puzzle " + item.id.toString(),//item.name, 
        thumbnail: '/puzzle.png?height=50&width=50', 
        gridSize: item.length,//Math.sqrt(item.length),
        creatorAddress: item.creator,
        tiles: item.grids,
        emptyTile: item.emptyTile
      }
    })
    return games.reverse();
  }

  
  export async function getGameById(id: string): Promise<Game | undefined> {
    const games = await getGames();
    console.log("games", games)
    return games.find(game => game.id == id);
  }
  

    // return [
  //   { 
  //     id: '1', 
  //     name: 'Classic 3x3', 
  //     thumbnail: '/placeholder.svg?height=150&width=150', 
  //     gridSize: 3,
  //     creatorAddress: '0x1234567890123456789012345678901234567890',
  //     tiles: [1, 2, 3, 4, 5, 6, 7, 9, 8]
  //   },
  //   { 
  //     id: '2', 
  //     name: 'Nature 4x4', 
  //     thumbnail: '/placeholder.svg?height=150&width=150', 
  //     gridSize: 4,
  //     creatorAddress: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
      
  //     tiles: [1, 2, 3, 4, 5, 6, 7, 9, 8]
  //   },
  //   { 
  //     id: '3', 
  //     name: 'Space 5x5', 
  //     thumbnail: '/placeholder.svg?height=150&width=150', 
  //     gridSize: 5,
  //     creatorAddress: '0x9876543210987654321098765432109876543210',
      
  //     tiles: [1, 2, 3, 4, 5, 6, 7, 9, 8]
  //   },
  // ];
  