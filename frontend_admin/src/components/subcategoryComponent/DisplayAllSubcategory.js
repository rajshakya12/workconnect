import {MaterialReactTable,useMaterialReactTable} from  'material-react-table';
import { getData,postData,serverURL } from "../../services/FetchNodeServices";
import { useEffect,useState,useMemo } from "react";
import { useStyles } from "./DisplayAllSubcategoryCss";
import { IconButton,Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SubCategoryEdit from './SubCategoryEdit';
import SubCategoryIconEdit from './SubCategoryIconEdit';
import Swal from 'sweetalert2';
export default function DisplayAllSubCategory()
{   const classes=useStyles()
    
    const [subcategoryList,setSubcategoryList]=useState([])
    //const [openStatus,setOpenStatus]=useState(false)
    const [rowData,setRowData]=useState({})
    const [refresh,setRefresh]=useState(false)
    const [openSubCategoryEdit,setOpenSubCategoryEdit]=useState(false);
    const [openSubCategoryIconEdit,setOpenSubCategoryIconEdit]=useState(false);

    useEffect(()=>{
        fetchSubCategoryData()
    },[])

    useEffect(()=>{
        fetchSubCategoryData()
    },[refresh])

    const fetchSubCategoryData=async()=>{
    var res=await getData('subcategory/fetch_all_subcategory')
    if(res.status)
    {
        setSubcategoryList(res.data)
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
        setOpenSubCategoryEdit(true)

    }  
    
    
    const handleIconEdit=(row)=>{
        //alert(JSON.stringify(row))
        setRowData(row.original)
        //setOpenStatus(true)
        setOpenSubCategoryIconEdit(true)

    }


    const handleDelete=async(row)=>{
  Swal.fire({
    title: `Are You Sure to Delete the Selected Subcategory ${row.original.subcategoryname}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel"
  }).then(async (result) => {

    if (result.isConfirmed) {

      var body = { subcategoryid: row.original.subcategoryid }
      var res = await postData('subcategory/delete_subcategory', body)

      if (res.status) {
        Swal.fire(
          `${row.original.subcategoryname} deleted successfully`,
          "",
          "success"
        );
        setRefresh(!refresh)
      } else {
        Swal.fire("Error", "Failed to delete record", "error");
      }

    }
  });
}

    const showSubCategory=()=>{
        return (<MaterialReactTable 
         columns={[{accessorKey:"categoryid",header:'CategoryId',size:100},
                 {accessorKey:"subcategoryid",header:'SubCategoryId',size:100},
                 {accessorKey:"categoryname",header:'CategoryName',size:100},
                 {accessorKey:"subcategoryname",header:'SubCategoryName',size:100},
                  {header:'Image', Cell:({renderedCellValue,row})=> 
                                  <div style={{ display:'flex',alignItems:'center',gap:'8px' }}><img src={`${serverURL}/images/${row.original.subcategoryicon}`} style={{width:40}} />
                                  <Tooltip title="Edit Picture">
                                  <IconButton onClick={() => handleIconEdit(row)}>
                                     <img src="/image-edit.png" style={{ width: 20 }} />
                                  </IconButton>
                                  </Tooltip>
                                  </div>
                 
 } ]} data={subcategoryList}
    renderTopToolbarCustomActions={()=>{
        return  <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-between'}}>
                    <img src='/logo.png' className={classes.imageStyle}/>
                    <span className={classes.headingText}>SubCategory Lists</span>
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
        {showSubCategory()}
        </div>
        <SubCategoryEdit 
            refresh={refresh} 
            setRefresh={setRefresh} 
            rowData={rowData} 
            /*openStatus={openStatus} 
            setOpenStatus={setOpenStatus}*/
            openStatus={openSubCategoryEdit}
            setOpenStatus={setOpenSubCategoryEdit}
        />
        <SubCategoryIconEdit 
            refresh={refresh} 
            setRefresh={setRefresh} 
            rowData={rowData} 
            /*openStatus={openStatus} 
            setOpenStatus={setOpenStatus}*/
            openStatus={openSubCategoryIconEdit}
            setOpenStatus={setOpenSubCategoryIconEdit}
        />
        </div>)
}
