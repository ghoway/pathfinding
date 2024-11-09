import React from 'react';

const Controls = ({ setAlgorithm, startSearch, resetGrid, generateWalls }) => (
    <div className="controls">
        <select onChange={(e) => setAlgorithm(e.target.value)}>
            <option value="Dijkstra">Dijkstra</option>
            <option value="A*">A*</option>
        </select>
        <button onClick={startSearch}>Start</button>
        <button onClick={resetGrid}>Reset</button>
        <button onClick={generateWalls}>Generate Walls</button>
    </div>
);

export default Controls;
