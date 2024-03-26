import React from 'react';
import { Button } from 'react-bootstrap';
import {useNavigate} from "react-router-dom"


const Success = () => {
  const navigate = useNavigate()
  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">Payment Successful</h5>
          <p className="card-text">Your payment was successful. Thank you!</p>
          <Button variant="primary" onClick={()=>navigate("/")}>Back to Home</Button>
        </div>
      </div>
    </div>
  );
}

export default Success;