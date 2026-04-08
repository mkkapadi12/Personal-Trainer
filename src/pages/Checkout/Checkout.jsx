import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const { addresses } = useSelector((state) => state.address);
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  console.log(user);
  console.log(cart);
  console.log(addresses);

  const form = useForm({
    defaultValues: {
      addressId: '',
      paymentMethod: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return <div>Checkout page</div>;
};

export default Checkout;
