import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from  'react-router-dom';
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout';
import JoinUs from './pages/JoinUs';
import JoinCaptain from './pages/JoinCaptain';
import BookingPage from './pages/BookingPage';
import CaptainSignupPage from './pages/CaptainSignupPage';
import JoinRider from './pages/JoinRider';
import RiderSignupPage from './pages/RiderSignupPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import TripHuntingPage from './pages/TripHuntingPage';
import AccountSettingPage from './pages/AccountSettingPage';
import TripHistoryPage from './pages/TripHistoryPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import MapView from './components/MapView';

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
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/triphunting' element={<TripHuntingPage />}/>
      <Route path='/account' element={<AccountSettingPage />}/>
      <Route path='/trips' element={<TripHistoryPage />}/>
      <Route path='/admin/login' element={<AdminLogin />}/>
      <Route path='/admin/dashboard' element={<AdminDashboard />}/>
      <Route path='/map' element={<MapView />}/>

      <Route path='/*' element={<NotFoundPage />}/>
      

    </Route>
  )
);
const App = () => {
  return (
    <RouterProvider router={router} />

  )
}

export default App