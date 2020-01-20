import React from 'react';
import './styles/App.css';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
      //<Provider>
          <BrowserRouter>
              <div className="App">
                  <Main />
              </div>
          </BrowserRouter>
      //</Provider>
  );
}

export default App;
