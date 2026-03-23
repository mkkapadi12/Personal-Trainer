import React from 'react';
import AddressList from './components/AddressList';
import { useSelector } from 'react-redux';

const Address = () => {
  const { addresses } = useSelector((state) => state.address);

  return (
    <div>
      <AddressList addresses={addresses} />
    </div>
  );
};

export default Address;
