import React from 'react';
import {SignedOut,SignIn,SignedIn,UserButton} from "@clerk/nextjs";

const Navbar=()=>{
  return(
    <div className='flex justify-between items-center p-2'>
        <h1 className='text-white font-semibold text-xl'>Chat with PDF</h1>    
        <div>
            <SignedOut>
                <SignIn></SignIn>
            </SignedOut>
            <SignedIn>
                <UserButton></UserButton>
            </SignedIn>
        </div>
    </div>
  )
}

export default Navbar;