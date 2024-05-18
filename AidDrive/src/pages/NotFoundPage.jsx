import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <section className='text-center flex flex-col justify-center items-center h-96'>
        
      <FaExclamationTriangle className='text-[#B10F2E] text-8xl mb-4' />
      <h1 className='text-7xl font-bold mb-4'>404 Not Found</h1>
      <p className='text-2xl mb-5'>Seems like you've lost your way!</p>
      <Link
        to='/'
        className='text-primary font-bold text-[24px] bg-accent hover:text-whitish hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 hover:bg-opacity-85  rounded-[5px] px-3 py-2 mt-4'
      >
        Go Back Home!
      </Link>
    </section>
  );
};
export default NotFoundPage;
