import './App.css';
import { publicToAddress, isValidPublic, privateToPublic, isValidPrivate } from 'ethereumjs-util';
import { useState } from 'react';

function App() {
  const [publicKey, setPublicKey] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const [accountAddress, setAccountAddress] = useState('')
  const [checkBox, setCheckBox] = useState(false)
  const [publicKeyIsValid, setPublicKeyIsValid] = useState(false)
  const [privateKeyIsValid, setPrivateKeyIsValid] = useState(false)

  const submitData = () => {
    alert(
      'User has checked box: ' + checkBox +
      '\n\nPublic Key is valid: ' + publicKeyIsValid +
      '\n\nLength of Public Key is: ' + Buffer.from(publicKey,'hex').length +
      '\n\nServer-side generated submission id: ....' +
      `\n\nISO Timestamp: ${new Date().toISOString()}`
    )
  }

  const onChangePublicKey = (e) => {
    setPublicKey(e.target.value)
    try {
      const buffer = Buffer.from(e.target.value,'hex')
      const isValid = isValidPublic(buffer)
      setPublicKeyIsValid(isValid)
    } catch {
      //isValidPublic error
      setPublicKeyIsValid(false)
    }
  }

  const onChangePrivateKey = (e) => {
    setPrivateKey(e.target.value)
    try {
      const buffer = Buffer.from(e.target.value,'hex')
      const isValid = isValidPrivate(buffer)
      setPrivateKeyIsValid(isValid)
    } catch {
      //isValidPublic error
      setPrivateKeyIsValid(false)
    }
  }

  const onChangeAccount = (e) => {
    setAccountAddress(e.target.value)
  }

  const public2address = () => {
    try {
      return '0x'+publicToAddress(Buffer.from(publicKey,'hex')).toString('hex')
    } catch(e) {
      // console.log(e)
      return 'Invalid'
    }
  }

  const private2public = () => {
    try {
      return privateToPublic(Buffer.from(privateKey,'hex')).toString('hex')
    } catch(e) {
      // console.log(e)
      return 'Invalid'
    }
  }

  return (
    <div className="App">
      <div className="Left">
        {/* Left */}
      </div>
      <div className="Middle">
        <div className="Title">
          <h1>MAID to ERC20 Conversion - Demo Site</h1>
        </div>
        <div className="Info">
          <h3>Minting MAID.erc20 to your ETH address requires you to provide us with your <b>Ethereum Public Key</b></h3>
          <p>Note that your Ethereum Wallet Address (starting with 0x...) is <b>different</b> from the <b>Ethereum Public Key</b> and looks like this:</p>
          <code>048e66b3e549818ea2cb354fb70749f6c8de8fa484f7530fc447d5fe80a1c424e4f5ae648d648c980ae7095d1efad87161d83886ca4b6c498ac22a93da5099014a</code>
          <h3>ONLY PROCEED WHEN YOU AGREE/CONFIRMED THE FOLLOWING POINTS:</h3>
          <ol>
            <li>I am the owner of the address and provided public key and aware that it is my responsibility to provide and check everything I submit.</li>
            <li>I have stored the corresponding secret key to this address somewhere safe so I can access my funds.</li>
            <li>I have understood that any future burned MAID.omni will also be minted to this address.</li>
            <li>I have understood that the minting procedure can take some time due to verification/validation and does not immediately show up in my Ethereum Account.</li>
            <li>I have understood that I should only burn MAID after submitting this successfully (?)</li>
          </ol>
          <b style={{color: !checkBox ? 'red' : 'green' }}>I agree to all the above points by checking this box: <span><input type="checkbox" onClick={() => setCheckBox(!checkBox)}/></span></b>
        </div>
        <div className="User" style={{ backgroundColor: !checkBox ? 'lightsalmon' : 'lightgreen'}}>
          <p>Please provide your <b>Ethereum Public Key</b>, any burned MAID.omni will be minted to the corresponding ETH Address.</p> 
          <input type="text" placeholder="Your Public Key" disabled={!checkBox ? true : false} id="publickey" onChange={(e) => onChangePublicKey(e)}/>
          <br/>
          <br/>
          <p>The public key ({publicKey.length} chars, requires 128 and to be in hex-format) you supplied seems to be <b>{publicKeyIsValid ? 'valid' : 'invalid'}</b>:</p>
          <code>{publicKey.toString('hex')}</code>
          <br/>
          <br/>
          <br/>
          <b>Please verify that the generated address from the public key and your account address are the same!</b>
          <br/>
          <input type='text' disabled={!checkBox ? true : false} id='account' placeholder='Your Account Address, starts with 0x...' onChange={(e)=> onChangeAccount(e)}/>
          <p>Original Account ETH-addres: <b>{accountAddress.toLowerCase()}</b></p>
          <p>Generated ETH-addres from Public Key: <b>{public2address()}</b></p>
          <p>The generated address and user-supplied address are the same: <b>{(public2address() === accountAddress.toLowerCase()).toString()}</b></p>
          <input type="submit" disabled={!checkBox ? true : false} onClick={() => submitData()} value='Submit'/>
        </div>
        <div className='Dev'>
          <h3 style={{color: 'darkred'}}>*This section is for development*</h3>
          <h5>Users might need tool to convert private key to public key (MetaMask does not provide public key, and only to see if there has been transaction on ETH-account.</h5>
          <p><b>Private2Public Key</b> - Total Chars of Input: <b>{privateKey.length}</b> and isValid: <b>{privateKeyIsValid.toString()}</b></p>
          <input type='text' placeholder='Private Key' id='privatekey' onChange={(e) => onChangePrivateKey(e)} />
          <p><b>The corresponding Public Key from this Private Key is:</b></p>
          <code id="private2public">{private2public()}</code>
          <br/>
          <br/>
          <div className='Metamask'>
            <h3>Example Account from MetaMask - DO NOT USE FOR REAL APPLICATIONS</h3>
            <p><b>Public Address:</b></p><code>0x94C02E5d103c65A37aA1bFD28030245C0C5cBEEd</code>
            <p><b>Private key:</b></p><code>ea485a053933090c1242bcedfcea97c88dcf3c7f5a0f18cd8663622e999c50b5</code>
          </div>
        </div>
      </div>
      <div className="Right">
        {/* Right */}
      </div>
    </div>
  );
}

export default App;
