import { MaterialReactTable } from "material-react-table";
import { getData, postData, serverURL } from "../../services/FetchNodeServices";
import { useEffect, useState } from "react";
import { useStyles } from "./DisplayAllExpertCss";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditExpert from "./EditExpert";
import EditExpertIcon from "./EditExpertIcon";
import Swal from "sweetalert2";


export default function DisplayAllExpert() {
    const classes = useStyles();

    const [expertList, setExpertList] = useState([]);
    const [rowData, setRowData] = useState({});
    const [refresh, setRefresh] = useState(false);
    // const [error, setError] = useState({})
    const [openEdit, setOpenEdit] = useState(false);
    const [openEditIcon, setOpenEditIcon] = useState(false);

    useEffect(() => {
        fetchAllExpert()
    }, [refresh]);

    const fetchAllExpert = async () => {
        var res = await getData("expert/fetch_all_expert");

        if (res.status) {
            setExpertList(res.data);
        } else {
            alert(res.message);
        }
    };

    const handleEditIcon = (row) => {
        setRowData(row.original);
        setOpenEditIcon(true);
    }

    const handleEdit = (row) => {
        // alert(JSON.stringify(row))
        setRowData(row.original);
        setOpenEdit(true);
    };

    const handleDelete = async (row) => {
        setRowData(row.original);

        Swal.fire({
            title: `Are you sure to delete the ${row.original.firstname} Expert?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
        }).then(async (result) => {
            if (result.isConfirmed) {

                var body = { expertid: row.original.expertid };
                var res = await postData("expert/delete_expert", body);

                if (res.status) {
                    Swal.fire(
                        "Deleted",
                        `${row.original.firstname} deleted successfully`,
                        "success"
                    );
                } else {
                    Swal.fire(
                        "Error",
                        res.message || "Something went wrong",
                        "error"
                    );
                }
                setRefresh(!refresh);
            }
        });
    };

    const showExpert = () => {
        return (
            <MaterialReactTable


                columns={[
                    { accessorKey: "expertid", header: "Expert Id", size: 100 },
                    { accessorKey: "categoryname", header: "Category" },
                    { accessorKey: "subcategoryname", header: "Sub Category" },
                    { accessorKey: "firstname", header: "First Name" },
                    { accessorKey: "lastname", header: "Last Name" },

                    { accessorKey: "mobileno", header: "Mobile No" },

                    { accessorKey: "aadharid", header: "Aadhar ID" },
                    { accessorKey: "panno", header: "Pan ID" },
                    { accessorKey: "vehicleno", header: "Vehicle No" },
                    { accessorKey: "licenseno", header: "License No" },
                    {
                        header: "Aadhar Card", Cell: ({ row }) => (
                            <div>
                                <img src={`${serverURL}/images/${row.original.aadharfile}`} alt="aadharimage" style={{ width: 40 }} />
                            </div>
                        ),
                    },
                    {
                        header: "Pan Card", Cell: ({ row }) => (
                            <div>
                                <img src={`${serverURL}/images/${row.original.panfile}`} alt="panimage" style={{ width: 40 }} />
                            </div>
                        ),
                    },
                    {
                        header: "License", Cell: ({ row }) => (
                            <div>
                                <img src={`${serverURL}/images/${row.original.licensefile}`} alt="licenseimage" style={{ width: 40 }} />
                            </div>
                        ),
                    },
                    {
                        header: "Expert Photo", Cell: ({ row }) => (
                            <div>
                                <img src={`${serverURL}/images/${row.original.photograph}`} alt="cateimage" style={{ width: 40 }} />
                            </div>
                        ),
                    },
                    {
                        header: "Actions",enableSorting:false, Cell: ({ row }) => (
                            <div style={{ display: "flex", gap: "5px", }}>
                        <Tooltip title="Edit Icon">
                            <IconButton onClick={() => handleEditIcon(row)}>
                                <img
                                    src="/cityicon.png"
                                    style={{ width: "35px" }}
                                    alt="iconimage"
                                />
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
                        ),
                    },
                ]}
                data={expertList}
                renderTopToolbarCustomActions={() => {
                    return (
                        <div className={classes.imageWrapper} style={{ display: "flex", width: "55%", justifyContent: "space-between", }}>
                            <img className={classes.imageStyle} src="./wcll.png" alt="logo" />
                            <span className={classes.headingText}>Expert List</span>
                        </div>
                    );
                }}

                enableColumnResizing
                enableStickyHeader
                layoutMode="grid"
                // enableRowActions
                // positionActionsColumn="last"
                // renderRowActions={({ row, table }) => (
                //     <div style={{ display: "flex", gap: "5px", }}>
                //         <Tooltip title="Edit Icon">
                //             <IconButton onClick={() => handleEditIcon(row)}>
                //                 <img
                //                     src="/cityicon.png"
                //                     style={{ width: "35px" }}
                //                     alt="iconimage"
                //                 />
                //             </IconButton>
                //         </Tooltip>
                //         <Tooltip title="Edit">
                //             <IconButton onClick={() => handleEdit(row)}>
                //                 <EditIcon color="primary" />
                //             </IconButton>
                //         </Tooltip>
                //         <Tooltip title="Delete">
                //             <IconButton onClick={() => handleDelete(row)}>
                //                 <DeleteIcon color="error" />
                //             </IconButton>
                //         </Tooltip>
                //     </div>
                // )}
            />
        );
    };

    return (
        <div className={classes.root}>
            <div className={classes.box}>{showExpert()}</div>
            <div>
                {openEdit && <EditExpert refresh={refresh} setRefresh={setRefresh} rowData={rowData} openEdit={openEdit} setOpenEdit={setOpenEdit} />}
                <EditExpertIcon refresh={refresh} setRefresh={setRefresh} rowData={rowData} openEditIcon={openEditIcon} setOpenEditIcon={setOpenEditIcon}/>
            </div>

        </div>
    );
}