import { useState } from "react";
import { motion } from "framer-motion";
import "./Register.scss";
import { RegisterService } from "../services";
import { IRegister } from "../interfaces";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { InputError } from "../components/InputError/InputError";
import { passwordReq, usernameVal } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import FloatLogo from "../components/floatlogo";


export default function Register(){
    const [isValid, setIsValid] = useState(false);
    const [created, setCreated] = useState(false)

    const navigate = useNavigate();

    const validationSchema = yup.object({
        username: yup.string().required().min(3).max(20).matches(usernameVal),
        password: yup.string().required().min(8).max(25).matches(passwordReq),
        passwordv: yup.string().required().oneOf([yup.ref('password'), null])
    });

    async function onSubmit(value: IRegister){
        
        const registerDataUsername = value.username;
        const registerDataPassword = value.password;

        const registerData = {
            username: registerDataUsername,
            password: registerDataPassword
        };

        const { status, data }: any = await RegisterService.registerUser(registerData).catch(function (error) {
            if (error.response) {
              if ( error.response.data.message === "Username already used!"){
                setIsValid(true);
              }
            } else if (error.request) {
            };
        })
        if ( status === 201){
            setCreated(true)
            setTimeout( () => {
                navigate("/");
            }, 2000);

        };
    };

    function onError(error: any) {

    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });
    return (
        <div className="register-container">
            <div className="register-logo">
                <FloatLogo/>
            </div>
            <div className="register-grid">
                <div className="register-grid-header">
                    <h2>Criar conta</h2>
                </div>
                {isValid && <div className="invalid">Nome de usuário já usado</div>}
                <div className="register-grid-fiel-input">
                    <form onSubmit={handleSubmit(onSubmit, onError)} >
                        <div className="register-grid-fiel-input-username">
                            <input placeholder="Nome de usuário" id="username" {...register("username")}/>
                        </div>
                        {errors?.username?.type && <InputError type={errors.username.type} field="username"/>}
                        <div className="register-grid-fiel-input-password">
                            <input placeholder="Senha" type="password" id="password" {...register("password")}/>
                        </div>
                        {errors?.password?.type && <InputError type={errors.password.type} field="password"/>} 
                        <div className="register-grid-fiel-input-password">
                            <input placeholder="Repetir senha" type="password" id="passwordv" {...register("passwordv")}/>
                        </div>
                        {errors?.passwordv?.type && <InputError type={errors.passwordv.type} field="passwordv"/>}
                        <div className="register-grid-button">
                            <motion.button type="submit" whileHover={{cursor: "pointer", scale: 1.02, backgroundColor: "#8d45ff"}} whileTap={{scale: 0.98, backgroundColor: "#550bcc"}}>
                                Criar
                            </motion.button>
                        </div>
                        {created && <div className="register-sucess"><h2>Conta criada com sucesso</h2></div>}
                    </form>
                </div>
                <div className="register-grid-footer">
                    <h4>
                        Não consegue fazer login? 
                    </h4>
                    <motion.h4 onClick={() => {navigate("/")}} whileHover={{cursor: "pointer", scale: 1.02, color: "#0fff47"}} whileTap={{scale: 0.98, color: "#00ae29"}}>
                        Iniciar sessão
                    </motion.h4>
                </div>
            </div>
        </div>
    );
};