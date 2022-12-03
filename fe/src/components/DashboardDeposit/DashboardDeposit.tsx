import { motion } from "framer-motion";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth/AuthContext";
import "./DashboardDeposit.scss";
import { useNavigate } from "react-router-dom";
import { BiError, BiCheck } from "react-icons/bi";
import { DepositService } from "../../services";

export default function DashboardDeposit(id: any){
    const [value, setValue] = useState(0)
    const [idAccount, setIdAccount] = useState("")
    const [buttonT, setButtonT] = useState("Depositar")
    const [invalidValue, setInvalidValue] = useState(false)
    const [errorOnDeposit, setErrorOnDeposit] = useState(false)
    const [finishDeposit, setFinishDeposit] = useState(false)
    const [buttonstatus, setButtonStatus] = useState(true)

    const auth = useContext(AuthContext);

    const navigate = useNavigate()

    function resetPageDeposit(){
        navigate(0)
    }

    async function setDeposit(id:any){

        setIdAccount(id.id);

        const depositData = {
            id: idAccount,
            value: value
        };

        if (value === 0) {
            setInvalidValue(true)
        };

        if (value > 0) {
            if (buttonT === "Depositar"){
                setButtonT("Confirmar");
                setInvalidValue(false);
            };
    
            if (buttonT === "Confirmar"){
                const { status, data }: any = await DepositService.depositData(depositData).catch(function (error) {
                    if (error.response) {
                        setButtonStatus(false);
                        setErrorOnDeposit(true);
                        setInterval(resetPageDeposit, 3500);
                        //console.log(error.response.data.message);
                        if ( error.response.data.message === "Account not found!"){
                        }
                        } else if (error.request) {
                    };
                });
    
                if ( status === 201){
                    //console.log(data)
                    setFinishDeposit(true)
                    setButtonStatus(false)
                    setInterval(resetPageDeposit, 3500)
                };
            };
        };
    };

    return(
        <div className="dashboarddeposit-container">
            <div className="dashboarddeposit-grid">
                <div className="dashboarddeposit-grid-button">
                    <h2>Escolher valor</h2>
                    <motion.button className="dashboarddeposit-grid-button-btn" onClick={() => {setValue(10)}} whileHover={{cursor: "pointer", scale: 1.02, backgroundColor: "#f0f0f0"}} whileTap={{scale: 0.98, backgroundColor: "#c3c3c3"}}>
                    10
                    </motion.button>
                    <motion.button className="dashboarddeposit-grid-button-btn" onClick={() => {setValue(50)}} whileHover={{cursor: "pointer", scale: 1.02, backgroundColor: "#f0f0f0"}} whileTap={{scale: 0.98, backgroundColor: "#c3c3c3"}}>
                    50
                    </motion.button>
                    <motion.button className="dashboarddeposit-grid-button-btn" onClick={() => {setValue(100)}} whileHover={{cursor: "pointer", scale: 1.02, backgroundColor: "#f0f0f0"}} whileTap={{scale: 0.98, backgroundColor: "#c3c3c3"}}>
                    100
                    </motion.button>
                    {invalidValue && <div className="field-error"><BiError/><h3>Selecionar um valor</h3></div>}
                </div>
                <div className="dashboarddeposit-grid-value">
                    <h2>Depositar</h2>
                    <h4>{value}</h4>
                </div>
                <div className="dashboarddeposit-grid-button">
                    {buttonstatus && <motion.button onClick={() => {setDeposit(id)}} className="dashboarddeposit-grid-button-confirm-enabled" whileHover={{cursor: "pointer", scale: 1.02, backgroundColor: "#0fff47"}} whileTap={{scale: 0.98, backgroundColor: "#00ae29"}}>
                        {buttonT}
                        </motion.button>}
                    {!buttonstatus && <motion.button disabled className="dashboarddeposit-grid-button-confirm-disabled">
                        {buttonT}
                        </motion.button>}
                {finishDeposit && <div className="field-sucess"><BiCheck/><h3>Depósito efetuado com sucesso</h3></div>}
                {errorOnDeposit && <div className="field-error"><BiError/><h3>Erro ao depositar</h3></div>}
                </div>
            </div>
        </div>
    );
};