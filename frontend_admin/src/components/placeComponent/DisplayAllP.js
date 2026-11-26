import MaterialTable from "@material-table/core";
import { getData,serverURL } from "../../services/fetchNodeServices";
import { useEffect,useState } from "react";
import { useStyles } from "./DisplayAllCss";
export default function DisplayAllP()
{   const classes=useStyles()
    
    const [placeList,setPlaceList]=useState([])

    useEffect(()=>{
        fetchPlaceData()
    },[])

    const fetchPlaceData=async()=>{
    var res=await getData('city/fetch_all_places')
    if(res.status)
    {
        setPlaceList(res.data)
    }
    else
    {
        alert(res.message)
    }
}

    const showPlace=()=>{
        return(<MaterialTable
        title="List of Places"
        columns={[{title:"PlaceId",field:'placeid'},
                  {title:"Place Name",field:'placename'},          
                  {title:"Pin Code",field:'pincode'},          
                ]}

        data={placeList}
        
        />)
    }
    
    return(<div className={classes.root}>
        <div className={classes.box}>
        {showPlace()}
        </div>
    </div>)
}
