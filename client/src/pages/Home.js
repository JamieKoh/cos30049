import React from 'react';
import '../App.css';
import person from '../images/person.png';

function Home() {
  return (
    <div className='HomePageContainer'>
      <div className='Welcome'>
        <h1>Welcome To Apex Trades</h1>
        <p>Meet the team</p>
      </div>
      <div className='People'>
        <div className='person_images'> 
          <img src={person} alt='avatar'/>
          <p>Jamie</p>
        </div>
        <div className='person_images'> 
          <img src={person} alt='avatar'/>
          <p>Liam</p>
        </div>
        <div className='person_images'> 
          <img src={person} alt='avatar'/>
          <p>Rony</p>
        </div>
        
      </div>
    </div>
    
  )
}

export default Home;
