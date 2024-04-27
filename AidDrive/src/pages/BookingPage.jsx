import React from 'react'

const BookingPage = () => {
  return (
    <>
    <div>
    <h1 className='text-[36px] font-bold flex items-center justify-center h-auto sm:text-[48px] mt-[30px] text-primary' >BOOK A TRIP</h1>
    <div className='relative left-[360px] w-[350px] h-[450px] bg-whitish rounded-[20px] inline-block drop-shadow-lg'>
          <h2 className='text-[28px] font-bold flex items-center justify-center h-auto sm:text-[48px] mt-[30px] text-primary'>Find a trip</h2>
          <input type="text" className='border-[2px] border-accent rounded-[5px] w-[240px] h-[40px] m-[10px] relative left-[50px] top-[20px] text-[14px] ' placeholder='Pickup Location'/>
          <input type="text" className='border-[2px] border-accent rounded-[5px] w-[240px] h-[40px] m-[10px] relative left-[50px] top-[20px] text-[14px] ' placeholder='Dropoff Location'/>
          <button className='inline-block w-[130px] h-[50px] bg-accent rounded-[5px] drop-shadow-lg relative top-[75px] left-[110px] font-bold
           text-[20px] text-primary hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 hover:text-whitish'>CONFIRM</button>
        </div>
    </div>
    </>
  )
}

export default BookingPage