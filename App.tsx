import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DetailPage from './pages/DetailPage';
import AdminPanel from './pages/AdminPanel';
import { DataProvider } from './context/DataContext';

const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/section/:id" element={<DetailPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default App;
