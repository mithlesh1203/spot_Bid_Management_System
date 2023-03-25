import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {

    return (
        <>
            <div className='nav-ui'>
                <div className='nav-div-1'>
                    <Link to='/spot-bid-form' >
                        Spot Bid Form
                    </Link>
                </div>
                <div className='nav-div-1'>
                    <Link to='/spot-bid-details' >
                        Spot Bid Details
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Nav