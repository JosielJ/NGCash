import { useState} from "react";
import { IUser } from "../../interfaces";
import { api } from "../../providers";
import { UserService } from "../../services/UserService";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({children}: {children: JSX.Element}) => {
    const [user, setUser] = useState<User | null>(null);
    const [accountID, setAccountID] = useState("");
    const [verify, setVerify] = useState(false);
    const token = localStorage.getItem("authToken");
    const usernameToken = localStorage.getItem("username");

    async function getUserData(username:IUser) {
        const { status, data }: any = await UserService.userData(username).catch(function (error) {
            if (error.response) {
              //console.log(error.response.data.message);
              if ( error.response.data.message === "Account not found!"){
                //console.log("Erro ao carregar dados sobre a conta")
              }
            } else if (error.request) {
            };
        });

        if ( status === 201){

            setUser(data);
            //console.log(data);
        };
    };

    if (!verify){

        if (token){

            api.defaults.headers.Authorization = `Bearer ${token}`;

            if (usernameToken){

                const username = {
                    username: usernameToken
                };

                getUserData(username);
                setVerify(true);
            };
        };
    };

    const logout = () => {
        localStorage.removeItem("authToken");

        localStorage.removeItem("username");
        
        api.defaults.headers.Authorization = `Bearer ${localStorage.getItem("authToken")}`;

        setUser(null);
        setVerify(false);
        
    };

    const setToken = (token: string) =>{
        localStorage.setItem("authToken", token);

        api.defaults.headers.Authorization = `Bearer ${localStorage.getItem("authToken")}`;
    };



    return(
        <AuthContext.Provider value={{user, logout, setToken, verify, accountID, setAccountID}}>
            {children}
        </AuthContext.Provider>
    );
};