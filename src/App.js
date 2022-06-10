import axios from "axios";
import { useState } from "react";
import './App.css';

function App() {

  const [mnemonic, setMnemonic] = useState('니모닉을 생성하세요');
  const [pw, setPw] = useState('');
  const [address, setAddress] = useState('');
  const config = { 
    headers: { 'Content-type': 'application/json'}
  };

  const printMnemonic = ()=>{
    axios.post("http://localhost:3001/wallet/createMnemonic",{}, config)
    .then((res) => {
      setMnemonic(res.data.mnemonic);
    })
  }

  const createKeyStore = () =>{
    axios.post("http://localhost:3001/wallet/newWallet",{
      password: pw,
      mnemonic: mnemonic
    }, config)
    .then((res) => {
      console.log(res.data);
      setAddress(res.data.address);
    })
  }

  const pwChange = (e) =>{
    setPw(e.target.value);
  }
  const MnChange = (e) =>{
    setPw(e.target.value);
  }

  return (
    <div className="app">
      <div className="create">
        <div className="printMn">
          {mnemonic}
        </div>
        <button className="MnBtn" onClick={printMnemonic}>니모닉 생성</button>
      </div>
      <div className="keyStore">
        <div>
          pw:
          <input onChange={pwChange} className="pw"></input>
        </div>
        <div>
          mnemonic:
          <input onChange={MnChange} className="mn" value={mnemonic} ></input>
        </div>
        <button className="KeyBtn" onClick={createKeyStore}>keyStore 생성</button>
        <div className="address">
          생성된 주소                   
        </div>
        <div className="address">
            {address}
        </div> 
      </div>     
    </div>
  );
}

export default App;
