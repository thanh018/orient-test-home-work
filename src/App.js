import React from 'react';
import Lists from './components/Lists';
import { mockData } from './mockData';
import './App.css';

function App() {
  return (
    <div className="demo-page">
      <div className="lists-wrap">
        <h1 className="title">Total: {mockData.length}</h1>
        <Lists rows={mockData} />
      </div>
    </div>
  );
}

export default App;
