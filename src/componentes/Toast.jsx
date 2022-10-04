import React, { useState } from "react";
import { Toast, Button } from 'react-bootstrap'

function ToastMessage({ mensaje }) {
   
    const [show, setShow] = useState(false);
 
  return (   
    <div>
    <h2 className="mb-4">
      React JS Desktop Notification with Bootstrap Example
    </h2>
    <Toast
      onClose={() => setShow(false)}
      autohide
      show={show}
      delay={2200}
    >
      <Toast.Header>
        <strong className="mr-auto">React Toast</strong>
        <small>50 mins ago</small>
      </Toast.Header>
      <Toast.Body>Lorem ipsum dolor sit adipiscing elit.</Toast.Body>
    </Toast>
    <Button onClick={() => setShow(true)}>Show Toast</Button>
  </div>
  );
}

export default ToastMessage;
