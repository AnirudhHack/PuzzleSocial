const ethers = require('ethers');

function encodeSlidingPuzzle(grid, emptyTile) {
    // Get the length of the grid

    // Flatten the grid into a 1D array
    const flattenedGrid = grid.flat();

    // Encode the length and the flattened grid into bytes
    const encoded = ethers.utils.defaultAbiCoder.encode(['uint256', 'uint256[]'], [emptyTile, flattenedGrid]);

    return encoded;
}

function decodeSlidingPuzzle(encodedData) {
    // Decode the encoded data
    let [emptyTile, flattenedGrid] = ethers.utils.defaultAbiCoder.decode(['uint256', 'uint256[]'], encodedData);
    
    // length=Math.sqrt(flattenedGrid.length)
    // Convert BigNumbers to integers
    // const grid = [];

    // for (let i = 0; i < flattenedGrid.length; i+=length) {
    //   let list =[]
    //   for (let j = i; j < i+length; j++) {
    //     list.push(flattenedGrid[j].toNumber())
    //   }
    //   grid.push(list)
    // }

    return { emptyTile:emptyTile.toNumber(), grid: flattenedGrid.map(item => item.toNumber()) };
}

// const end = encodeSlidingPuzzle([[1, 3, 4], [6,9,5], [7,8,2]], 9)
// console.log(end)
// const decode =decodeSlidingPuzzle(end)
// console.log(decode.emptyTile.toString(), decode.grid)

module.exports ={
    encodeSlidingPuzzle,
    decodeSlidingPuzzle
}