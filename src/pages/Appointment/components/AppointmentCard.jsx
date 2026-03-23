import React from 'react';
import { formatDate } from '@/lib/utils';
import { PAGE_ICONS } from '@/lib/icons/pageicons';

const {
  CALENDAR,
  CLOCK,
  PHONE,
  MAIL,
  FILE_TEXT,
  MESSAGE,
  USER,
  DUMBBELL,
  TIMER,
} = PAGE_ICONS;

const InfoRow = ({ icon: Icon, children }) => (
  <div className="flex items-start gap-2.5">
    <Icon
      size={13}
      className="shrink-0 mt-0.5"
      style={{ color: '#d7fb00', opacity: 0.75 }}
    />
    <span className="text-gray-300 text-xs leading-relaxed">{children}</span>
  </div>
);

const AppointmentCard = ({ appo }) => {
  return (
    <div
      className="relative rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 group"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.4)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = '1px solid rgba(215,251,0,0.25)';
        e.currentTarget.style.boxShadow = '0 6px 32px rgba(215,251,0,0.08)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)';
        e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.4)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Header — Name + Status Badge */}
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-center gap-2">
          <div
            className="p-1.5 rounded-full shrink-0"
            style={{ background: 'rgba(215,251,0,0.08)' }}
          >
            <USER size={13} style={{ color: '#d7fb00' }} />
          </div>
          <h2 className="text-white font-semibold text-sm leading-tight">
            {appo.firstName} {appo.lastName}
          </h2>
        </div>

        <span
          className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0"
          style={{ background: 'rgba(74,222,128,0.12)', color: '#4ade80' }}
        >
          Booked
        </span>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

      {/* Service Info */}
      <div className="space-y-2">
        <InfoRow icon={DUMBBELL}>
          <span className="font-medium text-white">{appo.service}</span>
        </InfoRow>
        {appo.duration && (
          <InfoRow icon={TIMER}>{appo.duration} min session</InfoRow>
        )}
      </div>

      {/* Date & Time */}
      <div className="space-y-2">
        <InfoRow icon={CALENDAR}>{formatDate(appo.date, 'dd-mm-yyyy')}</InfoRow>
        <InfoRow icon={CLOCK}>{appo.time}</InfoRow>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

      {/* Contact */}
      <div className="space-y-2">
        <InfoRow icon={MAIL}>{appo.email}</InfoRow>
        <InfoRow icon={PHONE}>{appo.phone}</InfoRow>
      </div>

      {/* Note */}
      {appo.note && (
        <>
          <div
            style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }}
          />
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <FILE_TEXT size={12} style={{ color: '#d7fb00', opacity: 0.7 }} />
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: '#d7fb00' }}
              >
                Note
              </p>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">{appo.note}</p>
          </div>
        </>
      )}

      {/* Message */}
      {appo.message && (
        <>
          <div
            style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }}
          />
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <MESSAGE size={12} style={{ color: '#d7fb00', opacity: 0.7 }} />
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: '#d7fb00' }}
              >
                Message
              </p>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              {appo.message}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AppointmentCard;
