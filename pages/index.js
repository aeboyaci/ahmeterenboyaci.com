import React from "react";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import Link from "next/link";

const Index = () => {
	return (
		<React.Fragment>
			<Head>
				<meta property={"og:title"} content={"Ana Sayfa - Ahmet Eren BOYACI"} />
				<meta
					property={"og:description"}
					content={
						"Ahmet Eren BOYACI - TOBB Ekonomi ve Teknoloji Üniversitesi Bilgisayar Mühendisliği bölümünde okuyan, siber güvenlik alanı ile ilgilenen birisiyim. Bu blog sitemdir."
					}
				/>
				<meta
					name="description"
					content="Ahmet Eren BOYACI - TOBB Ekonomi ve Teknoloji Üniversitesi Bilgisayar Mühendisliği bölümünde okuyan, siber güvenlik alanı ile ilgilenen birisiyim. Bu blog sitemdir."
				/>
				<title>Ana Sayfa - Ahmet Eren BOYACI</title>
			</Head>

			<Navbar />
			<main role="main">
				<div id="index-main">
					<div className="container full-screen">
						<div className="row no-gutters full-screen">
							<div id="index-text-section" className="col mx-auto my-auto text-center">
								<main className="px-3">
									<h1>$ whoami</h1>
									<p className="lead">
										TOBB Ekonomi ve Teknoloji Üniversitesi Bilgisayar Mühendisliği öğrencisi
										<br />
										Siber Güvenlik alanında azimli ve meraklı bir öğrenci
									</p>
									<Link href={"/hakkimda"}>
										<a className="btn btn-lg btn-light btn-more">
											<strong>Daha Fazlası</strong>
										</a>
									</Link>
								</main>
							</div>
						</div>
					</div>
				</div>
			</main>
		</React.Fragment>
	);
};

export default Index;
