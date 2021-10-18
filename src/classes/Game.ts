/* tslint:disable:max-classes-per-file */
type Column = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
type Row = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
type PieceColor = 'B' | 'W'

class Position {
    constructor(private col: Column, private row: Row) {
    }

    distanceFrom(position: Position) {
        return {
            x: position.col.charCodeAt(0) - this.col.charCodeAt(0),
            y: position.row - this.row
        }
    }
}

abstract class Piece {
    protected position: Position

    // readonly is like final in Java. Once it gets assigned its value cannot be changed
    constructor(private readonly color: PieceColor, col: Column, row: Row) {
        this.position = new Position(col, row);
    }

    abstract canMoveTo(newPosition: Position): boolean
}

class Queen extends Piece {
    canMoveTo(newPosition: Position) {
        return true
    }
}

class King extends Piece {
    canMoveTo(newPosition: Position) {
        return true
    }
}

class ChessBoard {

    private pieces: Piece[]

    private constructor() {
        this.pieces = [
            new Queen('B', 'C', 1),
            new King('B', 'C', 1)
        ]
    }
}

class Game {
    static startGame() {
        const game = new Game();
    }
}
