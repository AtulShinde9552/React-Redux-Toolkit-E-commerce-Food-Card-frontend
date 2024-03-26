import React from 'react';
import { Button } from 'react-bootstrap';
import {useNavigate} from "react-router-dom"

const Cancel = () => {
  const navigate = useNavigate()
  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">Payment Cancelled</h5>
          <p className="card-text">Your payment was cancelled.</p>
          <Button variant="primary" onClick={()=>navigate("/")}>Back to Home</Button>
        </div>
      </div>
    </div>
  );
}

export default Cancel;
