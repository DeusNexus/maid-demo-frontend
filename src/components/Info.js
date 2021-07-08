import React from 'react'

const Info = (props) => {
    return (
        <div className="container">
            <h3>Minting MAID.erc20 to your ETH address requires you to provide us with your <b>Ethereum Public Key</b></h3>
            <p>Note that your Ethereum Wallet Address (starting with 0x...) is <b>different</b> from the <b>Ethereum Public Key</b></p>
            <p><b>Prefixed with 04 - 130 characters:</b></p>
            <code><b>04</b>6a113ecf69fa583603dab413ab8360a366c700278a1edcbfa31177f837c62e8bbeb577944786906d66b12799cc90a189072aef64cfdbcf5efd6d39f279ffe132</code>
            <p><b>No prefix - 128 characters:</b></p>
            <code>6a113ecf69fa583603dab413ab8360a366c700278a1edcbfa31177f837c62e8bbeb577944786906d66b12799cc90a189072aef64cfdbcf5efd6d39f279ffe132</code>
            <h3>ONLY PROCEED WHEN YOU AGREE/CONFIRMED THE FOLLOWING POINTS:</h3>
            <ol>
            <li>I am the owner of the address and provided public key and aware that it is my responsibility to provide and check everything I submit.</li>
            <li>I have stored the corresponding secret key to this address somewhere safe so I can access my funds.</li>
            <li>I have understood that any future burned MAID.omni will also be minted to this address.</li>
            <li>I have understood that the minting procedure can take some time due to verification/validation and does not immediately show up in my Ethereum Account.</li>
            <li>I have understood that I should only burn MAID after submitting this successfully (?)</li>
            </ol>
            <b style={{color: !props.checkBox ? 'red' : 'green' }}>I agree to all the above points by checking this box: <span><input type="checkbox" onClick={() => props.setCheckBox(!props.checkBox)}/></span></b>
        </div>
    )
}

export default Info
