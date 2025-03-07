import * as React from 'react';

function LoginCard(props) {
  return (
    <div className="flex">
        <div className="h-full w-full rounded overflow-hidden shadow-lg bg-green-500">
              <img src={props.imgSrc} className="w-full h-96 object-cover bg-white" alt="Card"  />
              <div className="px-6 py-4">
                <h5 className="font-bold text-2xl text-center" >Login as {props.title}</h5>
              </div>
        </div>
    </div>
  );
}


export default LoginCard;