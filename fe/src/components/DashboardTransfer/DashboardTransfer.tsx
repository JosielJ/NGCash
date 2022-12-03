import { motion } from "framer-motion";
import { useState } from "react";
import { ITransfer } from "../../interfaces";
import { TransferService } from "../../services";
import * as yup from "yup";
import { InputError } from "../InputError/InputError";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth/AuthContext";
import "./DashboardTransfer.scss";
import { UserService } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { BiError, BiCheck } from "react-icons/bi";

export default function DashboardTransfer(id: any){
    const [dAccount, setDAccount] = useState("");
    const [cAccount, setCAccount] = useState("");
    const [buttonT, setButtonT] = useState("Transferir");
    const [eBalance, setEBalance] = useState(true);
    const [sameUser, setsameUser] = useState(false);
    const [buttonstatus, setButtonStatus] = useState(true);
    const [sucessOnTransfer, setSucessOnTransfer] = useState(false);
    const [errorOnTransfer, setErrorOnTransfer] = useState(false);
    const [errorOnFoudUser, setErrorOnFoudUser] = useState(false);


    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    function resetPageTransfer(){
        navigate(0);
    };

    const validationSchema = yup.object({
        usernameC: yup.string().required(),
        value: yup.string().required()
    });

    async function onSubmit(transfer: ITransfer){
        const transferCAccount = transfer.usernameC;

        setDAccount(id.id);

        const transferDataC = {
            username: transferCAccount
        };

        const { status, data }: any = await UserService.userData(transferDataC).catch(function (error) {
            if (error.response) {
                if ( error.response.data.message === "User not found!"){
                    setErrorOnFoudUser(true);
                    setButtonStatus(false);
                    setInterval(resetPageTransfer, 3500);
                };
            }   else if (error.request) {
            };
        }) 
        if (status === 201){
            
            setCAccount(data.accountId);
            const valueTransferString = transfer.value;

            // @ts-expect-error
            const valueTransfer = parseInt(valueTransferString, 10);
            
            const transferData = {
                debitedAccountId: dAccount,
                creditedAccountId: cAccount,
                value: valueTransfer
            };

            if (buttonT === "Transferir"){
                setButtonT("Confirmar");
            };

            if (buttonT === "Confirmar"){
                realizeTransfer(transferData);
                setButtonStatus(false);

                setInterval(resetPageTransfer, 3500);
            };
        };
    };

    async function realizeTransfer(transferData: any){
        const { status, data }: any = await TransferService.transferData(transferData).catch(function (error) {
            if (error.response) {
              console.log(error.response.data.message);
              if ( error.response.data.message === "Insufficient debited account balance!"){
                setEBalance(false);
                setErrorOnTransfer(true);
              }
              if ( error.response.data.message === "Unable to transfer to own account!"){
                setsameUser(true);
                setButtonT("Transferir");
                setErrorOnTransfer(true);
              }
            } else if (error.request) {
            };
        })

        if ( status === 201 ){
            setEBalance(true);
            setButtonT("Transferir");
            setSucessOnTransfer(true);
        };
    };


    function onError(error: any) {

    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    return(
        <div className="dashboardtransfer-container">
            <div className="dashboardtransfer-grid">
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <h2>
                        Transferir para
                    </h2>
                    <div className="dashboardtransfer-grid-input-username">
                        <input placeholder="Nome de usuário" id="usernameC" {...register("usernameC")}/>
                    </div>
                        {errors?.usernameC?.type && <InputError type={errors.usernameC.type} field="usernameC"/>}
                        {sameUser && <div className="field-error"><BiError/><h3>Impossível transferir para própria conta</h3></div>}
                        {errorOnFoudUser && <div className="field-error"><BiError/><h3>Erro ao encontrar usuário</h3></div>}
                    <h2>
                        Valor
                    </h2>
                    <div className="dashboardtransfer-grid-input-value">
                        <input placeholder="100" type="number" id="value" {...register("value")}/>
                    </div>
                    {errors?.value?.type && <InputError type={errors.value.type} field="value"/>}
                    {!eBalance && <div className="field-error"><BiError/><h3>Saldo insuficiente</h3></div>}
                    <div className="dashboardtransfer-grid-button">
                        {buttonstatus && <motion.button className="dashboardtransfer-grid-button-enabled" whileHover={{cursor: "pointer", scale: 1.02, backgroundColor: "#0fff47"}} whileTap={{scale: 0.98, backgroundColor: "#00ae29"}}>
                            {buttonT}
                        </motion.button>}
                        {!buttonstatus && <motion.button disabled className="dashboardtransfer-grid-button-disabled">
                            {buttonT}
                        </motion.button>}
                    </div>
                        {sucessOnTransfer && <div className="field-sucess"><BiCheck/><h3>Transferência realizada com sucesso!</h3></div>}
                        {errorOnTransfer && <div className="field-error"><BiError/><h3>Erro ao verificar dados</h3></div>}
                </form>
            </div>
        </div>
    )
}