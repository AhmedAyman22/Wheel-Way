import riderHero from '../assets/images/rider-join.jpeg'

const JoinRider = () => {
    return (
      <>
      <div className=''>
      <h1 className="text-[36px] font-bold flex items-center justify-center h-auto sm:text-[48px] mt-[10px] text-primary">Join AidDrive as a Rider</h1>
      <h2 className="text-[36px] sm:text-[40px] font-bold relative inset-y-[25px] justify-end ml-[20px] sm:left-[80px] text-primary">Unlock Mobility, One Ride at a Time</h2>
      
      <p className="sm:text-[20px] text-primary/75 relative top-[60px] text-[16px] font-regular justify-end ml-[20px] sm:left-[130px] whitespace-pre; w-[900px] h-[120px]">
      Welcome to AidDrive, where accessibility meets convenience. <br></br> 
      As a user, you’re at the heart of our mission to provide seamless transportation for individuals with physical challenges.
      </p>
      
      <div className='text-[15px] text-primary font-medium relative top-[80px] w-[900px] right-[120px] sm:left-[20px] '>
      <p className='relative left-[130px] '>Why Choose AidDrive?</p>
      <ul className='list-inside list-disc relative left-[150px] justify'>
      <li className='text-balance w-[450px] mb-[10px] sm:mb-[0px] sm:text-nowrap '>Tailored Rides: AidDrive connects you with trained drivers and wheelchair-accessible vans.<br></br>
      Whether it’s a medical appointment, a social outing, or a simple trip to the store, 
       we’ve got you covered.</li>
      <li className='text-balance w-[450px] mb-[10px] sm:mb-[0px] sm:text-nowrap'>Easy Booking: Use our user-friendly website to request rides. Simply enter your pickup location,<br></br>
      destination, and any special requirements. AidDrive takes care of the rest.</li>
      <li className='text-balance w-[450px] mb-[10px] sm:mb-[0px] sm:text-nowrap'>Safety First: Your safety matters. Our drivers undergo thorough background checks,<br></br>
      and our vehicles are equipped with safety features for a worry-free journey.</li>
      </ul>

      <p className='relative left-[130px] '>How It Works:</p>
      <ol className='list-inside list-decimal relative left-[150px] justify'>
      <li className='text-balance w-[450px] mb-[10px] sm:mb-[0px] sm:text-nowrap '>Sign Up: Create your AidDrive account in minutes.</li>
      <li className='text-balance w-[450px] mb-[10px] sm:mb-[0px] sm:text-nowrap'>Book a Ride: Open the app, set your pickup location, and choose your destination.</li>
      <li className='text-balance w-[450px] mb-[10px] sm:mb-[0px] sm:text-nowrap'>Ride with Confidence: Our drivers arrive promptly, assist with boarding, and ensure a comfortable experience.</li>
      </ol>
      </div>
  
      <div className='text-[15px] text-primary font-medium relative top-[80px] w-[900px] right-[120px] sm:left-[20px] '>
      <p className='relative left-[130px] '>Get Started Today!</p>
      <p className='relative left-[130px] '>Open the AidDrive website and experience transportation that’s reliable, compassionate, and tailored to your needs. <br></br> Let’s move forward together!</p>
      </div>
      <img src={riderHero} className='sm:visible invisible w-[550px] h-[550px] rounded-[20px] relative inline-block left-[1150px] bottom-[455px] drop-shadow-lg'/>
      <button className=' hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 w-[220px] drop-shadow-lg
       h-[70px] bg-accent text-primary hover:text-whitish hover:font-bold font-bold text-[28px] hover:font-medium rounded-[5px] absolute sm:bottom-[50px] left-[220px] bottom-[0px] sm:left-[1330px]'>JOIN NOW</button>
      </div>
      
      </>
    )
  }

export default JoinRider