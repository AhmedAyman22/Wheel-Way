import captainHero from '../assets/images/captain-join.jpeg'
import {Link} from 'react-router-dom';

const JoinCaptain = () => {
    return (
      <>
      <div className=''>
      <h1 className="text-[36px] font-bold flex items-center justify-center h-auto sm:text-[48px] mt-[10px] text-primary">Join Wheel Way as a Captain</h1>
      <h2 className="text-[36px] sm:text-[40px] font-bold relative inset-y-[25px] justify-end ml-[20px] sm:left-[80px] text-primary">Drive with Purpose, Compassion, and Impact</h2>
      
      <p className="sm:text-[20px] text-primary/75 relative top-[60px] text-[16px] font-regular justify-end ml-[20px] sm:left-[130px] whitespace-pre; w-[900px] h-[120px]">
      At Wheel Way, we believe that mobility should be accessible to everyone, regardless of physical challenges.<br></br> 
      As a Captain, you’ll play a crucial role in empowering individuals with limited mobility to move freely and independently.
      </p>
      
      <div className='text-[15px] text-primary font-medium relative top-[80px] w-[900px] right-[120px] sm:left-[20px] '>
      <p className='relative left-[130px] '>Why Drive with Wheel Way?</p>
      <ul className='list-inside list-disc relative left-[150px] justify'>
      <li className='text-balance w-[450px] mb-[10px] sm:mb-[0px] sm:text-nowrap '>Meaningful Connections: Be part of a community that values empathy and inclusivity.<br></br>
      Every ride you provide makes a difference in someone’s life.</li>
      <li className='text-balance w-[450px] mb-[10px] sm:mb-[0px] sm:text-nowrap'>Specialized Training: Our comprehensive training equips you with the skills needed to assist passengers with care.<br></br>
      From wheelchair loading to understanding unique needs, you’ll be well-prepared.</li>
      <li className='text-balance w-[450px] mb-[10px] sm:mb-[0px] sm:text-nowrap'>Wheelchair-Accessible Vehicles: Drive our specially equipped vans with ramps for easy wheelchair access.<br></br>
      Your vehicle becomes a lifeline for those who rely on it.</li>
      <li className='text-balance w-[450px] mb-[10px] sm:mb-[0px] sm:text-nowrap'>Flexible Hours: Set your own schedule. Whether you’re a full-time driver or looking for part-time opportunities,<br></br>
      Wheel Way adapts to your lifestyle.</li>
      </ul>

      <p className='relative left-[130px] '>Requirements:</p>
      <ul className='list-inside list-disc relative left-[150px] justify'>
      <li className='text-balance w-[450px] mb-[10px] sm:mb-[0px] sm:text-nowrap '>Valid driver’s license</li>
      <li className='text-balance w-[450px] mb-[10px] sm:mb-[0px] sm:text-nowrap'>Clean driving record</li>
      <li className='text-balance w-[450px] mb-[10px] sm:mb-[0px] sm:text-nowrap'>Clean criminal record</li>
      </ul>
      </div>
  
      <div className='text-[15px] text-primary font-medium relative top-[80px] w-[900px] right-[120px] sm:left-[20px] '>
      <p className='relative left-[130px]'>How It Works:</p>
      <ul className='list-inside list-disc relative left-[150px] justify '>
      <li className='text-balance mb-[10px] sm:mb-[0px] sm:text-nowrap'>Sign Up: Fill out our simple application form.</li>
      <li className='text-balance mb-[10px] sm:mb-[0px] sm:text-nowrap'>Training: Attend our specialized training sessions.</li>
      <li className='text-balance mb-[10px] sm:mb-[0px] sm:text-nowrap'>Hit the Road: Start accepting rides and making a positive impact.</li>
      </ul>
      <p className='relative left-[130px] '>Ready to Make a Difference?</p>
      <p className='relative left-[130px] '>Join Wheel Way today and drive with purpose. Together, we’ll create a world where everyone can move forward, one ride at a time.</p>
      </div>
      <img src={captainHero} className='sm:visible invisible w-[550px] h-[550px] rounded-[20px] relative inline-block left-[1150px] bottom-[570px] drop-shadow-lg'/>
      
      <div className=' hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 w-[220px] drop-shadow-lg
       h-[70px] bg-accent text-primary hover:text-whitish hover:font-bold font-bold text-[28px] hover:font-medium rounded-[5px] absolute sm:bottom-[50px] left-[220px] bottom-[0px] sm:left-[1330px]'>
      <Link to="/join/captain/signup" className='relative top-[20%] left-[15%] '>JOIN NOW</Link>
       </div>
      </div>
      
      </>
    )
  }

export default JoinCaptain