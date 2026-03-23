import React from 'react';
import AddressList from './components/AddressList';
import { useSelector } from 'react-redux';

const Address = () => {
  const { addresses } = useSelector((state) => state.address);

  return (
    <div className="min-h-screen bg-black px-4 py-16">
      <AddressList addresses={addresses} />
    </div>
  );
};

export default Address;
