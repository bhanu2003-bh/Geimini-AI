import UserContext from "./UserContext";
import { useState } from "react";


function UserContextProvider ({children}){

const  [result, setresult] = useState('');    


return (
<UserContext.Provider  value={{result,setresult}}>
{children}
</UserContext.Provider>
);

}

export default UserContextProvider;