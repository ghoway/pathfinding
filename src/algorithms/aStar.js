// src/algorithms/aStar.js

export const aStar = (grid, startNode, endNode) => {
    const openSet = [];
    const closedSet = [];
    openSet.push(startNode);
    startNode.gScore = 0;
    startNode.fScore = heuristic(startNode, endNode);

    while (openSet.length) {
        let currentNode = openSet.reduce((prev, curr) => (prev.fScore < curr.fScore ? prev : curr));

        if (currentNode === endNode) return reconstructPath(currentNode);

        openSet.splice(openSet.indexOf(currentNode), 1);
        closedSet.push(currentNode);

        const neighbors = getNeighbors(currentNode, grid);
        for (const neighbor of neighbors) {
            if (closedSet.includes(neighbor) || neighbor.isWall) continue;

            const tentativeGScore = currentNode.gScore + 1;
            if (!openSet.includes(neighbor)) openSet.push(neighbor);
            else if (tentativeGScore >= neighbor.gScore) continue;

            neighbor.previousNode = currentNode;
            neighbor.gScore = tentativeGScore;
            neighbor.fScore = neighbor.gScore + heuristic(neighbor, endNode);
        }
    }
    return []; // No path found
};

const heuristic = (nodeA, nodeB) => {
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
};

const reconstructPath = (currentNode) => {
    const path = [];
    while (currentNode) {
        path.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return path;
};

const getNeighbors = (node, grid) => {
    const neighbors = [];
    const { row, col } = node;

    if (row > 0) neighbors.push(grid[row - 1][col]); // Up
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Down
    if (col > 0) neighbors.push(grid[row][col - 1]); // Left
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right

    return neighbors;
};
