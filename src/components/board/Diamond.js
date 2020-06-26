import React from 'react';

// Diamond Component for building 3D game board
const Diamond = (props) => {
    return (
        <button
            className="parallelogram"
            onClick={props.onClick}>
                {props.value}
        </button>
    );
};

export default Diamond;