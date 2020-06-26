import React from 'react';

// Square Component for building 2D game board
const Square = (props) => {
    return (
        <button
            className="square"
            onClick={props.onClick}>
                {props.value}
        </button>
    );
};

export default Square;