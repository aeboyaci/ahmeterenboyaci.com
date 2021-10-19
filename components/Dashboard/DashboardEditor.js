import React, {useEffect, useState} from "react";
import {Editor} from "@tinymce/tinymce-react";
import {Button, Checkbox, TextField, FormControlLabel, Collapse, IconButton} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import firebase from "../../firebase/firebase";
import "firebase/firestore";
import {Alert, AlertTitle} from "@material-ui/lab";
import * as uuid from "uuid";

const DashboardEditor = ({mode, id}) => {
    const firestore = firebase.firestore();

    const [alert, setAlert] = useState({type: "", title: "", message: ""});

    const [post, setPost] = useState({
            title: "",
            imageUrl: "",
            description: "",
            isActive: false
        }
    );

    const [value, setValue] = useState("");
    const handleChange = (content, editor) => {
        setValue(content);
    };

    useEffect(() => {
        if (mode === "edit") {
            const query = firestore.collection("info").where("postId", "==", id).get();
            query.then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const temp = {
                        postId: data.postId,
                        title: data.title,
                        imageUrl: data.imageUrl,
                        description: data.description,
                        isActive: data.isActive,
                        createdAt: data.createdAt
                    }
                    console.log("Temp", temp);
                    const contentRef = firestore.collection("content").where("postId", "==", id).get();
                    contentRef.then((contentSnapshot) => {
                       contentSnapshot.forEach((doc) => {
                           const data = doc.data();
                           setPost({...temp});
                           setValue(data.html);
                       });
                    });
                });
            })
        }
    }, []);

    document.title =
        mode === "create"
            ? "Gönderi Ekle - Ahmet Eren BOYACI"
            : "Gönderi Düzenle - Ahmet Eren BOYACI";

    const handlePost = () => {
        const infoRef = firestore.collection("info");
        const contentRef = firestore.collection("content");

        if (mode === "create") {
            const postId = uuid.v4();
            infoRef
                .add({
                    postId,
                    imageUrl: post.imageUrl,
                    title: post.title,
                    description: post.description,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    isActive: post.isActive,
                })
                .then(() => {
                    contentRef.add({
                        postId,
                        imageUrl: post.imageUrl,
                        title: post.title,
                        description: post.description,
                        html: value
                    }).then(() => {
                        setAlert({
                            type: "success",
                            title: "Başarılı!",
                            message: "Gönderi başarıyla eklendi!",
                        });
                        setOpen(true);
                        setPost({
                            title: "",
                            imageUrl: "",
                            description: "",
                            isActive: false
                        });
                        setValue("");
                    }).catch(() => {
                        setAlert({
                            type: "error",
                            title: "Error!",
                            message:
                                "Gönderi eklenemedi! DB hatası meydana geldi, daha sonra tekrar deneyin.",
                        });
                        setOpen(true);
                    });
                })
                .catch(function (error) {
                    setAlert({
                        type: "error",
                        title: "Error!",
                        message:
                            "Gönderi eklenemedi! DB hatası meydana geldi, daha sonra tekrar deneyin.",
                    });
                    setOpen(true);
                });
        } else if (mode === "edit") {
            infoRef
                .doc(id)
                .set({
                    postId: id,
                    imageUrl: post.imageUrl,
                    title: post.title,
                    description: post.description,
                    isActive: post.isActive,
                    createdAt: post.createdAt
                })
                .then(function () {
                    contentRef
                        .doc(id)
                        .set({
                            postId: id,
                            imageUrl: post.imageUrl,
                            title: post.title,
                            description: post.description,
                            html: value
                        }).then(() => {
                        setAlert({
                            type: "success",
                            title: "Başarılı!",
                            message: "Gönderi başarıyla güncellendi!",
                        });
                        setOpen(true);
                    }).catch((error) => {
                        console.error(error);
                        setAlert({
                            type: "error",
                            title: "Error!",
                            message:
                                "Gönderi güncellenemedi! DB hatası meydana geldi, daha sonra tekrar deneyin.",
                        });
                        setOpen(true);
                    });
                })
                .catch(function (error) {
                    console.error(error);
                    setAlert({
                        type: "error",
                        title: "Error!",
                        message:
                            "Gönderi güncellenemedi! DB hatası meydana geldi, daha sonra tekrar deneyin.",
                    });
                    setOpen(true);
                });
        }
    };

    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <div className="row">
                <div className="col col-md-10 mx-auto">
                    {mode === "create" ? <h2>Gönderi Ekle</h2> : <h2>Gönderi Düzenle</h2>}
                    {alert.type && (
                        <Collapse in={open}>
                            <Alert
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setOpen(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit"/>
                                    </IconButton>
                                }
                                style={{marginBottom: "1.2rem"}}
                                severity={alert.type}>
                                <AlertTitle>{alert.title}</AlertTitle>
                                {alert.message}
                            </Alert>
                        </Collapse>
                    )}
                    <TextField
                        value={post.title}
                        onChange={(e) => setPost({...post, title: e.target.value})}
                        autoFocus={true}
                        label="Başlık"
                        name="title"
                        variant="outlined"
                        fullWidth
                        style={{marginBottom: "1rem", backgroundColor: "white"}}
                    />
                    <TextField
                        value={post.imageUrl}
                        onChange={(e) => setPost({...post, imageUrl: e.target.value})}
                        label="Resim URL"
                        name="imageUrl"
                        variant="outlined"
                        fullWidth
                        style={{marginBottom: "1rem", backgroundColor: "white"}}
                    />
                    <TextField
                        value={post.description}
                        onChange={(e) => setPost({...post, description: e.target.value})}
                        label="Açıklama"
                        name="imageUrl"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={5}
                        style={{marginBottom: "1rem", backgroundColor: "white"}}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={post.isActive}
                                onChange={(e) =>
                                    setPost({...post, isActive: e.target.checked})
                                }
                                color="primary"
                                name="active"
                            />
                        }
                        label="Aktif"
                    />
                    <Editor
                        value={value}
                        onEditorChange={handleChange}
                        apiKey="v8v2r3xiyn3wbvbjzs21anpm4y1zfz06y4a9ezccjzp6tccy"
                        init={{
                            height: "450",
                            selector: "textarea#full-featured",
                            plugins:
                                "print preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
                            mobile: {
                                plugins:
                                    "print preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons",
                            },
                            menubar: "file edit view insert format tools table tc help",
                            codesample_languages: [
                                {text: "Go", value: "go"},
                                {text: "Python", value: "python"},
                                {text: "Java", value: "java"},
                                {text: "HTML/XML", value: "markup"},
                                {text: "JavaScript", value: "javascript"},
                                {text: "CSS", value: "css"},
                                {text: "C", value: "c"},
                                {text: "C#", value: "csharp"},
                                {text: "C++", value: "cpp"},
                            ],
                            toolbar:
                                "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor casechange removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment",
                            quickbars_selection_toolbar: "bold italic | quicklink h2 h3 h4",
                        }}
                    />
                </div>
            </div>
            <div className="text-center" style={{marginTop: "1rem"}}>
                <Button
                    onClick={() => handlePost()}
                    variant="contained"
                    color="primary"
                    style={{width: "25rem"}}
                >
                    {mode === "create" ? "Ekle" : "Güncelle"}
                </Button>
                {mode === "edit" &&
                <a target={"_blank"} href={`/blog/post/${post.title}`} style={{textDecoration: "none"}}>
                    <Button
                        variant={"outlined"}
                        color={"primary"}
                        style={{marginLeft: "1.2rem"}}
                    >
                        Görüntüle
                    </Button>
                </a>
                }
            </div>
        </React.Fragment>
    );
};

export default DashboardEditor;
