import React from 'react';



function DescriptionComponent({currentHashingMethod}){
    return(
        <div className="DescriptionContainer">
            {currentHashingMethod === 'SHA256' && (
            
            <p>Aquí va el texto de sha 256 <br/>
            descripcion
            
            </p>)}
            {currentHashingMethod === 'SHA512' && (
            <p>Aquí va el texto de sha 512


            </p>
            
            )}
            {currentHashingMethod === 'AES' && (
            
            <p>Aquí va el texto de AES


            </p>
            
            
            )}
            
        </div>
    )
}


export { DescriptionComponent};