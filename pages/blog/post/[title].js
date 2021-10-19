import React, {useEffect} from 'react';
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import firebase from "../../../firebase/firebase";
import "firebase/firestore";

import "prismjs/components/prism-go";
import "prismjs/components/prism-python";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-css";
import Navbar from "../../../components/Navbar/Navbar";
import Head from "next/head";
import Footer from "../../../components/Footer/Footer";
import {useRouter} from "next/router";
import ErrorPage from "next/error";


const BlogPost = ({post}) => {
    if (post == null) {
        return <ErrorPage statusCode={404} />
    }

    const router = useRouter();

    const handleClick = (e) => {
        let node = e.target.parentNode;
        let codeNode = node.parentNode.childNodes[1].childNodes[0];
        let content = codeNode.textContent;

        let temp = document.createElement("textarea");
        temp.style = "display: none;";
        temp.value = content;
        navigator.clipboard.writeText(temp.value);
        temp.remove();

        let btn = node.parentNode.childNodes[0].childNodes[0];
        btn.className = "btn btn-success btn-sm";
        btn.innerHTML = "Kopyalandı!";
        setTimeout(() => {
            btn.className = "btn btn-primary btn-sm";
            btn.innerHTML = "<i class=\"fa fa-clone\" aria-hidden=\"true\"></i> Kopyala";
        }, 2000);
    };

    useEffect(() => {
        Prism.highlightAll();
        let pres = document.getElementsByTagName("pre");
        for (let pre of pres) {
            let parent = pre.parentNode;
            let wrapper = document.createElement("div");
            parent.replaceChild(wrapper, pre);
            wrapper.style = "position: relative";

            let container = document.createElement("div");
            container.className = "copy-container";
            container.style = "z-index: 999;"
            let btn = document.createElement("label");
            btn.className = "btn btn-primary btn-sm";
            btn.innerHTML = "<i class=\"fa fa-clone\" aria-hidden=\"true\"></i> Kopyala";
            btn.onclick = (event) => handleClick(event);
            container.appendChild(btn);

            wrapper.appendChild(container);
            wrapper.appendChild(pre);
        }
    }, []);

    return (
        <React.Fragment>
            {post &&
            <Head>
                <meta name="twitter:card" content={`${post.description}`}/>
                <meta name="twitter:site" content="@ahmeterenboyaci"/>
                <meta name="twitter:creator" content="@ahmeterenboyaci"/>
                <meta property="og:url" content={router.pathname}/>
                <meta property="og:title" content={`${post.title} - Ahmet Eren BOYACI`}/>
                <meta property="og:description" content={`Ahmet Eren BOYACI - ${post.description}`}/>
                <meta property="og:image" content={post.imageUrl}/>
                <title>{post.title} - Ahmet Eren BOYACI</title>
                <meta name={"description"} content={"Ahmet Eren BOYACI - " + post.description}/>
                <link rel={"stylesheet"} href={"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"} />
            </Head>
            }
            <Navbar/>
            {post &&
            <React.Fragment>
                <div className="jumbotron jumbotron-fluid hero-section"
                     style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)), url(${post.imageUrl})`}}>
                    <div className="container text-center">
                        <h1 className="display-3">{post.title}</h1>
                    </div>
                </div>
                <div id="post-content" className="container mb-5">
                    <div className="row no-gutters justify-content-center">
                        <div className="col-md-10 col-sm-12 p-sm-2">
                            <div dangerouslySetInnerHTML={{__html: post.html}}>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </React.Fragment>
            }
        </React.Fragment>
    );
};

export async function getServerSideProps(context) {
    const title = context.params.title;
    let post = null;

    const firestore = firebase.firestore();
    const response = await firestore.collection("content").where("title", "==", title).get();
    if (response.size > 0) {
        response.forEach((doc) => {
            const data = doc.data();
            post = {...doc.data()}
        });
    }

    return {
        props: {
            post
        }
    }
}

export default BlogPost;