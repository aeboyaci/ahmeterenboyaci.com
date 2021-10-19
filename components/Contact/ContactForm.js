import React, {useRef, useState} from "react";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import {useField} from "formik";
import {Button, Collapse, IconButton} from "@material-ui/core";
import axios from "axios";
import {Alert, AlertTitle} from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import ReCAPTCHA from "react-google-recaptcha";


const CustomTextField = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className={"form-group"}>
            <label>{label}</label>
            <input className={`form-control ${meta.touched && meta.error && "is-invalid"}`} {...field} {...props} />
            <div className={"invalid-feedback"}>
                <span>{meta.error}</span>
            </div>
        </div>
    );
};

const CustomTextArea = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className={"form-group"}>
            <label>{label}</label>
            <textarea rows={"3"}
                      className={`form-control ${meta.touched && meta.error && "is-invalid"}`} {...field} {...props} />
            <div className={"invalid-feedback"}>
                <span>{meta.error}</span>
            </div>
        </div>
    );
};

const ContactForm = () => {
    const [robot, setRobot] = useState(false);
    const [response, setResponse] = useState({result: "", message: ""});
    const ref = useRef(null);

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required("Ad boş bırakılamaz."),
        lastName: Yup.string()
            .required("Soyad boş bırakılamaz."),
        email: Yup.string().email("Geçersiz e-mail formatı.").required("E-mail boş bırakılamaz."),
        message: Yup.string().required("Mesaj boş bırakılamaz.")
    });

    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                message: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
                const token = ref.current.getValue();

                axios.post("https://ahmeterenboyaci.com/api/mail", {...values, token}).then(() => {
                    resetForm({
                        firstName: "",
                        lastName: "",
                        email: "",
                        message: ""
                    });
                    ref.current.reset();
                    setResponse({result: "success", message: "Mesajınız iletilmiştir."})
                    setRobot(false);
                }).catch((err) => {
                    if (err.response) {
                        if (err.response.status === 500) {
                            setResponse({result: "error", message: "Mail sunucusunda bir hata meydana geldi. Lütfen daha sonra tekrar deneyin."})
                        }
                        else if (err.response.status === 400) {
                            ref.current.reset();
                            setRobot(true);
                        }
                    }
                });
            }}
        >
            {(formik) => (
                <React.Fragment>
                    <Form>
                        {response.result !== "" &&
                        <Collapse in={response.result !== ""}>
                            <Alert
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setResponse({result: "", message: ""})
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit"/>
                                    </IconButton>
                                }
                                style={{marginBottom: "1rem"}}
                                severity={response.result}>
                                <AlertTitle>{response.result === "success" ? "Başarılı!" : "Hata!"}</AlertTitle>
                                Mesajınız iletilmiştir.
                            </Alert>
                        </Collapse>
                        }
                        <CustomTextField label={"Adınız"} name="firstName" type="text"/>
                        <CustomTextField label={"Soyadınız"} name="lastName" type="text"/>
                        <CustomTextField label={"E-mail Adresiniz"} name="email" type="email"/>
                        <CustomTextArea label={"Mesajınız"} name={"message"} type={"text"}/>
                        <div className={"mb-2"}>
                            <ReCAPTCHA ref={ref} sitekey={"6LdRE6IaAAAAAOHyt3QLmSVFCSb8zG5KduJ-C8XO"}/>
                            {robot &&
                            <span style={{color: "red", fontSize: "12.8px"}}>Robot olmadığınızı doğrulayın.</span>
                            }
                        </div>
                        <Button fullWidth={true} type={"submit"} variant={"contained"} color={"primary"}>Gönder</Button>
                    </Form>
                </React.Fragment>
            )}
        </Formik>
    );
};

export default ContactForm;