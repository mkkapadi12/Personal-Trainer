import React, { useEffect } from 'react';
import ProfileForm from './components/ProfileForm';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddresses } from '@/Store/features/address/address.slice';

const Profile = () => {
  const { addresses } = useSelector((state) => state.address);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('workDo');

    if (token) {
      dispatch(fetchAddresses());
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-16">
      <h1 className="mb-10 text-3xl font-bold text-center">PROFILE DETAILS</h1>

      <div className="p-5 md:p-10 border rounded-md bg-gray-50 mb-10">
        <ProfileForm />
      </div>

      {/* Address button */}
      <div className="p-5 md:p-10">
        <div className="flex items-center justify-end w-full">
          <Button
            type="button"
            className="bg-brand text-black hover:bg-transparent border uppercase rounded-none border-brand hover:border-black transition-all duration-300"
            onClick={() => navigate('/account/profile/address')}
          >
            View Address ({addresses.length})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
