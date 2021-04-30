import React from 'react'
import './history.css'
function history(){
return(
    <div>
        <div className='last seen'>
            <h1>Recently Watched: </h1>
            </div>

            <div className='added'>
                <h1>Recently Added: </h1>
            </div>

            <div className='removed'>
                <h1>Recently Removed: </h1>
            </div>
    </div>
)
}
export default history