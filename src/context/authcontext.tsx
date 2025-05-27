// context/AuthContext.tsx
import { createContext, JSX, useContext, useState } from "react";


type AuthContextType = {
  user: string;
  setUser: (user: string) => void;
  userid: string;
  setUserid: (userid: string) => void;
};
const AuthContext = createContext<AuthContextType>({user:'', userid:'', setUser:()=>{},setUserid:()=>{}});

export const AuthProvider = ({ children }: {children: JSX.Element}) => {
  const [user, setUser] = useState(''); 
  const[userid,setUserid]=useState('')

  return (
    <AuthContext.Provider value={{ user, setUser ,userid,setUserid}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
