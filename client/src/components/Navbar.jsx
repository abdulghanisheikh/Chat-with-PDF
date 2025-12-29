import React from 'react';
import {SignedOut,SignIn,SignedIn,UserButton} from "@clerk/nextjs";

const Navbar=()=>{
  return(
    <div className='flex justify-between items-center px-6 py-2 bg-zinc-800'>
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