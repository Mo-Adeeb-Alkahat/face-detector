import React from "react";
import 'tachyons' ;
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import face from './face.png'

const Logo = () => {
    return(
        <div className="ma4 mt0">
         <Tilt style={{ height: '100px', width: '100px'}}>
          <div className="pa3" >
           <img style={{paddingTop:'5px'}} src={face} alt="not found" />
          </div>
         </Tilt>
        </div>
    )
}


export default Logo 