import React,{useState,createContext, ReactNode} from "react";
import { api } from "../services/api";

type AuthContextData = {
    user: UserProps;
    isSignedIn:boolean
    signIn: (credentials:SignInProps) => Promise<void>;
};

type UserProps = {
    id:string;
    name: string;
    email: string;
    token:string
};

type AuthProviderProps = {
    children:ReactNode
}

type SignInProps = {
    email:string;
    password:string
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}:AuthProviderProps){
    const [user, setUser] = useState<UserProps>({
        id:'',
        name: '',
        email: '',
        token: ''
    });

    const isSignedIn = !!user.name;

    async function signIn({email,password}:SignInProps){
         try{
            const response = await api.post('/login',{
                email,
                password
            })

           // console.log(response.data)

           const {id , name , token} = response.data

           setUser({
            id,
            name,
            email,
            token
           })

         }catch(err){
            console.log(err);
         }
    }


    return(
        <AuthContext.Provider value={{user,isSignedIn,signIn}} >
         {children}
        </AuthContext.Provider>
    )
}