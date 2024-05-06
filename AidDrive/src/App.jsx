import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from  'react-router-dom';
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout';
import JoinUs from './pages/JoinUs';
import JoinCaptain from './pages/JoinCaptain';
import BookingPage from './pages/BookingPage';
// import MapView from './components/MapView';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element= {<MainLayout />}>
      <Route index element={<HomePage />}/>
      <Route path='/join' element={<JoinUs />}/>
      <Route path='/join/captain' element={<JoinCaptain />}/>
      <Route path='/booking' element={<BookingPage />}/>

    </Route>
  )
);
const App = () => {
  return (
    <RouterProvider router={router} />
    //<Navbar />
  )
}

export default App