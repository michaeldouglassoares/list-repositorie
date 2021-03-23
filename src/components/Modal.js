import React from 'react';

export default function Modal({ message, setViewModal })
{

    return (
        <div className="all-modal">
            <div className="box-modal w-500 ">
                <div className="row center">                  
                </div>
                <div className="title-modal">
                    {message}
                </div>
                <div className="line-gray m-20"></div>
                <div className="row center">
                    <button className="bt-close-link close-modal m-40" onClick={() => setViewModal(false)}>Fechar</button>
                </div>
            </div>
        </div>
    )
}