import StreamVedioProvdier from '@/providers/StreamClientprovider'
import React, { ReactNode } from 'react'

const RootLayout = ({children}:{children:ReactNode}) => {
  return (
    <main>
      <StreamVedioProvdier>
      {
        children
        }
      </StreamVedioProvdier>
      
    </main>
  )
}
export default RootLayout