// src/algorithms/dijkstra.js

export const dijkstra = (grid, startNode, endNode) => {
    const visitedNodesInOrder = [];
    const unvisitedNodes = getAllNodes(grid);
    startNode.distance = 0;

    while (unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        
        if (closestNode.isWall) continue; // Skip walls
        if (closestNode.distance === Infinity) return visitedNodesInOrder; // All reachable nodes visited

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        
        if (closestNode === endNode) return visitedNodesInOrder;

        updateUnvisitedNeighbors(closestNode, grid);
    }
};

const getAllNodes = (grid) => {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
};

const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
};

const updateUnvisitedNeighbors = (node, grid) => {
    const { row, col } = node;
    const neighbors = getNeighbors(node, grid);

    for (const neighbor of neighbors) {
        if (!neighbor.isVisited && !neighbor.isWall) {
            neighbor.distance = node.distance + 1;
            neighbor.previousNode = node; // Save previous node for path tracing
        }
    }
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
