import React, {useState} from 'react'
import '../App.css'

const Navbar = () => {

  const [showLeftLinks, setShowLeftLinks] = useState(false);
  const [showRightLinks, setShowRightLinks] = useState(false);

  function changeLeft () {
    setShowLeftLinks(!showLeftLinks);
    if(showRightLinks){
      setShowRightLinks(false);
    }
  }

  function changeRight () {
    setShowRightLinks(!showRightLinks);
    
    if(showLeftLinks){
      setShowLeftLinks(!showLeftLinks);
    }
    
  }

  return(

    
    <div className='Navbar'>

      <div className='NavLeft' id={showLeftLinks ? "leftHidden" : "leftDefault"}>
        <button onClick = {changeLeft}>Open</button>
        <a href='./Assets'>Assets</a>
        <a href='./Trading'>Trading</a>
        <a href='./'>Home</a>
      </div>

      <div className='NavCenter'>
        <input type='text' placeholder='Search......'/>
        <button>Search</button>
      </div>

      <div className='NavRight' id={showRightLinks ? "rightHidden" : "rightDefault"}>
        <button onClick={changeRight}>Open</button>
        <a href='./Profile'>Profile</a>
        <a href='./Transactions'>Transactions</a>
        <a href='./Options'>Options</a>
      </div>
    </div>
  )
    
}

export default Navbar
