import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import NavbarDemo from './components/resizable-navbar-demo';
import Footer from './components/Footer';

// Lazy-loaded pages — only loaded when the route is visited
const Home = lazy(() => import('./pages/Home'));
const PackagesPage = lazy(() => import('./pages/PackagesPage'));
const VehiclesPage = lazy(() => import('./pages/VehiclesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));

// Admin pages
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ManagePackages = lazy(() => import('./pages/admin/ManagePackages'));
const ManageVehicles = lazy(() => import('./pages/admin/ManageVehicles'));
const ManageBookings = lazy(() => import('./pages/admin/ManageBookings'));

// Loading spinner for page transitions
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-india-blue-200 border-t-india-blue-600 rounded-full animate-spin" />
      <p className="text-india-blue-600 font-medium animate-pulse">Loading...</p>
    </div>
  </div>
);

// Main Layout for public pages
const MainLayout = () => (
  <div className="min-h-screen bg-white">
    <NavbarDemo />
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Route>

        {/* Admin Routes without public Navbar and Footer */}
        <Route path="/admin" element={
          <Suspense fallback={<PageLoader />}>
            <AdminLayout />
          </Suspense>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="packages" element={<ManagePackages />} />
          <Route path="vehicles" element={<ManageVehicles />} />
          <Route path="bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
