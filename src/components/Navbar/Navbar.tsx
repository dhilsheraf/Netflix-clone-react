import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'



const Navbar = () => {

    const navRef = useRef<HTMLDivElement | null>(null); // ✅ Define the type for useRef

    useEffect(()=>{
        window.addEventListener('scroll',()=>{
            if(window.scrollY >= 80){
                navRef.current.classList.add('nav-dark'); // ✅ Correct class name
            }else{
                navRef.current.classList.remove('nav-dark')
            }
        })
        
    },[])

  return (
    <div className='navbar' ref={navRef}>
    <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
            <li>Home</li>
            <li>Tv Shows</li>
            <li>Movies</li>
            <li>New & Popular</li>
            <li>My list</li>
            <li>Browse By Languages</li>
        </ul>
    </div>
    <div className="navbar-right">
        <img src={search_icon} className='icons' />
        <p>Children</p>
        <img src={bell_icon} className='icons' />
        <div className="navbar-profile">
            <img src={profile_img} alt="" className="profile" />
            <img src={caret_icon} alt="" />
            <div className="dropdown">
                <p onClick={()=>{logout()}} >Sign out of Netflix</p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Navbar  
