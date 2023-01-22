const canvas = document.getElementById("canvas");
const Board = {
    context: canvas.getContext("2d"),
    width: 1600,
    height: 900
}

console.log(Board);

function board(ctx, margin, squares) {
    let size = 0
    if (Board.width > Board.height) {
        size = Board.height-margin
    } else {
        size = Board.width-margin
    }

    let x = (Board.width-size)/2
    let y = (Board.height-size)/2
    
    let border = 10
    ctx.fillStyle = 'black'
    ctx.fillRect(x-(border/2), y-(border/2), size+border, size+border)
    ctx.fillRect(x, y, size, size)

    let sq = size/squares
    ctx.fillStyle = 'white'
    for (let i = 0; i < squares; ++i) {
        let a = '', b = ''
        if (i%2===0) {
            a = 'white', b = 'black'
        } else {
            a = 'black', b = 'white'
        }

        for (let j = 0; j < squares; ++j) {
            if (j%2===0) {
                ctx.fillStyle = a
            } else {
                ctx.fillStyle = b
            }
            ctx.fillRect(x+j*sq, y+i*sq, sq, sq)
        }
    }

    return {size: sq, x, y, squares}
}

function queen(ctx, sq, originX, originY, numX, numY, color) {
    let x = calcXY(originX, sq, numX)
    let y = calcXY(originY, sq, numY)

    ctx.fillStyle = color
    ctx.lineWidth = 5
    ctx.strokeStyle = findColor(numX, numY, color)

    ctx.beginPath()
    ctx.moveTo(x+sq/4, y+sq/4)
    ctx.lineTo(x+sq*(3/8), y+sq/2)
    ctx.lineTo(x+sq/2, y+sq/4)
    ctx.lineTo(x+sq*(5/8), y+sq/2)
    ctx.lineTo(x+sq*(3/4), y+sq/4)
    ctx.lineTo(x+sq*(3/4), y+sq*(3/4))
    ctx.lineTo(x+sq/4, y+sq*(3/4))
    ctx.closePath()
    ctx.stroke()
    ctx.fill()
}

function calcXY(origin, sq, n) {
    return origin+sq*n
}

function findColor(x, y, color) {
    let sqColor = ''
    if ((x+y)%2===0) {
        sqColor = 'white'
    } else {
        sqColor = 'black'
    }

    let stroke = ''
    if (color === 'black' && sqColor === 'black') {
        stroke = 'white'
    } else if (color === 'black' && sqColor === 'white') {
        stroke = 'black'
    } else if (color === 'white' && sqColor === 'white') {
        stroke = 'black'
    } else {
        stroke = 'white'
    }

    return stroke
}

function findSolution(tiles) {
    let results = []
    for (let i = 0; i < tiles.length; ++i) {
        let coords = canPlace(tiles)
        if (coords !== undefined) {
            tiles[coords[0]][coords[1]] = 1
            results.push(coords)
        }
    }
    return results
}

function canPlace(tiles) {
    for (let i = 0; i < tiles.length; ++i) {
        for (let j = 0; j < tiles[i].length; ++j) {
            if (tiles[i][j] === 0) {
                if (checkTiles(tiles, i, j)) {
                    return [i, j]
                }
            }
        }
    }
}

function checkTiles(tiles, i, j) {
    for (let x = 0; x < tiles.length; ++x) {
        // if tile in row is empty
        if (tiles[i][x] !== 0) {
            // if it isnt empty
            return false
        }
    }
    for (let y = 0; y < tiles.length; ++y) {
        if (tiles[y][j] !== 0) {
            return false
        }
    }
    if (findDiagonal(tiles, i, j)) {
        return true
    } else {
        return false
    }
}

function findDiagonal(tiles, i, j) {
    // upper left
    let value = Math.min(i, j)
    for (let x = 0; x < value+1; ++x) {
        if (tiles[i-x][j-x] !== 0) {
            return false
        }
    }
    // lower right
    value = Math.min(tiles.length-i, tiles.length-j)
    for (let y = 0; y < value; ++y) {
        if (tiles[i+y][j+y] !== 0) {
            return false
        }
    }
    // lower left
    value = Math.min(tiles.length-i, j)
    for (let a = 0; a < value+1; ++a) {
        if (tiles[i+a][j-a] !== 0) {
            return false
        }
    }
    // upper right
    value = Math.min(i, tiles.length-j)
    for (let b = 0; b < value+1; ++b) {
        if (tiles[i-b][j+b] !== 0) {
            return false
        }
    }
    return true
}

function placeQueens(ctx, sq, originX, originY, coords, color) {
    for (let i = 0; i < coords.length; ++i) {
        queen(ctx, sq, originX, originY, coords[i][1], coords[i][0], color)
    }
}

function draw() {
    const canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        let results = board(ctx, 100, 8)
        console.log(results)
        
        let tiles = []
        for (let i = 0; i < results.squares; ++i) {
            let arr = []
            for (let j = 0; j < results.squares; ++j) {
                arr.push(0)
            }
            tiles.push(arr)
        }
        console.log(tiles)
        let coords = findSolution(tiles)
        console.log(coords)
        placeQueens(ctx, results.size, results.x, results.y, coords, 'white')
    }
  }

draw()