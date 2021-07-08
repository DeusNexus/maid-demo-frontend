import { publicToAddress, privateToPublic } from 'ethereumjs-util';
import * as bitcoin from 'bitcoinjs-lib';


export const public2address = (_publicKey) => {
    try {
      return '0x'+publicToAddress(Buffer.from(_publicKey,'hex'),true).toString('hex')
    } catch(e) {
      // console.log(e)
      return -1
    }
}

export const public2btc = (_publicKey) => {
    try {
      let pubkey = Buffer.from(_publicKey, 'hex')
      let address = bitcoin.payments.p2pkh({pubkey: pubkey }).address
      console.log('address: ', address)
      //setBurnAddress(address)
      return address
    } catch(e) {
      console.log(e)
      //setBurnAddress('Invalid')
      return -1
    }
  }

export const public2xor = (_servicePubKey,_clientPubKey) => {
    try {
        //XOR service and client public keys and append "0x04"
        function xor(a, b) {
        if (!Buffer.isBuffer(a)) a = Buffer.from(a,'hex')
        if (!Buffer.isBuffer(b)) b = Buffer.from(b,'hex')
        var res = []
        if (a.length > b.length) {
            for (var i = 0; i < b.length; i++) {
                res.push(a[i] ^ b[i])
            }
        } else {
        for (var j = 0; j < a.length; j++) {
            res.push(a[j] ^ b[j])
            }
        }
        return Buffer.from(res,'hex');
        }
        const xor_value = xor(_servicePubKey, _clientPubKey)
        return '04' + xor_value.toString('hex')
        // setXorPublicKey('04' + xor_value.toString('hex'))
        // public2btc('04' + xor_value.toString('hex'))
    } catch(e) {
        // console.log(e)
        return -1
        // setXorPublicKey('Invalid')
        // setBurnAddress('Invalid')
    }
}

export const private2public = (_privateKey) => {
    try {
      return privateToPublic(Buffer.from(_privateKey,'hex')).toString('hex')
    } catch(e) {
      // console.log(e)
      return -1
    }
}

export const privateCompressed2public = (_publicKey) => {
    try {
      //Get last binary digit
      const yHex = Buffer.from(_publicKey,'hex').slice(63,64)
      const lastBinaryDigitY = Number(yHex.toJSON()['data']).toString(2).slice(-1)
      let compressedPublic = ''

      if(lastBinaryDigitY === '0') {
        compressedPublic = '02'+_publicKey.slice(0,32)
      } else if (lastBinaryDigitY === '1') {
        compressedPublic = '03'+_publicKey.slice(0,32)
      }

      return compressedPublic
    } catch(e) {
      // console.log(e)
      return -1
    }
}