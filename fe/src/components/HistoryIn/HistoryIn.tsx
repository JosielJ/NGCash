import { useContext, useEffect, useState } from "react";
import { BiArrowFromLeft } from "react-icons/bi";
import { AuthContext } from "../../context/Auth/AuthContext";
import { AccountService } from "../../services";
import HistoryData from "./HistoryData";
import "./HistoryIn.scss";

export default function HistoryIn(id: any){
    const [isI, setIsI] = useState(true);
    const [isD, setIsD] = useState(false);
    const [trasnferData, setTransferData] = useState();
    const [transferIn, setTransferIn] = useState(true);
    const [loading, setLoading] = useState(true);
    
    const auth = useContext(AuthContext);

    async function getAccount(accountData: any){

        const id = {
            id: accountData
        }
        
        const { status, data }: any = await AccountService.accountData(id)

            if(status === 201) {
                const result = data.accountUser.username
                console.log(result.toString())
                return (result.toString())
            }
    };

    async function onLoad(){
        if (transferIn === true) {
            const accountData = {
                id: auth.accountID
            };
    
            const { status, data }: any = await AccountService.accountData(accountData).catch(function (error) {
                if (error.response) {
                    if ( error.response.data.message === "User not found!"){
    
                    };
                }   else if (error.request) {
                };
            }) ;
            if (status === 201){
                setTransferData(data.account.transactionsC.reverse())
                setTransferIn(false)
            };
        };
    };




    function Dec(){

        if(isI === true){
            // @ts-expect-error
            trasnferData.reverse();
            setLoading(true);
            setIsI(false)
            setIsD(true)
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        };
    };

    function Inc(){

        if(isD === true){
            // @ts-expect-error
            trasnferData.reverse();
            setLoading(true);
            setIsD(false)
            setIsI(true)
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        };
    };

    useEffect(() => {

        onLoad();


        setTimeout(() => {
            setLoading(false);

        }, 2000);
    });

    return(
        
        <div className="historyin-container">
            <div className="historyin-order">
                <h2>Odernar por data: </h2>
                {isI && <div onClick={Inc} className="historyin-order-ord-selected"><h3>Recente</h3></div>}
                {!isI && <div onClick={Inc} className="historyin-order-ord"><h3>Recente</h3></div>}
                <div className="historyin-order-ord"><h3>/</h3></div>
                {isD && <div onClick={Dec} className="historyin-order-ord-selected"><h3>Antigo</h3></div>}
                {!isD &&  <div onClick={Dec} className="historyin-order-ord"><h3>Antigo</h3></div>}
            </div>
            <div className="historyin-table">
                <h2>De</h2><BiArrowFromLeft/><h2>Para</h2><h2>Valor</h2><h2>Data</h2>
            </div>
                {loading ? (<h2 className="loading">Carregando...</h2>):
                // @ts-expect-error
                trasnferData.map((data, index) => {
                                            // @ts-expect-error
                    return (<HistoryData da={trasnferData[index].debitedAccountId}
                        ca={
                        // @ts-expect-error
                        trasnferData[index].creditedAccountId}
                        date={
                        // @ts-expect-error
                        trasnferData[index].createdAt.slice(0, 10)}
                        key={index}
                        value={
                        // @ts-expect-error
                        trasnferData[index].value}
                    />)
                })}
        </div>
    );
};