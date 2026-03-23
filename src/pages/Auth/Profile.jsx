import React, { useEffect } from 'react';
import ProfileForm from './components/ProfileForm';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddresses } from '@/Store/features/address/address.slice';
import { MapPin } from 'lucide-react';

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
    <div className="min-h-screen bg-black px-4 py-16">
      <div className="max-w-3xl mx-auto">

        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1
            className="text-4xl font-black tracking-widest uppercase mb-2"
            style={{ color: '#d7fb00' }}
          >
            Profile
          </h1>
          <div
            className="h-0.5 w-16 mx-auto rounded-full"
            style={{ background: '#d7fb00' }}
          />
          <p className="text-gray-400 text-sm mt-3">
            Manage your personal details and preferences
          </p>
        </div>

        {/* Form Card */}
        <div
          className="rounded-2xl p-6 md:p-10 mb-6"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(215,251,0,0.15)',
            boxShadow: '0 0 40px rgba(215,251,0,0.05)',
          }}
        >
          <ProfileForm />
        </div>

        {/* Address Section */}
        <div
          className="rounded-2xl px-6 py-5 flex items-center justify-between"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-full"
              style={{ background: 'rgba(215,251,0,0.1)' }}
            >
              <MapPin size={18} style={{ color: '#d7fb00' }} />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Saved Addresses</p>
              <p className="text-gray-500 text-xs">
                {addresses.length} address{addresses.length !== 1 ? 'es' : ''} saved
              </p>
            </div>
          </div>

          <Button
            type="button"
            onClick={() => navigate('/account/profile/address')}
            className="uppercase text-xs font-bold tracking-wider px-5 py-2 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: '#d7fb00',
              color: '#000',
              boxShadow: '0 4px 16px rgba(215,251,0,0.3)',
              border: 'none',
            }}
          >
            View Addresses ({addresses.length})
          </Button>
        </div>

      </div>
    </div>
  );
};

export default Profile;
