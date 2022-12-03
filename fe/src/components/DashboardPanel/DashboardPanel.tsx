import { motion } from "framer-motion";
import { AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineHistory } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth/AuthContext";
import "./DashboardPanel.scss";
import { IAccount } from "../../interfaces";
import { AccountService } from "../../services";
import { useNavigate } from "react-router-dom";
import DashboardTransfer from "../DashboardTransfer/DashboardTransfer";
import DashboardDeposit from "../DashboardDeposit/DashboardDeposit";
import DashboardHistory from "../DashboardHistory/DashboardHistory";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function DashboardPanel(){
    const [balance, setBalance] = useState("0");
    const [tp, setTp] = useState(true);
    const [dp, setDp] = useState(false);
    const [hp, setHp] = useState(false);


    const auth = useContext(AuthContext);

    const accountId = auth.user?.accountId;

    const navigate = useNavigate();

    const id = {
        id: accountId
    };

    function logoutSubmit(){
        auth.logout();
        navigate("/");
    };

    function setTransferPainel(){
        if(tp === false){
            setHp(false)
            setDp(false)
            setTp(true)
        };
        if(tp === true){
            setTp(false)
        };

        if(auth.user?.accountId){
            auth.setAccountID(auth.user?.accountId);
        };
    };

    function setDepositPainel(){
        if(dp === false){
            setTp(false)
            setHp(false)
            setDp(true)
        };
        if(dp === true){
            setDp(false)
        };

        if(auth.user?.accountId){
            auth.setAccountID(auth.user?.accountId);
        };
    };

    function setHistoryPainel(){
        if(hp === false){
            setTp(false)
            setDp(false)
            setHp(true)
        };
        if(hp === true){
            setHp(false)
        };


        if(auth.user?.accountId){
            auth.setAccountID(auth.user?.accountId);
        };
    };

    async function GetData(id: IAccount){

        const { status, data }: any = await AccountService.accountData(id).catch(function (error) {
            if (error.response) {
              console.log(error.response.data.message);
              if ( error.response.data.message === "Account not found!"){
              }
            } else if (error.request) {
            };
        });

        if ( status === 201){
            setBalance(data.account.balance);
        };
    };

    useEffect(() => {

        GetData(id)
        
        if(auth.user?.accountId){
            auth.setAccountID(auth.user?.accountId);
        };

    }, []);

    return (
        <div className="dashboardpanel-container">
            <div className="dashboardpanel-grid-top">
                <div className="dashboardpanel-grid-balance">
                    <Canvas>
                        <Stars radius={120} depth={30} count={7000} factor={6} saturation={0} fade speed={1}/>
                    </Canvas>
                    <div className="dashboardpanel-grid-balance-data">
                        <h3>Saldo</h3>
                        <h2>R$ {balance}</h2>
                        </div>
                    </div>
                <div className="dashboardpanel-grid-user">
                    <div className="dashboardpanel-grid-user-data">
                        <h2>Nome de usuário:</h2>
                        <h3>{auth.user?.username}</h3>
                        <h2>Id da conta:</h2>
                        <h3>{auth.user?.accountId}</h3>
                    </div>
                    <div className="dashboardpanel-grid-user-logout">
                        <motion.button onClick={logoutSubmit}>
                            Sair
                        </motion.button>
                    </div>
                </div>
            </div>
            <div className="dashboardpanel-grid-mid">
                {tp && <motion.h2 className="dashboardpanel-grid-mid-selected" onClick={setTransferPainel} whileHover={{cursor: "pointer", scale: 1.02, color: "#8d45ff",}} whileTap={{scale: 0.98, color: "#550bcc"}}>Transferir <AiOutlineArrowDown/></motion.h2>}
                {!tp && <motion.h2 className="" onClick={setTransferPainel} whileHover={{cursor: "pointer", scale: 1.02, color: "#8d45ff",}} whileTap={{scale: 0.98, color: "#550bcc"}}>Transferir <AiOutlineArrowDown/></motion.h2>}
                {dp && <motion.h2 className="dashboardpanel-grid-mid-selected" onClick={setDepositPainel} whileHover={{cursor: "pointer", scale: 1.02, color: "#8d45ff",}} whileTap={{scale: 0.98, color: "#550bcc"}}>Depositar <AiOutlineArrowUp/></motion.h2>}
                {!dp && <motion.h2 className="" onClick={setDepositPainel} whileHover={{cursor: "pointer", scale: 1.02, color: "#8d45ff",}} whileTap={{scale: 0.98, color: "#550bcc"}}>Depositar <AiOutlineArrowUp/></motion.h2>}
                {hp && <motion.h2 className="dashboardpanel-grid-mid-selected" onClick={setHistoryPainel} whileHover={{cursor: "pointer", scale: 1.02, color: "#8d45ff",}} whileTap={{scale: 0.98, color: "#550bcc"}}>Histórico <AiOutlineHistory/></motion.h2>}
                {!hp && <motion.h2 className="" onClick={setHistoryPainel} whileHover={{cursor: "pointer", scale: 1.02, color: "#8d45ff",}} whileTap={{scale: 0.98, color: "#550bcc"}}>Histórico <AiOutlineHistory/></motion.h2>}            
            </div>
            {tp && <DashboardTransfer id={accountId} />}
            {dp && <DashboardDeposit id={accountId}/>}
            {hp && <DashboardHistory id={accountId}/>}
        </div>
    );
};