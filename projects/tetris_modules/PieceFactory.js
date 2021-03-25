import { PieceForcast } from "./PieceForcast.js";
import { J, L, T, S, Z, O, I } from "./Pieces.js";

class PieceFactory {
    /**
     * Constructs a PieceFactory.
     * 
     * @param {PieceForcast} - the PieceForecast object, which is to get updates from this factory.
     */
    constructor(forecast) {
        this.forecast = forecast;
        this.next = this._manufacture();
        this.forecast.update(this.next);
    }

    /**
     * Return a random Tetris piece, i.e. one of J, L, T, S, Z, O, and I.
     * 
     * The randomness is produced by Math.random (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
     * 
     * @returns a Piece
     */
    make() {
        let current = this.next;
        this.next = this._manufacture();
        this.forecast.update(this.next);
        return current;
    }


    _manufacture() {
        let pieces = [ J, L, T, S, Z, O, I ];
        return pieces[Math.floor(Math.random() * pieces.length)];
    }
}

export {
    PieceFactory
}
