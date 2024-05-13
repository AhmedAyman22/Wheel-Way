import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from  'react-router-dom';
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout';
import JoinUs from './pages/JoinUs';
import JoinCaptain from './pages/JoinCaptain';
import BookingPage from './pages/BookingPage';
import CaptainSignupPage from './pages/CaptainSignupPage';
import JoinRider from './pages/JoinRider';
import RiderSignupPage from './pages/RiderSignupPage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element= {<MainLayout />}>
      <Route index element={<HomePage />}/>
      <Route path='/join' element={<JoinUs />}/>
      <Route path='/join/captain/' element={<JoinCaptain />}/>
      <Route path='/booking' element={<BookingPage />}/>
      <Route path='/join/captain/signup' element={<CaptainSignupPage />}/>
      <Route path='/join/rider/' element={<JoinRider />}/>
      <Route path='/join/rider/signup' element={<RiderSignupPage />}/>
    </Route>
  )
);
const App = () => {
  return (
    <RouterProvider router={router} />

  )
}

export default App