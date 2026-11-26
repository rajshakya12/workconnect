import { MaterialReactTable } from "material-react-table";
import { postData, getData, serverURL } from "../../services/FetchNodeServices";
import { useEffect, useState } from "react";
import { useStyles } from "./DisplayAllCategoryCss";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCategory from "./EditCategory";
import EditCategoryIcon from "./EditCategoryIcon";
import Swal from "sweetalert2";
// import EditCategoryIcon from "./IconEdit";

export default function DisplayAllCategory() {
    const classes = useStyles();

    const [categoryList, setCategoryList] = useState([]);
    const [rowData, setRowData] = useState({});
    const [refresh, setRefresh] = useState(false);

    const [openEdit, setOpenEdit] = useState(false);
    const [openEditIcon, setOpenEditIcon] = useState(false);

    useEffect(() => {
        fetchAllCategory();
    }, [refresh]);

    const fetchAllCategory = async () => {
        var res = await getData("category/fetch_all_category");

        if (res.status) {
            setCategoryList(res.data);
        } else {
            alert(res.message);
        }
    };

    const handleEdit = (row) => {
        // alert(JSON.stringify(row))
        setRowData(row.original);
        setOpenEdit(true);
    };
    const handleDelete = async (row) => {
        setRowData(row.original);
        Swal.fire({
            title: `Are you sure to delete the ${row.original.categoryname} category?`,
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                var body = { categoryid: row.original.categoryid };
                var res = await postData("category/delete_category", body);
                if (res.status) { Swal.fire(`${row.original.categoryname} deleted successfully`, "Success"); }
                setRefresh(!refresh);
            } else if (result.isDenied) {
            }
        });
    };
    const handleEditIcon = (row) => {
        setRowData(row.original);
        setOpenEditIcon(true);
    };

    const showCategory = () => {
        return (
            <MaterialReactTable
                columns={[
                    { accessorKey: "categoryid", header: "Category Id", size: 100 },
                    { accessorKey: "categoryname", header: "Category" },
                    {
                        header: "Image", Cell: ({ row }) => (
                            <div>
                                <img src={`${serverURL}/images/${row.original.categoryicon}`} alt="cateimage" style={{ width: 40 }} />
                            </div>
                        ),
                    },
                ]}
                data={categoryList}
                renderTopToolbarCustomActions={() => {
                    return (
                        <div className={classes.imageWrapper} style={{display: "flex", width: "55%", justifyContent: "space-between",}}>
                            <img className={classes.imageStyle} src="./wcll.png" alt="logo" />
                            <span className={classes.headingTexT}>Category List</span>
                        </div>
                    );
                }}
                enableRowActions
                positionActionsColumn="last"
                renderRowActions={({ row, table }) => (
                    <div style={{ display: "flex", gap: "5px" }}>
                        <Tooltip title="Edit Icon">
                            <IconButton onClick={() => handleEditIcon(row)}>
                                <img
                                    src="/categoryicon.png"
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
                )}
            />
        );
    };

    return (
        <div className={classes.root}>
            <div className={classes.box}>{showCategory()}</div>
            <EditCategory refresh={refresh} setRefresh={setRefresh} rowData={rowData} openEdit={openEdit} setOpenEdit={setOpenEdit} />
            <EditCategoryIcon refresh={refresh} setRefresh={setRefresh} rowData={rowData} openEditIcon={openEditIcon} setOpenEditIcon={setOpenEditIcon} /> 
        </div>
    );
}
