import { UserButton } from "@clerk/nextjs";

const Navbar=()=>{
    return <div className="py-2 px-7 lg:px-10 w-full flex justify-between bg-zinc-800 items-center">
        <h1 className="text-xl font-semibold text-white">Chat with PDF</h1>
        <UserButton />
    </div>;
}

export default Navbar;