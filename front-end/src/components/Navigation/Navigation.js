import React from "react";
import 'tachyons' ;

const Navigation = ({onRouteChange , isSignedIn}) => {
    if (isSignedIn) { 
        return(<nav style={{display: 'flex' , justifyContent: 'flex-end'}} >
            <p  onClick={ ()=>onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign Out</p>
        </nav>)
        }

    else {
        return (
            <nav style={{display: 'flex' , justifyContent: 'flex-end'}} >
            <p onClick={()=>onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign in</p>
            <p onClick={()=>onRouteChange('signup')} className="f3 link dim black underline pa3 pointer">Sign Up</p>
        </nav>
        )
    }
    
}


export default Navigation 