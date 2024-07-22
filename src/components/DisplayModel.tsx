import React from 'react';
import dynamic from 'next/dynamic';

const AvatarScene = dynamic(() => import('./AvatarScence'), { ssr: false });

export function DisplayModel() {
  return (
    <div className="mt-[6vh] lg:mt-[28px] w-fit h-[400px] smH:h-[38vh] smH:sm:h-[400px] mdH:h-[450px]">
      <div id="avatar-container" className="w-full h-full">
        <AvatarScene />
      </div>
    </div>
  );
}
