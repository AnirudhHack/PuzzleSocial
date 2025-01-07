// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title PuzzleSocial
 * @dev This contract allows users to create and participate in puzzle games on the Lens Network. 
 * Users can create puzzle game types and puzzles, interact with them socially, and track their progress in a Web3-based social platform for puzzle enthusiasts. 
 * The contract is designed to interact off-chain for encoding and decoding game states and puzzle solutions.
 * The focus is on social features for puzzle gamers on Lens, offering an engaging platform for sharing and solving puzzles.
 */
contract PuzzleSocial {
    // Owner of the contract
    address public owner;

    // Counter for tracking puzzle game types
    uint256 public gameTypeCounter;

    // Counter for tracking puzzles
    uint256 public puzzleCounter;

    // Puzzle game type structure
    struct PuzzleGameType {
        uint256 id;
        string name;
        bool isFinalStateRequired; // Indicates if the final state is required
        bool exists;               // For validation
    }

    // Individual puzzle structure
    struct Puzzle {
        uint256 id; // Unique identifier for the puzzle
        uint256 gameTypeId; // The game type associated with the puzzle
        address creator; // The creator of the puzzle
        bytes initialState; // The initial state of the puzzle, encoded off-chain
        bytes finalState; // The final state of the puzzle, encoded off-chain
    }

    // Mapping for game types (id => gameType)
    mapping(uint256 => PuzzleGameType) public puzzleGameTypes;

    // Mapping for puzzles (id => puzzle)
    mapping(uint256 => Puzzle) public puzzles;

    // Events
    event PuzzleGameTypeCreated(uint256 id, string name, bool isFinalStateRequired);
    event PuzzleCreated(
        uint256 id,
        uint256 gameTypeId,
        address creator,
        bytes initialState,
        bytes finalState
    );

    // Modifier to restrict functions to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Creates a new puzzle game type. (Owner only)
     * @param name The name of the puzzle game type.
     * @param isFinalStateRequired A boolean to specify if the puzzle game type requires a final state.
     */
    function createPuzzleGameType(string memory name, bool isFinalStateRequired) external onlyOwner {
        gameTypeCounter++;
        puzzleGameTypes[gameTypeCounter] = PuzzleGameType({
            id: gameTypeCounter,
            name: name,
            isFinalStateRequired: isFinalStateRequired,
            exists: true
        });
        emit PuzzleGameTypeCreated(gameTypeCounter, name, isFinalStateRequired);
    }

    /**
     * @dev Creates a new puzzle under an existing game type.
     * @param gameTypeId The ID of the game type for the new puzzle.
     * @param initialState The initial state of the puzzle, encoded off-chain.
     * @param finalState The final state of the puzzle, encoded off-chain (if required).
     */
    function createPuzzle(
        uint256 gameTypeId,
        bytes memory initialState,
        bytes memory finalState
    ) external {
        require(puzzleGameTypes[gameTypeId].exists, "Invalid game type");

        if (puzzleGameTypes[gameTypeId].isFinalStateRequired) {
            require(finalState.length > 0, "Final state is required");
        }
        require(initialState.length > 0, "Initial state is required");

        puzzleCounter++;
        puzzles[puzzleCounter] = Puzzle({
            id: puzzleCounter,
            gameTypeId: gameTypeId,
            creator: msg.sender,
            initialState: initialState,
            finalState: finalState
        });

        emit PuzzleCreated(puzzleCounter, gameTypeId, msg.sender, initialState, finalState);
    }

    // Function to get all puzzles created
    function getAllPuzzles() external view returns (Puzzle[] memory) {
        Puzzle[] memory allPuzzles = new Puzzle[](puzzleCounter);
        for (uint256 i = 1; i <= puzzleCounter; i++) {
            allPuzzles[i - 1] = puzzles[i];
        }
        return allPuzzles;
    }
}
