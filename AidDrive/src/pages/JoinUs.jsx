import driver from '../assets/images/driver.png'
import rider from '../assets/images/man.png'

const JoinUs = () => {
  return (
    <>
    <div>
      <h1 className='text-[36px] font-bold flex items-center justify-center h-auto sm:text-[48px] mt-[30px] text-primary' >JOIN US</h1>
      <div className=''>
        <div className='relative left-[360px] w-[500px] h-[700px] bg-whitish rounded-[20px] inline-block drop-shadow-lg'>
          <h2 className='text-[36px] font-bold flex items-center justify-center h-auto sm:text-[48px] mt-[30px] text-primary'>Captain</h2>
          <img src={driver} className='h-[400px] relative top-[35px] left-[50px]'/>
          <button className='inline-block w-[220px]  h-[70px] bg-accent rounded-[5px] drop-shadow-lg relative top-[75px] left-[135px] font-bold text-[28px] text-primary hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 hover:text-whitish'>JOIN NOW</button>
        </div>
        <div className='relative left-[550px] w-[505px] h-[700px] bg-whitish rounded-[20px] inline-block drop-shadow-lg'>
        <h2 className='text-[36px] font-bold flex items-center justify-center h-auto sm:text-[48px] mt-[30px] text-primary'>Rider</h2>
        <img src={rider} className='h-[400px] relative top-[35px] left-[50px]'/>
        <button className='inline-block w-[220px] h-[70px] bg-accent rounded-[5px] drop-shadow-lg relative top-[75px] left-[135px] font-bold hover:font-bold text-[28px] text-primary hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 hover:text-whitish'>JOIN NOW</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default JoinUs