import React from 'react';
import dynamic from 'next/dynamic';

const AvatarScene = dynamic(() => import('./AvatarScence'), { ssr: false });

export function DisplayModel() {
  return (
    <div className="mt-[7vh] lg:mt-[28px] w-full h-[80vh] smH:h-[60vh]">
      <div id="avatar-container" className="w-full h-full">
        <AvatarScene />
      </div>
    </div>
  );
}
