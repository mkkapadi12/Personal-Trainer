import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Dumbbell } from 'lucide-react';

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ background: '#d7fb00' }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ background: '#d7fb00', animationDelay: '1s' }}
        />
      </div>

      <div className="relative z-10 text-center max-w-xl w-full">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div
            className="p-5 rounded-full"
            style={{
              background: 'rgba(215,251,0,0.1)',
              border: '2px solid rgba(215,251,0,0.3)',
            }}
          >
            <Dumbbell size={48} style={{ color: '#d7fb00' }} />
          </div>
        </div>

        {/* 404 */}
        <h1
          className="font-black leading-none tracking-tighter mb-2"
          style={{
            fontSize: 'clamp(6rem, 20vw, 10rem)',
            color: '#d7fb00',
            textShadow: '0 0 60px rgba(215,251,0,0.4)',
          }}
        >
          404
        </h1>

        {/* Divider */}
        <div
          className="h-0.5 w-24 mx-auto mb-6 rounded-full"
          style={{ background: 'rgba(215,251,0,0.5)' }}
        />

        {/* Message */}
        <h2 className="text-white text-2xl font-bold mb-3 tracking-wide">
          Page Not Found
        </h2>
        <p className="text-gray-400 text-base mb-10 leading-relaxed">
          Looks like this rep doesn't exist. The page you're looking for has
          been moved, deleted, or never existed.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            style={{
              background: '#d7fb00',
              color: '#000',
              boxShadow: '0 4px 24px rgba(215,251,0,0.35)',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                '0 6px 32px rgba(215,251,0,0.55)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                '0 4px 24px rgba(215,251,0,0.35)')
            }
          >
            <Home size={16} />
            Go Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'transparent',
              color: '#d7fb00',
              border: '2px solid rgba(215,251,0,0.6)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(215,251,0,0.08)';
              e.currentTarget.style.borderColor = '#d7fb00';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(215,251,0,0.6)';
            }}
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
