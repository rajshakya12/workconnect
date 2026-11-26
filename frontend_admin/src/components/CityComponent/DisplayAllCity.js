import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { getData, postData, serverURL } from "../../services/FetchNodeServices";
import { useEffect, useMemo, useState } from "react";
import { useStyles } from "./DisplayAllCss";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';

import CityEdit from "./CityEdit";
import CityIconEdit from "./CityIconEdit";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
export default function DisplayAllCity() {
  const classes = useStyles();
  const navigate=useNavigate()
  const [cityList, setCityList] = useState([]);
  const [openStatus, setOpenStatus] = useState(false);
  const [rowData, setRowData] = useState({});
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    fetchCityData();
  }, []);

  useEffect(() => {
    fetchCityData();
  }, [refresh]);

  const fetchCityData = async () => {
    var res = await getData("city/fetch_all_city");
    if (res.status) {
      setCityList(res.data);
    } else {
      alert(res.message);
    }
  };

  const handleEdit = (row) => {
    //alert(JSON.stringify(row))
    setRowData(row.original);
    setOpenStatus(true);
  };
  const handleDelete = async(row) => {
    var body={cityid:row.original.cityid}
    var res=await postData('city/delete_city',body)
    if(res.status) 
    {

      Swal.fire({
  title: `Are you sure to delete the selected city ${row.original.cityname}?`,
  
  showCancelButton: true,
  confirmButtonText: "Delete",
  
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire( `${row.original.cityname} deleted successfully`, "success");
    
    setRefresh(!refresh)
  } else if (result.isDenied) {
    
  }
});
    }

    
  };
  const handleEditIcon = (row) => {
    //alert(JSON.stringify(row))
    setRowData(row.original);
    setOpenStatus(true);
  };

  const showCity = () => {
    return (
      <MaterialReactTable
        columns={[
          { accessorKey: "cityid", header: "CityId", size: 100 },
          { header: "City Name", accessorKey: "cityname" },
          {
            header: "Image",
            Cell: ({ renderedCellValue, row }) => (
              <div>
                <img
                  src={`${serverURL}/images/${row.original.cityicon}`}
                  style={{ width: 40 }}
                />
              </div>
            ),
          },
        ]}
        data={cityList}
        renderTopToolbarCustomActions={() => {
          return (
            <div style={{display:"flex",justifyContent:'space-between',width:'100%',alignItems:'center'}}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src="/logo.png" className={classes.imageStyle} />
              <span className={classes.haedingText}>City List</span>
            </div>
            <IconButton
         
        
        onClick={() => {
          // Logic to open a modal or add a row
            navigate('/dashboard/city')
        }}
      >
        <Tooltip title="Add New City">
        <AddIcon />
        </Tooltip>
      </IconButton>  
     
     
            </div>
          );
        }}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={({ row, table }) => (
          <div style={{ display: "flex", gap: "5px" }}>
            <Tooltip title="Edit Icon">
              <IconButton onClick={() => handleEditIcon(row)}>
                <img src="/image-editing.png" style={{width:25}} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Edit">
              <IconButton onClick={() => handleEdit(row)}>
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton onClick={() => handleDelete(row)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </div>
        )}
      />
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>{showCity()}</div>
      <CityEdit
        refresh={refresh}
        setRefresh={setRefresh}
        rowData={rowData}
        openStatus={openStatus}
        setOpenStatus={setOpenStatus}
      />
      <CityIconEdit
         refresh={refresh}
        setRefresh={setRefresh}
        rowData={rowData}
        openStatus={openStatus}
        setOpenStatus={setOpenStatus}
      />
    </div>
  );
}
