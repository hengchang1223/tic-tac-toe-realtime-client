import React, {Component} from 'react';
import Square from './Square';
import Diamond from './Diamond';
import './Board.css';

class Board extends Component {
  
    // render component for rendering square (2D)
    renderSquare(i) {
      return (
        <Square 
          key={i}
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />);
    }
  
  
    // render component for rendering diamond (3D)
    renderDiamond(i) {
      return (
        <Diamond
          key={i}
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />);
    }
  
    
    render() {
        // render according to specific size and dimention
        const size = this.props.size;
        const dim = this.props.dimention;
        
        if (dim === 2) {
            return (
                <div className="game-board">
                    {[...Array(size)].map( (_, i) => (
                        <div key={i} className="board-row">
                            {[...Array(size)].map( (_, j) => this.renderSquare(size*i+j))}
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <div className="game-board">
                    {[...Array(size)].map( (_, i) => (
                        <div key={i}>
                            {[...Array(size)].map( (_, j) => (
                                <div className="board-row" key={i*size+j} style={{ marginLeft: 36*(size-1-j)+'px'}}>
                                    {[...Array(size)].map( (_, k) => this.renderDiamond(size*size*i+size*j+k))}
                                </div>
                            ))}
                            <br></br>
                        </div>
                    ))}
                </div>
            );
        }
    }
}

export default Board;