import React from 'react';
import './App.css';
import Main from './components/Main';
import { BrowserRouter } from "react-router-dom";


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Main />
            </div>
        </BrowserRouter>
    );
}

export default App;
