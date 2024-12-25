import React,{useState,createContext, ReactNode,useEffect} from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
    user: UserProps;
    isSignedIn:boolean
    signIn: (credentials:SignInProps) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (credentials:SignUpProps) => Promise<void>;
};

type SignUpProps = {
    name:string;
    email:string;
    password:string
    phone:string
}
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

    useEffect(()=>{
        async function getUser(){

           const userInfo = await AsyncStorage.getItem('@Salon');
           let hasUser:UserProps = JSON.parse(userInfo || '{}');

           if(Object.keys(hasUser).length > 0){
           api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

            setUser({
                id:hasUser.id,
                name:hasUser.name,
                email:hasUser.email,
                token:hasUser.token
            })
           }

        }

        getUser()

    },[]);


    async function signIn({email,password}:SignInProps){
         try{

            const response = await api.post('/login',{
                email,
                password
            })

           // console.log(response.data)

           const {id , name , token} = response.data

           const data = {
            ...response.data
           }

           await AsyncStorage.setItem('@salon',JSON.stringify(data))

           api.defaults.headers.common['Authorization'] = `Bearer ${token}`

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

    async function signOut(){

        await AsyncStorage.clear()
        .then(()=>{
            setUser({
                id:'',
                name:'',
                email:'',
                token:''
            })
        })
    }


    return(
        <AuthContext.Provider value={{user,isSignedIn,signIn,signOut}} >
         {children}
        </AuthContext.Provider>
    )
}