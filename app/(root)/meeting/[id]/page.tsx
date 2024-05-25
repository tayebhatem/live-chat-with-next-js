'use client'

import { useGetCallById } from "@/Hooks/useGetCallById";
import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk"
import { useState } from "react";

const MeetingPage = ({params}:{params:{id:string}}) => {
    const {user,isLoaded}=useUser();
    const [isSetupComplete,setIsSetupComplete]=useState(false)
    const {call,isCallLoading}=useGetCallById(params.id)


    if(isCallLoading || !isLoaded) return <Loader/>
  return (
    <main className="h-screen w-full">
   <StreamCall call={call}>
    <StreamTheme>
     {
      !isSetupComplete?(
        <MeetingSetup setIsSetupComplete={setIsSetupComplete}/>
      ):(
       <MeetingRoom/>
      )
     }
    </StreamTheme>
   </StreamCall>
    </main>
  )
}

export default MeetingPage