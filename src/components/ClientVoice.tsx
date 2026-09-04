import type { ReactNode } from 'react';

type ClientVoiceProps = {
  name: string;
  role?: string;
  children: ReactNode;
  compact?: boolean;
  tone?: 'neutral' | 'positive' | 'caution' | 'critical';
  className?: string;
};

function PersonIcon(){
  return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="12" cy="8" r="4" fill="currentColor"/>
    <path d="M4.5 20c.6-4.1 3.2-6.2 7.5-6.2s6.9 2.1 7.5 6.2" fill="currentColor"/>
  </svg>;
}

export default function ClientVoice({name,role,children,compact=false,tone='neutral',className=''}:ClientVoiceProps){
  return <div className={`client-voice ${compact?'compact':''} tone-${tone} ${className}`.trim()}>
    <div className="client-avatar"><PersonIcon/></div>
    <div className="client-voice-copy">
      <div className="client-identity"><strong>{name}</strong>{role&&<span>{role}</span>}</div>
      <div className="client-message">{children}</div>
    </div>
  </div>;
}
