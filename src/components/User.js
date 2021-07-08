import React from 'react';
import { public2address } from './../utils'

const User = (props) => {
    const submitData = () => {
      alert(
        'User has checked box: ' + props.checkBox +
        '\n\nPublic Key is valid: ' + props.publicKeyIsValid +
        '\n\nLength of Public Key is: ' + Buffer.from(props.publicKey,'hex').length +
        '\n\nServer-side generated submission id: ....' +
        `\n\nISO Timestamp: ${new Date().toISOString()}`
      )
    }

    return (
        <div className="container" style={{ backgroundColor: !props.checkBox ? `rgba(255, 0, 0, .25)` :  `rgba(0, 255, 0, .3)`}}>
          <p>Please provide your <b>Ethereum Public Key</b>, any burned MAID.omni will be minted to the corresponding ETH Address.</p> 
          <input type="text" placeholder="Your Public Key" disabled={!props.checkBox ? true : false} id="publickey" onChange={(e) => props.setPublicKey(e.target.value)}/>
          <br/>
          <br/>
          <p><b>The public key </b> - {props.publicKey.length} chars, only accepts 128 or 130 (with '04'-prefix) hex-format, and seems to be <b>{props.publicKeyIsValid ? 'valid' : 'invalid'}</b>:</p>
          <code>{props.publicKey.toString('hex')}</code>
          <br/>
          <br/>
          <b>Please verify that the generated address from the public key and your account address are the same!</b>
          <br/>
          <input type='text' disabled={!props.checkBox ? true : false} id='account' placeholder='Your Account Address, starts with 0x...' onChange={(e)=> props.setAccountAddress(e.target.value)}/>
          <p>Original Account ETH-addres: <b>{props.accountAddress ? props.accountAddress.toLowerCase() : 'Specify in text field'}</b></p>
          <p>Generated ETH-addres from Public Key: <b>{public2address(props.publicKey)}</b> | { public2address(props.publicKey) === props.accountAddress.toLowerCase().trim() ? <b>OK</b> : <b style={{color: 'red'}}>DIFFERENT</b>}</p>
          <p><b>The XOR'ed-PublicKey generated from the user provided Public Key is:</b></p>
          <code>{props.xorPublicKey}</code>
          <p><b>The Burn Address obtained from the XOR Public Key is:</b></p>
          <code>{props.burnAddress}</code>
          <p><i>**It seems only 128 chars (without 04 prefix) will resolve to correct burn address when providing the public key.**</i></p>
          <input type="submit" disabled={!props.checkBox ? true : false} onClick={() => submitData()} value='Submit'/>
        </div>
    )
}

export default User
