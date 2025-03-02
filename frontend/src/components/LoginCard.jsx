import * as React from 'react';

function LoginCard(props) {
  return (
    <div className="col d-flex">
        <div className="card h-100 w-100">
              <img src={props.imgSrc} className="card-img-top" alt="Card" style={{ height: '400px', width: '100%', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title text-center" style={{ fontSize: '24px', textDecoration: 'none' }}>Login as {props.title}</h5>
              </div>
        </div>
    </div>
  );
}


export default LoginCard;