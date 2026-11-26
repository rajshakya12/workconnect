import {MaterialReactTable,useMaterialReactTable} from  'material-react-table';
import { postData,getData } from '../../services/FetchNodeServices';
import { useEffect,useState,useMemo } from "react";
import { useStyles } from "./DisplayAllCss";
import { IconButton,Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaceEdit from './PlaceEdit';
import Swal from 'sweetalert2';
export default function DisplayAllPlace()
{   const classes=useStyles()
    
    const [placeList,setPlaceList]=useState([])
    //const [openStatus,setOpenStatus]=useState(false)
    const [rowData,setRowData]=useState({})
    const [refresh,setRefresh]=useState(false)
    const [openPlaceEdit, setOpenPlaceEdit] = useState(false);
    

    useEffect(()=>{
        fetchPlaceData()
    },[])

    useEffect(()=>{
        fetchPlaceData()
    },[refresh])

    const fetchPlaceData=async()=>{
    var res=await getData('places/fetch_all_places')
    if(res.status)
    {
        setPlaceList(res.data)
    }
    else
    {
        alert(res.message)
    }
}

    const handleEdit=(row)=>{
        //alert(JSON.stringify(row))
        setRowData(row.original)
        //setOpenStatus(true)
        setOpenPlaceEdit(true)

    }   


    const handleDelete=async(row)=>{
        var body={placeid:row.original.placeid}
    var res=await postData('places/delete_place',body)

    if(res.status)
    {
        Swal.fire({
  title: `Are You Sure to Delete the Selected Place ${row.original.placename}?`,
  showCancelButton: true,
  confirmButtonText: "Delete",
 
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(`${row.original.placename} deleted Successfully`, "", "success");
    setRefresh(!refresh)
  } else if (result.isDenied) {
    
  }
});
    }
}

    const showPlace=()=>{
        return (<MaterialReactTable 
         columns={[{accessorKey:"placeid",header:'PlaceId',size:100},
                 {accessorKey:"placename",header:'PlaceName',size:100},
                 {accessorKey:"pincode",header:'PinCode',size:100},
                 
 ]} data={placeList}
    renderTopToolbarCustomActions={()=>{
        return  <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-between'}}>
                    <img src='/logo.png' className={classes.imageStyle}/>
                    <span className={classes.headingText}>Place Lists</span>
                </div>
    }}
    enableRowActions={true}
    positionActionsColumn='last'
    renderRowActions={({row,table})=>{
        return(
            <div style={{display:'flex',gap:"5px"}}>
                
                <Tooltip title="Edit">
                    <IconButton onClick={()=>handleEdit(row)}>
                        <EditIcon color="primary" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                     <IconButton onClick={()=>/*console.log(row.original)*/handleDelete(row)}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Tooltip>
            </div>
        )
    }}
    />
    )
    }
       
    
    return(<div className={classes.root}>
        <div className={classes.box}>
        {showPlace()}
        </div>
        <PlaceEdit 
            refresh={refresh} 
            setRefresh={setRefresh} 
            rowData={rowData} 
            /*openStatus={openStatus} 
            setOpenStatus={setOpenStatus}*/
            openStatus={openPlaceEdit}
            setOpenStatus={setOpenPlaceEdit}
        />

        
    </div>)
}
