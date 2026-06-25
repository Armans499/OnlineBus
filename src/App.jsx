// import Home from './pages/Home'
// import BusList from './pages/BusList';
// import SeatSelection from "./pages/SeatSelection";
// // import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import PassengerDetails from "./pages/PassengerDetails";
// import Payment from "./pages/Payment";
// import Ticket from "./pages/Ticket";
// import MyBookings from "./pages/MyBookings";
// import TicketPdf from "./pages/TicketPdf";
// import Login from "./pages/Login";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {

//   const isLoggedIn =
//     localStorage.getItem("isLoggedIn");

//   if (!isLoggedIn) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }

// function App(){
//     return(
//         <>
//         <BrowserRouter>
//         <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path='/buses' element={<BusList/>}/>
//         <Route path='/seats' element={<SeatSelection/>}/>
//         <Route path="/passenger-details" element={<PassengerDetails />}/>
//         <Route path="/payment" element={<Payment />} />
//         <Route path="/ticket" element={<Ticket />} />
//         <Route path="/my-bookings" element={  <ProtectedRoute><MyBookings /></ProtectedRoute>}/>
//         <Route path="/ticket-pdf" element={<TicketPdf />} />
//         <Route path="/login" element={<Login />} />

//         </Routes>
//         </BrowserRouter>
//        </>
//     )
// }
// export default App;


import Home from "./pages/Home";
import BusList from "./pages/BusList";
import SeatSelection from "./pages/SeatSelection";
import PassengerDetails from "./pages/PassengerDetails";
import Payment from "./pages/Payment";
import Ticket from "./pages/Ticket";
import MyBookings from "./pages/MyBookings";
import TicketPdf from "./pages/TicketPdf";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter basename="/Buswale">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buses" element={<BusList />} />
        <Route path="/seats" element={<SeatSelection />} />
        <Route path="/passenger-details" element={<PassengerDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route path="/ticket-pdf" element={<TicketPdf />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;