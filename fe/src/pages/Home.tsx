import { useState } from "react";
import { motion } from "framer-motion";
import { IRegister } from "../interfaces";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "./Home.scss";
import { LoginService } from "../services/LoginService";
import { useContext } from "react";
import { AuthContext } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import FloatLogo from "../components/floatlogo";

export default function Home(){
    const [isValid, setIsValid] = useState(false);

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const validationSchema = yup.object({
        username: yup.string(),
        password: yup.string()
    });

    async function onSubmit(value: IRegister){

        const loginDataUsername = value.username;
        const loginDataPassword = value.password;

        const loginData = {
            username: loginDataUsername,
            password: loginDataPassword
        };

        const { status, data }: any = await LoginService.loginUser(loginData).catch(function (error) {
            if (error.response) {
              console.log(error.response.data.message);
              if ( error.response.data.message === "Incorrect Username and/or Password combination!"){
                setIsValid(true);
              }
            } else if (error.request) {
            };
        });

        if ( status === 201){
            
            auth.user = data.userData;

            auth.setToken(data.token);

            localStorage.setItem("username", data.userData.username);
            
            navigate("/dashboard");
        };
    };

    function onError(error: any) {

    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    if (auth.verify){
        navigate("/dashboard");
    };

    return (
        <div className="home-container">
            <motion.div className="home-logo">
                <FloatLogo/>
            </motion.div>
            <div className="home-grid">
                <div className="home-grid-header">
                    <h2>Iniciar sessão</h2>
                </div>
                {isValid && <div className="invalid">Usuário ou Senha inválido</div>}
                <div className="home-grid-fiel-input">
                    <form onSubmit={handleSubmit(onSubmit, onError)} >
                        <div className="home-grid-fiel-input-username">
                            <input placeholder="Nome de usuário" id="username" {...register("username")}/>
                        </div>
                        <div className="home-grid-fiel-input-password">
                            <input placeholder="Senha" type="password" id="password" {...register("password")}/>
                        </div>
                        <div className="home-grid-button">
                            <motion.button whileHover={{cursor: "pointer", scale: 1.02, backgroundColor: "#0fff47"}} whileTap={{scale: 0.98, backgroundColor: "#00ae29"}}>
                                Login
                            </motion.button>
                        </div>
                    </form>
                </div>
                <div className="home-grid-footer">
                    <h4>
                        Não consegue fazer login? 
                    </h4>
                    <motion.h4 onClick={() => {navigate("/register")}} whileHover={{cursor: "pointer", scale: 1.02, color: "#7d2cff"}} whileTap={{scale: 0.98, color: "#ff00ff"}}>
                        Criar conta 
                    </motion.h4>
                </div>
            </div>
        </div>
    );
};