import React from 'react';
import Grid from './Grid.jsx';

class App extends React.Component {

    constructor(props) {
        super(props);

        // Ensure size is a numer and set it
        this.size = !isNaN(props.size) ? props.size : 20;
        this.state = {
            cells:[], 
            generation:0,
            liveNeighbors:[]
        }
    }

    componentDidMount() {
        this.initialize();
    }

    initialize() {

        let cells = [],
        liveNeighbors = [];

        for (let r = 0; r < this.size; r++) {
            cells[r] = [];
            liveNeighbors[r] = [];
            for (let c = 0; c < this.size; c++) {
                //cells[r][c] = false;
                cells[r][c] = this.getRandomIntInclusive(0,1) === 1 ? true : false;
                liveNeighbors[r][c] = 0;
            }
        }

        cells[9][10] = true;
        cells[10][9] = true;
        cells[10][10] = true;
        cells[10][11] = true;

        cells[9][30] = true;
        cells[10][29] = true;
        cells[10][30] = true;
        cells[10][31] = true;

        cells[29][10] = true;
        cells[30][9] = true;
        cells[30][10] = true;
        cells[30][11] = true;

        cells[29][30] = true;
        cells[30][29] = true;
        cells[30][30] = true;
        cells[30][31] = true;

        // Update state with the array of cells
        this.setState({
            cells,
            liveNeighbors,
            generation:0
        })
    }

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }

    start = () => {
        this.intervalLoop = setInterval(this.updateCells, this.props.timeout);
    }

    stop = () => {
        clearInterval(this.intervalLoop);
    }

    reset = () => {
        this.stop();
        this.initialize();
    }

    updateCells = () => {
        let newCells = [];
        for (let r = 0; r < this.size; r++) {
            newCells[r] = [];
            for (let c = 0; c < this.size; c++) {
                // Set neighboring cell states
                let live = 0; // No reason to track dead cells
                let cell = this.state.cells[r][c];
                // Logic of the current snapshot in time
                for (let R = r - 1; R <= r + 1; R++) {
                    // Don't check any cells outside the boundary
                    if (R >= 0 && R < this.size) {                        
                        for (let C = c - 1; C <= c + 1; C++) {
                            // Don't check any cells outside the boundary
                            if (C >= 0 && C < this.size) {
                                // The cell contains a boolean so we can check it directly
                                if (R !== r || C !== c) {
                                    if (this.state.cells[R][C]) live++;
                                }
                            }
                        }
                    }
                }

                // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
                // Any live cell with more than three live neighbours dies, as if by overpopulation.
                // Any live cell with two or three live neighbours lives on to the next generation.
                if ((live < 2 || live > 3) && cell){
                    cell = false;
                }
                // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                else if (live === 3 && !cell) {
                    cell = true;
                }

                //if (this.state.cells[r][c] !== cell) console.log(`Setting ${r},${c} from ${this.state.cells[r][c]} to ${cell} with a live neighbor count of ${live}`);

                newCells[r][c] = cell;
            }
        }

        const newGen = this.state.generation + 1;
        this.setState({
            cells: newCells,
            generation: newGen
        });
    }

    render() {
        return (
            <div>
                <Grid 
                    cells={this.state.cells} 
                />
                <div>
                    <button onClick={this.start}>Start</button>
                    <button onClick={this.stop}>Stop</button>
                    <button onClick={this.reset}>Reset</button>
                </div>
                <div>
                    Generation: {this.state.generation}
                </div>
            </div>
        )
    }
}

export default App;