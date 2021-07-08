import './App.css';
import { useState, useEffect } from 'react';
import { isValidPublic, isValidPrivate } from 'ethereumjs-util';
import { public2xor, public2btc } from './utils';
import { Info, User, Dev } from './components/index';

function App() {
  const [publicKey, setPublicKey] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const [accountAddress, setAccountAddress] = useState('')
  const [burnAddress, setBurnAddress] = useState('')
  const [xorPublicKey, setXorPublicKey] = useState('')
  const [checkBox, setCheckBox] = useState(false)
  const [publicKeyIsValid, setPublicKeyIsValid] = useState(false)
  const [privateKeyIsValid, setPrivateKeyIsValid] = useState(false)

  const SERVICE_PUBLIC_KEY = 'c12309d1808632779a520fe56d409d044a947c3d368e9495226238a28db47867a0fa784141453bdab329b9f4e2e0511214b2a57a57dfb3ae04711e1cc308fd4b'
  const showDev = true

  useEffect(() => {
    try {
      const isValid = isValidPublic(Buffer.from(publicKey,'hex'), true)
      setPublicKeyIsValid(isValid)
      setXorPublicKey(public2xor(SERVICE_PUBLIC_KEY, publicKey))
    } catch(e) {
      //console.log(e)
      setPublicKeyIsValid(false)
      setXorPublicKey(-1)
    }
  }, [publicKey]);

  useEffect(() => {
    setBurnAddress(public2btc(xorPublicKey))
  }, [xorPublicKey])

  useEffect(() => {
    try {
      const isValid = isValidPrivate(Buffer.from(privateKey,'hex'), true)
      setPrivateKeyIsValid(isValid)
  } catch {
      //console.log(e)
      setPrivateKeyIsValid(false)
  }
  }, [privateKey]);

  return (
    <div className="App">
        <div>
          <div className="Title">
            <h1>MAID to ERC20 Conversion - Demo Site</h1>
          </div>
          <Info setCheckBox={setCheckBox} checkBox={checkBox}/>
          <User 
            checkBox={checkBox}
            publicKey={publicKey} setPublicKey={setPublicKey} 
            accountAddress={accountAddress} setAccountAddress={setAccountAddress} 
            burnAddress={burnAddress} setBurnAddress={setBurnAddress} 
            xorPublicKey={xorPublicKey} setXorPublicKey={setXorPublicKey}
            publicKeyIsValid={publicKeyIsValid}
          />
          {
            showDev ?
            <Dev privateKey={privateKey} setPrivateKey={setPrivateKey} privateKeyIsValid={privateKeyIsValid}/> 
            : <></>
          }
        </div>
    </div>
  );
}

export default App;
