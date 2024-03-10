import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Make sure to install react-icons package

const Summarycard = () => {
  return (
    <div className="bg-dark-blue h-min w-max rounded-lg p-6 text-[#EEEEEE]" style={{ backgroundColor: '#243B55', maxWidth: '500px', borderRadius: '25px', padding: '24px', color: '#FFFFFF' }}>
      <h2 className="text-xl font-bold mb-4">Performance</h2>

      {/* Income and Spendings Metrics */}
      <div className="flex justify-around mb-8">
        <div>
          <p className="text-3xl font-bold">76%</p>
          <p className="text-sm opacity-70">Income</p>
        </div>
        <div>
          <p className="text-3xl font-bold">44%</p>
          <p className="text-sm opacity-70">Spendings</p>
        </div>
      </div>

      {/* Task List */}
      <div className='mb-10'>
        <div className="flex items-center mb-4">
          <FaCheckCircle className="text-green-500 mr-2" />
          <p>Spending course was taken</p>
        </div>
        <div className="flex items-center mb-4">
          <FaCheckCircle className="text-blue-500 mr-2" />
          <p>Deposit programs was setup</p>
        </div>
        <div className="flex items-center">
          <FaCheckCircle className="text-orange-500 mr-2" />
          <p>Cashback program activated</p>
        </div>
      </div>
    </div>
  );
};

export default Summarycard;
