import React from "react";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import ContactForm from "../components/Contact/ContactForm";

const Contact = () => {
	return (
		<React.Fragment>
			<Head>
				<meta property={"og:title"} content={"İletişim - Ahmet Eren BOYACI"} />
				<meta
					property={"og:description"}
					content={"Ahmet Eren BOYACI - Benim ile iletişime geçebilmeniz için oluşturduğum iletişim sayfasıdır."}
				/>
				<title>İletişim - Ahmet Eren BOYACI</title>
				<meta
					name="description"
					content="Ahmet Eren BOYACI - Benim ile iletişime geçebilmeniz için oluşturduğum iletişim sayfasıdır."
				/>
			</Head>

			<Navbar />
			<div id="hero-contact" className="hero-section jumbotron jumbotron-fluid">
				<div className="container text-center">
					<h1 className="display-3">İLETİŞİM</h1>
				</div>
			</div>

			<div className="container">
				<div className="row no-gutters">
					<div className="col-md-5 col-sm-12 mx-auto p-sm-2">
						<div className="pb-5">
							<ContactForm />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Contact;
