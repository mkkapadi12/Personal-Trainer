import React from 'react';
import { CalendarDays, Clock, Phone, Mail, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

const AppointmentCard = ({ appo }) => {
  return (
    <Card
      key={appo._id}
      className="p-5 border rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 space-y-4"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {appo.firstName} {appo.lastName}
        </h2>

        <span className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full">
          Booked
        </span>
      </div>

      {/* Service */}
      <div className="text-sm text-gray-600">
        <p className="font-medium text-black">Service: {appo.service}</p>
        <p>Duration: {appo.duration} min</p>
      </div>

      {/* Date & Time */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <CalendarDays size={16} />
          {formatDate(appo.date, 'dd-mm-yyyy')}
        </div>

        <div className="flex items-center gap-2">
          <Clock size={16} />
          {appo.time}
        </div>
      </div>

      {/* Contact */}
      <div className="space-y-1 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Mail size={16} />
          {appo.email}
        </div>

        <div className="flex items-center gap-2">
          <Phone size={16} />
          {appo.phone}
        </div>
      </div>

      {/* Note */}
      {appo.note && (
        <div className="text-sm text-gray-500 border-t pt-2">
          <p className="flex items-center gap-2 font-medium text-black">
            <FileText size={16} /> Note
          </p>
          <p>{appo.note}</p>
        </div>
      )}

      {/* Message */}
      {appo.message && (
        <div className="text-sm text-gray-500">
          <p className="font-medium text-black">Message:</p>
          <p>{appo.message}</p>
        </div>
      )}
    </Card>
  );
};

export default AppointmentCard;
