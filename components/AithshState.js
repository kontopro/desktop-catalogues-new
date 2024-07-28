import { createContext, useState, useContext } from 'react';

const AithshStateContext = createContext();
const AithshStateProvider = AithshStateContext.Provider;

export const AithshProvider = ({ children }) => {
  
  const [aithsh, setAithsh] = useState([])

  function handleAithsh(id,ao,pn,pos,per){
    pos<1?
      removeAithsh(id):
        aithsh.findIndex(x=>x.id===id)<0?
          addAithsh(id,ao,pn,pos,per):
            updateAithsh(id,ao,pn,pos,per)
  }

  function updateAithsh(id,ao,pn,pos,per){
    const oldait = aithsh.filter(x=>x.id !== id)
    setAithsh([...oldait,{id,ao,pn,pos,per}])
  }

  function addAithsh(id,ao,pn,pos,per){ 
    setAithsh([...aithsh, {id,ao,pn,pos,per}])
  }

  function removeAithsh(id){
    const oldait = aithsh.filter(x=> x.id !== id)
    setAithsh([...oldait])
  }

  function resetAithsh(){
    setAithsh([])
  }

  return (
    <AithshStateProvider value={{aithsh, handleAithsh, resetAithsh}}>
      {children}
    </AithshStateProvider>
  )
  
}

export const useAithsh = () => useContext(AithshStateContext)