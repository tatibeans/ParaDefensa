import React from 'react';
import Spinner from 'react-bootstrap/Spinner'

 const Loading = () => {

    return (
        <div className= "col-12">
           
            <Spinner animation="border" role="status">                
              <span className="visually-hidden"></span> 
             </Spinner>
            
            
        </div>
    );
}

export default Loading;