import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';

const App = () => (
  <Suspense
    fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div
          className="w-10 h-10 rounded-full border-2 animate-spin"
          style={{ borderColor: '#d7fb00', borderTopColor: 'transparent' }}
        />
      </div>
    }
  >
    <RouterProvider router={router} />
  </Suspense>
);

export default App;
