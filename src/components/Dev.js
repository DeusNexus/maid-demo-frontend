import React from 'react'
import { private2public, privateCompressed2public} from './../utils'

const Dev = (props) => {

    return (
        <div className='container'>
            <h3 style={{color: 'darkred'}}>*This section is for development*</h3>
            <h5>Users might need tool to convert private key to public key (MetaMask does not provide public key, and only to see if there has been transaction on ETH-account.</h5>
            <p><b>Private2Public Key</b> - Total Chars of Input: <b>{props.privateKey.length}</b> and isValid: <b>{''+props.privateKeyIsValid}</b></p>
            <input type='text' placeholder='Private Key' id='privatekey' onChange={(e) => props.setPrivateKey(e.target.value)} />
            <p><b>The corresponding Uncompressed Public Key from this Private Key is:</b></p>
            <code id="private2public">{private2public(props.privateKey) !== -1 ? '04'+private2public(props.privateKey) : 'NULL'}</code>
            {/* <p><b>The corresponding Compressed Public Key from this Private Key is:</b></p>
            <code id="private2public">{privateCompressed2public(props.privateKey)}</code> */}
            <br/>
            <br/>
            <div className='Metamask'>
                <h3>Example Account from MetaMask - DO NOT USE FOR REAL APPLICATIONS</h3>
                <p><b>Public Address:</b></p><code>0x94C02E5d103c65A37aA1bFD28030245C0C5cBEEd</code>
                <p><b>Private key:</b></p><code>ea485a053933090c1242bcedfcea97c88dcf3c7f5a0f18cd8663622e999c50b5</code>
            </div>
        </div>
    )
}

export default Dev
