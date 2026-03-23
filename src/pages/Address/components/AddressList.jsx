import { useState } from 'react';
import AddressFormDialog from './AddressFormDialog';
import AddressCard from './AddressCard';
import { Button } from '@/components/ui/button';
import {
  createAddress,
  deleteAddress,
  editAddress,
} from '@/Store/features/address/address.slice';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';

export default function AddressList({ addresses }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [mode, setMode] = useState('add');
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleEdit = (address) => {
    setSelectedAddress(address);
    setMode('edit');
    setOpen(true);
  };

  const handleAddAddress = () => {
    setSelectedAddress(null); // clear previous edit data
    setMode('add');
    setOpen(true);
  };

  const handleSubmit = async (data) => {
    try {
      const action =
        mode === 'edit'
          ? dispatch(editAddress({ id: selectedAddress._id, data })).unwrap()
          : dispatch(createAddress(data)).unwrap();

      const result = await toast
        .promise(action, {
          loading:
            mode === 'edit'
              ? 'Updating address...'
              : 'Address is being added...',
          success: (res) =>
            res?.msg ||
            (mode === 'edit'
              ? 'Address updated successfully!'
              : 'Address added successfully!'),
          error: (err) =>
            err?.message ||
            (mode === 'edit'
              ? 'Failed to update address'
              : 'Failed to add address'),
        })
        .unwrap();

      if (result) {
        setOpen(false);
        setMode('add');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-16">
      <h1 className="mb-6 text-3xl font-bold text-center">ADDRESSES</h1>

      <div className="flex justify-center mb-10">
        <Button
          className="bg-brand text-black hover:bg-transparent border uppercase rounded-none border-brand hover:border-black transition-all duration-300"
          onClick={handleAddAddress}
        >
          ADD A NEW ADDRESS
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1">
        {addresses?.map((address) => (
          <AddressCard
            key={address._id}
            address={address}
            onEdit={() => handleEdit(address)}
            onDelete={() => dispatch(deleteAddress(address._id))}
          />
        ))}
      </div>

      <AddressFormDialog
        open={open}
        setOpen={setOpen}
        onSubmit={handleSubmit}
        mode={mode}
        setMode={setMode}
        editData={selectedAddress}
      />
    </div>
  );
}
