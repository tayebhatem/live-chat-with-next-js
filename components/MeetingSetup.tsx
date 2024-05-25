'use client'
import { DeviceSettings, VideoPreview, useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'

const MeetingSetup = ({setIsSetupComplete}:{setIsSetupComplete:(value:boolean)=>void}) => {
   // https://getstream.io/video/docs/react/guides/call-and-participant-state/#call-state
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();

  if (!call) {
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );
  }

  // https://getstream.io/video/docs/react/ui-cookbook/replacing-call-controls/
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);
    useEffect(()=>{
      if(isMicCamToggled){
        call?.camera.disable()
        call?.microphone.disable()
      }else{
        call?.camera.enable()
        call?.microphone.enable()
      }
    },[isMicCamToggled,call?.camera,call?.microphone])
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
         <h1 className='text-2xl font-bold'>
           Meeting Setup
         </h1>
         <VideoPreview/>
         <div className='flex h-16 items-center justify-center gap-3 '>
         <label htmlFor="" className='flex items-center justify-center font-medium'>
            <input type="checkbox" checked={isMicCamToggled} onChange={(e)=>{
                setIsMicCamToggled(e.target.checked)
            }} name="" id="" />
            Join with mic and camera off
         </label>
         <DeviceSettings/>
         </div>

         <Button className='rounded-md bg-orange-500 px-4 py-2.5 flex items-center gap-2' onClick={()=>{
            call.join();
            setIsSetupComplete(true)
           }
            }>
          <Plus size={20} className='text-white'/>
           <span className='hidden md:block'>
           Join meeting
           </span>
         </Button>
    </div>
  )
}

export default MeetingSetup