import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import JoinUs from './pages/JoinUs';
import JoinCaptain from './pages/JoinCaptain';
import BookingPage from './pages/BookingPage';
import CaptainSignupPage from './pages/CaptainSignupPage';
import JoinRider from './pages/JoinRider';
import RiderSignupPage from './pages/RiderSignupPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import TripDetailsPage from './pages/TripHistoryPage';
import { UserProvider } from './pages/userinfo';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import TripHuntingPage from './pages/TripHuntingPage';
import AccountSettingPage from './pages/AccountSettingPage';
import DriverOngoingTrip from './pages/Driver_Ongoing_Trip';
import RiderOngoingTrip from './pages/Rider_Ongoing_Trip';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path='/join' element={<JoinUs />} />
      <Route path='/join/captain/' element={<JoinCaptain />} />
      <Route path='/booking' element={<BookingPage />} />
      <Route path='/join/captain/signup' element={<CaptainSignupPage />} />
      <Route path='/join/rider/' element={<JoinRider />} />
      <Route path='/join/rider/signup' element={<RiderSignupPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/triphunting' element={<TripHuntingPage />}/>
      <Route path='/account' element={<AccountSettingPage />}/>
      <Route path='/trips' element={<TripDetailsPage />} />
      <Route path='/driverOngoing' element={<DriverOngoingTrip />} />
      <Route path='/riderOngoing' element={<RiderOngoingTrip />} />
      <Route path='/*' element={<NotFoundPage />} />
      <Route path='/admin/login' element={<AdminLogin />}/>
      <Route path='/admin/dashboard' element={<AdminDashboard />}/>
    </Route>
  )
);

const App = () => {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;
