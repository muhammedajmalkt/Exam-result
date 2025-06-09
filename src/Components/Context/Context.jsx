import React, { createContext, useState } from 'react'

export const Mycontext = createContext()
const Context = ({children}) => {
      const [result, setResult] = useState(null);
    
  return (
    <Mycontext.Provider value={{result,setResult}}>
      {children}
    </Mycontext.Provider>
  )
}

export default Context