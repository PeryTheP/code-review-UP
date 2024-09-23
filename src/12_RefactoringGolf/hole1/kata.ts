

export class Game {
  private _lastSymbol = ' ';
  private _board: Board = new Board();
  private emptySlot= ' ';
  private player0 = '0';

  private  firstLine = 0;
  private  secondLine = 1;
  private  thirdLine = 2;
  private  firstColumn = 0;
  private  secondColumn = 1;
  private  thirdColumn = 2;

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == this.emptySlot) {
      if (player == this.player0) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol != this.emptySlot) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    if (this.isFirstRowFull() && this.isFirstRowFullWithSameSymbol()) {
      return this._board.TileAt(this.firstLine, this.firstColumn)!.Symbol;
    }

    if (this.isSecondRowFull() && this.isSecondRowFullWithSameSymbol()) {
      return this._board.TileAt(this.secondLine, this.firstColumn)!.Symbol;
    }

    if (this.isThirdRowFull() && this.isThirdRowFullWithSameSymbol()) {
      return this._board.TileAt(this.thirdLine, this.firstColumn)!.Symbol;
    }

    return this.emptySlot;
  }

  private isFirstRowFull() {
    return (
      this._board.TileAt(this.firstLine, this.firstColumn)!.Symbol != this.emptySlot &&
      this._board.TileAt(this.firstLine, this.secondColumn)!.Symbol != this.emptySlot &&
      this._board.TileAt(this.firstLine, this.thirdColumn)!.Symbol != this.emptySlot
    );
  }

  private isFirstRowFullWithSameSymbol() {
    return (
      this._board.TileAt(this.firstLine, this.firstColumn)!.Symbol == this._board.TileAt(this.firstLine, this.secondColumn)!.Symbol &&
      this._board.TileAt(this.firstLine, this.thirdColumn)!.Symbol == this._board.TileAt(this.firstLine, this.secondColumn)!.Symbol
    );
  }

  private isSecondRowFull() {
    return (
      this._board.TileAt(this.secondLine, this.firstColumn)!.Symbol != this.emptySlot &&
      this._board.TileAt(this.secondLine, this.secondColumn)!.Symbol != this.emptySlot &&
      this._board.TileAt(this.secondLine, this.thirdColumn)!.Symbol != this.emptySlot
    );
  }

  private isSecondRowFullWithSameSymbol() {
    return (
      this._board.TileAt(this.secondLine, this.firstColumn)!.Symbol == this._board.TileAt(this.secondLine, this.secondColumn)!.Symbol &&
      this._board.TileAt(this.secondLine, this.secondColumn)!.Symbol == this._board.TileAt(this.secondLine, this.secondColumn)!.Symbol
    );
  }

  private isThirdRowFull() {
    return (
      this._board.TileAt(this.thirdLine, this.firstColumn)!.Symbol != this.emptySlot &&
      this._board.TileAt(this.thirdLine, this.secondColumn)!.Symbol != this.emptySlot &&
      this._board.TileAt(this.thirdLine, this.thirdColumn)!.Symbol != this.emptySlot
    );
  }

  private isThirdRowFullWithSameSymbol() {
    return (
      this._board.TileAt(this.thirdLine, this.firstColumn)!.Symbol == this._board.TileAt(this.thirdLine, this.secondColumn)!.Symbol &&
      this._board.TileAt(this.thirdLine, this.thirdColumn)!.Symbol == this._board.TileAt(this.thirdLine, this.secondColumn)!.Symbol
    );
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: ' ' };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
