import React from 'react';
import Grid from './Grid.jsx';

class App extends React.Component {

    constructor(props) {
        super(props);

        // Ensure size is a numer and set it
        this.size = !isNaN(props.size) ? props.size : 20;

        let cells = [];
        for (let r = 0; r < this.size; r++) {
            cells[r] = [];
            for (let c = 0; c < this.size; c++) {
                cells[r][c] = this.getRandomIntInclusive(0,1) === 1 ? true : false;
            }
        }

        // Update state with the array of cells
        this.state = {
            cells
        }        
    }

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }

    render() {
        return (
            <Grid 
                cells={this.state.cells} 
            />
        )
    }
}

export default App;