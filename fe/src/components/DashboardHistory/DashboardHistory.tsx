import { motion } from "framer-motion";
import { useState } from "react";
import { BiArrowFromTop } from "react-icons/bi";
import HistoryIn from "../HistoryIn/HistoryIn";
import HistoryOut from "../HistoryOut/HistoryOut";
import "./DashboardHistory.scss";

export default function DashboardHistory(id: any){
    const [accountId, setAccountId] = useState("");
    const [isIn, setIsIn] = useState(false);
    const [isOut, setIsOut] = useState(true);

    function setIn(){
        if (isOut === true){
            setIsOut(false);
            setIsIn(true);

        };
    };

    function setOut(){
        if (isIn === true){
            setIsIn(false);
            setIsOut(true);
        };
    };

    return(
        <div className="dashboardhistory-container">
            <div className="dashboardhistory-grid">
                <div className="dashboardhistory-grid-filter">
                    {isOut &&   <div onClick={setOut} className="dashboardhistory-grid-filter-out-selected">
                                    <motion.h2 whileHover={{cursor: "pointer", scale: 1.02, color: "#8d45ff"}} whileTap={{scale: 0.98, color: "#550bcc"}}>Saida<BiArrowFromTop/></motion.h2>
                                </div>}
                    {!isOut &&   <div onClick={setOut} className="dashboardhistory-grid-filter-out">
                                    <motion.h2 whileHover={{cursor: "pointer", scale: 1.02, color: "#8d45ff"}} whileTap={{scale: 0.98, color: "#550bcc"}}>Saida<BiArrowFromTop/></motion.h2>
                                </div>}
                    {isIn &&   <div onClick={setIn} className="dashboardhistory-grid-filter-in-selected">
                                    <motion.h2 whileHover={{cursor: "pointer", scale: 1.02, color: "#8d45ff"}} whileTap={{scale: 0.98, color: "#550bcc"}}>Entrada<BiArrowFromTop/></motion.h2>
                                </div>}
                    {!isIn &&   <div onClick={setIn} className="dashboardhistory-grid-filter-in">
                                    <motion.h2 whileHover={{cursor: "pointer", scale: 1.02, color: "#8d45ff"}} whileTap={{scale: 0.98, color: "#550bcc"}}>Entrada<BiArrowFromTop/></motion.h2>
                                </div>}
                </div>
                {isIn && <HistoryIn id={accountId}/>}
                {isOut && <HistoryOut id={accountId}/>}
            </div>
        </div>
    );
};