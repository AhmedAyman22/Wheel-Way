import hero from '../assets/images/homepage-hero.jpg'
const Home = () => {
  return (
    <>
    <div className=''>
    <h1 className="text-[36px] font-bold flex items-center justify-center h-auto sm:text-[48px] mt-[30px] text-primary">AIDDRIVE</h1>
    <h2 className="text-[36px] sm:text-[48px] font-bold relative inset-y-[60px] justify-end ml-[10px] sm:left-[80px] text-primary">Connecting People, One Ride at a Time</h2>
    
    <p className="sm:text-[20px] text-primary/75 relative top-[80px] text-[16px] justify-end ml-[20px] sm:left-[130px] whitespace-pre; w-[900px] h-[120px]">
      Welcome to AidDrive, where mobility knows no bounds. 
      <br></br>We’re more than just a website; we’re a community dedicated to ensuring 
      <br></br>that everyone can move freely and independently. Our mission is simple: 
      <br></br>to provide safe, reliable transportation for physically challenged individuals.
    </p>
    
    <div className='text-[15px] text-primary font-medium relative top-[100px] w-[900px] right-[120px] sm:left-[40px] '>
    <p className='relative left-[130px] '>Our Services:</p>
    <ul className='list-inside list-disc relative left-[150px] justify'>
    <li className='text-balance w-[450px] mb-[10px] sm:mb-[0px] sm:text-nowrap '>Wheelchair-Accessible Vans: Our fleet of specially equipped vans ensures comfortable rides
    for wheelchair users.<br></br>With ramps for easy access, our drivers are committed to making your
    journey smooth and stress-free.</li>
    <li className='text-balance w-[450px] mb-[10px] sm:mb-[0px] sm:text-nowrap'>Trained Drivers: Our compassionate drivers undergo rigorous training to assist passengers
    with care and respect.<br></br> Whether it’s a medical appointment, a social outing, or a simple trip to
    the grocery store, we’ve got you covered.</li>
    <li className='text-balance w-[450px] mb-[10px] sm:mb-[0px] sm:text-nowrap'>On-Demand Service: Need a ride? Just open the website!<br></br> AidDrive connects you
    with nearby drivers who understand your unique needs. No waiting, no hassle.</li>
    </ul>
    </div>

    <div className='text-[15px] text-primary font-medium  relative top-[120px] justify-end right-[160px] sm:left-[0px] '>
    <p className='relative left-[170px]'>Why Choose AidDrive:</p>
    <ul className='list-inside list-disc relative left-[190px] justify '>
    <li className='text-balance mb-[10px] sm:mb-[0px] sm:text-nowrap'>Reliability: We’re here when you need us, rain or shine. Count on us for timely pickups and drop-offs.</li>
    <li className='text-balance mb-[10px] sm:mb-[0px] sm:text-nowrap'>Community: Join a supportive community of riders, drivers, and caregivers who share a common goal:<br></br>  enhancing mobility for all.</li>
    <li className='text-balance mb-[10px] sm:mb-[0px] sm:text-nowrap'>Empowerment: Wheels of Care empowers individuals to live life to the fullest. We believe that everyone<br></br> 
      deserves the freedom to explore, connect, and thrive.</li>
    </ul>
    </div>
    <img src={hero} className='sm:visible invisible w-[650px] h-[600px] rounded-[20px] absolute top-[230px] left-[1100px]'/>
    <button className=' hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 w-[150px] h-[50px] bg-primary text-whiteText font-bold hover:font-medium rounded-full absolute sm:bottom-[50px] left-[220px] bottom-[-280px] sm:left-[500px]'>ORDER NOW</button>
    </div>
    
    </>
  )
}

export default Home