import { useState, useEffect } from "react";
import { BiArrowFromLeft } from "react-icons/bi";
import { AccountService } from "../../services";

export default function HistoryData(props: any){
    const [usernameD, setUsernameD] = useState();
    const [usernameC, setUsernameC] = useState();

    async function getCAccount(accountData: any){

        const id = {
            id: accountData
        }
        
        const { status, data }: any = await AccountService.accountData(id)

            if(status === 201) {
                setUsernameC(data.accountUser.username)
            }
    };

    async function getDAccount(accountData: any){

        const id = {
            id: accountData
        }
        
        const { status, data }: any = await AccountService.accountData(id)

            if(status === 201) {
                setUsernameD(data.accountUser.username)
            }
    };

    const {da, ca, date, value} = props

    useEffect(() => {

        getCAccount(ca);
        getDAccount(da)

    });

    return(
        
        <div className="historyout-table">
            <h2>{usernameD}</h2><BiArrowFromLeft/><h2>{usernameC}</h2><h2>{value}</h2><h2>{date}</h2>
        </div>
    );
};