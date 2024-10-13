import React from "react"

import { commonRoutes } from "./commonRoutes"

const MobileBar: React.FC = () => {
  const routesMobileAvaliable = commonRoutes.slice(0, 3)
  return (
    <div className='block sm:hidden fixed bottom-0 left-0 right-0'>
      <div className='flex flex-row justify-around bg-gray-800'>
        {routesMobileAvaliable.map((route) => (
          <a
            key={route.name}
            href={route.path}
            className='block p-4 rounded hover:bg-gray-700 text-white'
          >
            <route.icon />
          </a>
        ))}
      </div>
    </div>
  )
}

export default MobileBar
