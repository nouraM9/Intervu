import { useState } from "react";
import logo from "../assets/logo.png";
import profile from "../assets/logo.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen , setMenuOpen] = useState(false);

  return (
    <nav className="px-8 flex h-20 items-center justify-between bg-white md:px-24">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="Intervu logo"
          className="w-[52px] h-[46px]"
        />

        <h1 className="title">Intervu</h1>
      </div>
      
      {/* Right Side */}
      <div className="hidden md:flex items-center gap-8">
        <button className="hover:text-violet-600 transition">
          Home
        </button>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2"
          >
            <img
              src={profile}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />

            <svg
              className={`w-4 h-4 transition-transform ${
                open ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-44 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
              <button className="block w-full px-4 py-3 text-left hover:bg-(--bg)">
                Profile
              </button>

              <button className="block w-full px-4 py-3 text-left text-red-600 hover:bg-red-50">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

         <div className=" relative md:hidden">
             <button id="menu-btn" className="block  focus:outline-none" onClick={()=> setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </button>
        {menuOpen &&(
              <div className="absolute right-1 mt-3 w-44 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
                <button className="block w-full px-4 py-3 text-left hover:bg-(--bg)">
                Home
            </button>
              <button className="block w-full px-4 py-3 text-left hover:bg-(--bg)">
                Profile
              </button>

              <button className="block w-full px-4 py-3 text-left text-red-600 hover:bg-red-50">
                Logout
              </button>
            </div>
          )}
             
        

            </div> 
       

       
     
    </nav>
  );
}

export default Navbar;