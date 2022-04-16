import React, { useState} from 'react';
import cryptoJS from 'crypto-js'

import sha256 from 'crypto-js/sha256';
import sha512 from 'crypto-js/sha512';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';




function CryptoComponent({ onHashingMethodChanged}){
    const [ userInput, setUserInput] = useState('');
    const [hashingMethod, setHashingMethod] = useState('SHA256');
    const [privateKey, setPrivateKey] = useState('mi llave privada');
    const [result, setResult] = useState('');
    const [decrypted, setDecrypted] = useState('');

   

    function setSelectedHashingMethod(e){ 
        setHashingMethod(e.target.value);
        onHashingMethodChanged(e.target.value);

    }

    function hashUserInput(){
        let hashDigest;
        let encrypted = '';
        switch ( hashingMethod){
            case 'SHA256':
                hashDigest = sha256(userInput);
                encrypted = Base64.stringify(hmacSHA256(hashDigest, privateKey));
                break;
            case 'SHA512':
                hashDigest = sha512(userInput);
                encrypted = Base64.stringify(hmacSHA512(hashDigest, privateKey));
                break;
            case 'AES': 
                encrypted = cryptoJS.AES.encrypt(userInput, privateKey).toString();
                break;
        }

        setResult(encrypted)
        

    }

    function decryptuserInput(){
        let bytes;
        let decrypted = '';
        switch ( hashingMethod){
            case 'AES': 
                bytes = cryptoJS.AES.decrypt(result, privateKey);
                decrypted = bytes.toString(cryptoJS.enc.Utf8);
                break;
        }
        console.log("huh", decrypted)

        setDecrypted(decrypted)
         
    }
    return(
        <div className='CriptoContainer'>
            
            {/**User input */}
            <div>
                <p>Ingrese un texto a encriptar</p>
                <input placeholder='escriba un texto a encriptar'
                    onChange={(e)=>{
                        setUserInput(e.target.value)
                    }}
                ></input>
            </div>

            <div>
                <p>Seleccione una llave privada</p>
                <input onChange={(e)=>{
                    setPrivateKey(e.target.value)
                }} 
                placeholder={privateKey}></input>
            </div>
            {/**selecciona el typo de encrypt */}
            <div className='dropdown'>
            <select name="hashing" id="hashing" onChange={setSelectedHashingMethod}>
                <option value="SHA256">SHA256</option>
                <option value="SHA512">SHA512</option>
                <option value="AES">AES</option> 
            </select>

            <button onClick={hashUserInput}>encriptar!</button>
            {hashingMethod == 'AES' &&  <button onClick={decryptuserInput}>desencriptar!</button>}
            

            </div>
                {/**resultados */}
                {result.length > 0 && <p>{result}</p>}
                {decrypted.length > 0 && hashingMethod === 'AES' && <p>{decrypted}</p>}
            
        </div>
    )
}


export { CryptoComponent};