import React from "react";
import 'tachyons' ;

const Rank = ({name,entries}) => {
    return(
        <div>
         <div className="blue f3">
            {`${name}, your current entry count is`}
         </div>
         <div className="blue f1">
            {entries}
         </div>
        </div>
    ) 
}


export default Rank 