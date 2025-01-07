import { ethers } from "ethers";
import ABI from "./abi/PuzzleSocial.json"
import {decodeSlidingPuzzle, encodeSlidingPuzzle} from './helper/helper'

// ABI for the contract (ensure it includes createPuzzle and getAllPuzzles)
const contractABI = ABI.abi

// Address of the deployed contract 0x63a0Cd98372f29A1cAF235D14757457E81802915
const contractAddress = "0x63a0Cd98372f29A1cAF235D14757457E81802915";

const provider = new ethers.providers.JsonRpcProvider("https://rpc.testnet.lens.dev")

// Function to create a new puzzle
export async function createPuzzle(signer, gameTypeId, grid) {
  try {
    
    const initialState = encodeSlidingPuzzle(grid, grid.length)

    const finalState = "0x" // not required for sliding puzzle game

    // Initialize the contract
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Call the createPuzzle function
    const tx = await contract.createPuzzle(gameTypeId, initialState, finalState, {gasLimit: 350000});

    console.log("Transaction sent, waiting for confirmation...");
    await tx.wait();
    console.log("Puzzle created successfully:", tx.hash);
  } catch (error) {
    console.error("Error creating puzzle:", error);
  }
}

// Function to get all puzzles
export async function getAllPuzzles() {
  try {
    // Initialize the contract
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    // Call the getAllPuzzles function
    const puzzles = await contract.getAllPuzzles();

    // Parse and log the puzzles
    const parsedPuzzles = puzzles.map((puzzle) => {
        const decodedData = decodeSlidingPuzzle(ethers.utils.hexlify(puzzle.initialState))
        const _grids= decodedData.grid
        // for(const item of decodedData.grid){
        //     console.log("item", item)
        //     for(const e of item){

        //         _grids.push(e)
        //     }
        // }
        console.log("_grids ", _grids)
        return {

            id: puzzle.id.toNumber(),
            gameTypeId: puzzle.gameTypeId.toNumber(),
            creator: puzzle.creator,
            initialState: ethers.utils.hexlify(puzzle.initialState),
            finalState: ethers.utils.hexlify(puzzle.finalState),
            grids: _grids,
            emptyTile: decodedData.emptyTile,
            length: Math.sqrt(_grids.length)
        }
    });

    console.log("Retrieved puzzles:", parsedPuzzles);
    return parsedPuzzles;
  } catch (error) {
    console.error("Error retrieving puzzles:", error);
    return [];
  }
}
