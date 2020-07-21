import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import './index.scss';

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className='Dashboard'>
        <Sidebar />
        <h1>Dashboard</h1>
      </div>
      
    </div>
  );
};

export default Dashboard;
