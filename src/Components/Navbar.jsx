import React from 'react';
import logo from "../../src/assets/logo.png";
import { FaGithub } from 'react-icons/fa';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4 lg:px-10">
    
      <div className="navbar-start">
        
       
        <div className="dropdown">
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-ghost lg:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor">
              <path strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul 
            tabIndex={0} 
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li><NavLink to="/"  className='bg-primary-text'>Home</NavLink></li>
            <li><NavLink to="apps" >Apps</NavLink></li>
            <li><NavLink to="installation" >Installation</NavLink></li>
          </ul>
        </div>

      
        <div className="flex items-center gap-2">
         <Link to="/"><img className='w-[40px] h-[40px] object-contain' src={logo} alt="logo"/>
         </Link> 
          <a className="btn btn-ghost text-xl bg-primary-text">HERO.IO</a>
        </div>
      </div>

     
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><NavLink to="/" className='bg-primary-text font-semibold'>Home</NavLink></li>
          <li><NavLink to="apps">App</NavLink></li>
          <li><NavLink to="installation">Installation</NavLink></li>
        </ul>
      </div>

    
      <div className="navbar-end">
        <a href="https://github.com/archichowdhury4" 
    target="_blank"  className="btn bg-primary text-white px-6 rounded-lg">
         <FaGithub></FaGithub> Contribute
        </a>
      </div>
    </div>
  );
};

export default Navbar;
