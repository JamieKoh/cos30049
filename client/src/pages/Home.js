import React from 'react';
import '../App.css';
import person from '../images/person.png';

function Home() {
  return (
    <div className='HomePageContainer'>
      <div className='People'>
        <div className='person_images'> 
          <img src={person} alt='avatar'/>
        </div>
        <div className='person_images'> 
          <img src={person} alt='avatar'/>
        </div>
        <div className='person_images'> 
          <img src={person} alt='avatar'/>
        </div>
        
      </div>
    </div>
    
  )
}

export default Home;
