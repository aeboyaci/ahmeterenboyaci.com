import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import firebase from "../../firebase/firebase";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const DashboardList = ({changePage}) => {
    document.title = "Gönderilerim - Ahmet Eren BOYACI";
    const firestore = firebase.firestore();

    const columns = [
        { field: "id", headerName: "ID", width: 350 },
        { field: "title", headerName: "Başlık", width: 250 },
        { field: "createdAt", headerName: "Tarih", width: 250 },
        { field: "isActive", headerName: "Aktif", width: 250 },
    ];

    const infoRef = firestore.collection("info");
    const [posts] = useCollectionData(infoRef);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (posts) {
            let tmp = [];
            posts.forEach((post) => {
                tmp = [
                    ...tmp,
                    {
                        id: post.postId,
                        title: post.title,
                        isActive: post.isActive,
                        createdAt: post.createdAt.toDate().toLocaleString(),
                    },
                ];
            });
            setRows(tmp);
        }
    }, [posts]);

    const onRowClick = (RowParams) => {
        console.log(RowParams.row.id);
        changePage("edit", RowParams.row.id);
    };

    return (
        <React.Fragment>
            <div className="row">
                <div className="col col-md-10 mx-auto">
                    <h2 style={{ marginBottom: "1.5rem" }}>Gönderilerim</h2>
                    <div style={{ height: 560, width: "100%" }}>
                        {posts && (
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                onRowClick={onRowClick}
                            />
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default DashboardList;
