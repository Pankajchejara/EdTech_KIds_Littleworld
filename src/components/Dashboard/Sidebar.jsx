import React from 'react'

import { NavLink,matchPath, useLocation } from 'react-router-dom';

const Sidebar = ({link}) => {

  
  let location =useLocation();
const matchRoute = (route) => {
    return matchPath({path:route}, location.pathname);
}




  return (
    
<NavLink to={link.path}>
     <div className={`py-[8px] ${matchRoute(link.path) ? "bg-yellow-800 border-l-yellow-100 border-l-[2px] text-yellow-100" :"bg-opacity-0"} text-center`}>
  {link.name}
   
     </div>
     </NavLink>
  )
}



export default Sidebar
