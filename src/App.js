import React, {  useState} from 'react';
import './App.css';
import { CryptoComponent } from './Crypto.component';
import { DescriptionComponent } from './Description.component';

function App() {
  const [currentHashingMethod, setCurrentHashingMethod] = useState('SHA256');

  return (
    <div className="App">
      <header className="App-header">
         <p>Cripto app!</p>
      </header>

      <body>
        <div className='bodyContainer'>
          <CryptoComponent onHashingMethodChanged={setCurrentHashingMethod}/>
          <DescriptionComponent currentHashingMethod={currentHashingMethod}/>
        </div>
      </body>

      <footer>
        <p>footer</p>
      </footer>
    </div>
  );
}

export default App;
