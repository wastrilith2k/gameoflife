import React from 'react';
import classnames from 'classnames';

import '../stylesheets/grid.css';

export default (props) => {

    let rows = props.cells.map((row, ridx) => {
        let cells = row.map((cell, cidx) => {
            console.log(`Entered ${ridx}, ${cidx}`);
            return (
                <span 
                    key={`cell-${ridx}-${cidx}`}
                    className={classnames({
                        "cell":true,
                        "row-ending": cidx == (row.length - 1),
                        "live":props.cells[ridx][cidx],
                        "dead":!props.cells[ridx][cidx]
                    })}
                ></span>
            )
        });

        return (
            <span 
                className={classnames({
                    "row":true
                })}
            >
                {cells}
            </span>
        )
    });

    return (
        <span
            className={classnames({
                "grid":true
            })}
        >
            {rows}
        </span>
    );
};