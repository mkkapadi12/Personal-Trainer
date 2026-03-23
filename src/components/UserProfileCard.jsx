import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, User, Calendar } from 'lucide-react';
import { logout } from '@/Store/features/auth/auth.slice';

const UserProfileCard = ({ user }) => {
  const dispatch = useDispatch();

  if (!user) return null;

  return (
    <Card className="max-w-md mx-auto mt-6 shadow-lg border">
      <CardHeader className="space-y-2 text-center">
        <div className="flex items-center justify-center w-20 h-20 mx-auto text-2xl font-bold text-white bg-green-600 rounded-full">
          {user.firstName?.charAt(0)}
          {user.lastName?.charAt(0)}
        </div>

        <CardTitle className="text-2xl">
          {user.firstName} {user.lastName}
        </CardTitle>

        <CardDescription className="text-gray-500">
          User Profile
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 text-gray-700">
          <Mail size={18} />
          <span>{user.email}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <Calendar size={18} />
          <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <User size={18} />
          <span>ID: {user._id}</span>
        </div>

        <Button
          variant="destructive"
          className="w-full mt-4"
          onClick={() => dispatch(logout())}
        >
          Logout
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
