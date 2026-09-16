import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ProtectedRoute } from './components/ProtectedRoute';

import Home from './pages/Home';
import ServicesOverview from './pages/ServicesOverview';
import ServiceDetail from './pages/ServiceDetail';
import About from './pages/About';
import Store from './pages/Store';
import Login from './pages/Login';
import Register from './pages/Register';
import Booking from './pages/Booking';
import CustomerHistory from './pages/CustomerHistory';
import StaffDashboard from './pages/StaffDashboard';
import AdminDashboard from './pages/AdminDashboard';

import AiAssistant from './pages/AiAssistant';
import ConsultantDashboard from './pages/ConsultantDashboard';

import Layout from './components/Layout';

function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServicesOverview />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/store" element={<Store />} />
              <Route path="/ai-assistant" element={<AiAssistant />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes: Require Any Login */}
              <Route element={<ProtectedRoute />}>
                <Route path="/booking" element={<Booking />} />
              </Route>

              {/* Protected Routes: Customer Only */}
              <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
                <Route path="/history" element={<CustomerHistory />} />
              </Route>

              {/* Protected Routes: Consultant Only */}
              <Route element={<ProtectedRoute allowedRoles={['consultant', 'admin']} />}>
                <Route path="/consultant" element={<ConsultantDashboard />} />
              </Route>

              {/* Protected Routes: Staff Only */}
              <Route element={<ProtectedRoute allowedRoles={['staff']} />}>
                <Route path="/staff" element={<StaffDashboard />} />
              </Route>

              {/* Protected Routes: Admin Only */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </DataProvider>
  );
}

export default App;
