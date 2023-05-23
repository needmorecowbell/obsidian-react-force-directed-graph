import './App.css';
import GraphView from './components/GraphView';
import React from 'react';

export function genRandomTree(N = 300, reverse = false) {
  return {
    nodes: [...Array(N).keys()].map(i => ({ id: i })),
      links: [...Array(N).keys()]
    .filter(id => id)
    .map(id => ({
      [reverse ? 'target' : 'source']: id,
      [reverse ? 'source' : 'target']: Math.round(Math.random() * (id-1))
    }))
  };
}

function App() {

  return (
    <div className="App">
        <GraphView/>
    </div>
  );
}

export default App;
