import React from "react";
import firebase from "../../firebase/firebase";
import "firebase/firestore";
import Navbar from "../../components/Navbar/Navbar";
import Head from "next/head";
import PostCard from "../../components/Blog/PostCard";

const Blog = ({ posts }) => {
	return (
		<React.Fragment>
			<Head>
				<meta property={"og:title"} content={"Blog - Ahmet Eren BOYACI"} />
				<meta
					property={"og:description"}
					content={"Ahmet Eren BOYACI - Siber güvenlik alanına yönelik teknik yazıları paylaştığım blog sayfasıdır."}
				/>
				<title>Blog - Ahmet Eren BOYACI</title>
				<meta
					name="description"
					content="Ahmet Eren BOYACI - Siber güvenlik alanına yönelik teknik yazıları paylaştığım blog sayfasıdır."
				/>
			</Head>
			<Navbar />
			<div id={"hero-blog"} className="jumbotron jumbotron-fluid hero-section">
				<div className="container text-center">
					<h1 className="display-3">Blog</h1>
				</div>
			</div>

			<section className="p-3 main-section-blog">
				<div className="container">
					<div className="row mb-3">
						<h3>GÖNDERİLER</h3>
					</div>
					<div className="row">
						<div className="album py-3">
							<div className="container">
								<div className="row">
									{posts &&
										posts.length > 0 &&
										posts.map((post, idx) => {
											return (
												<PostCard
													key={idx}
													imageUrl={post.imageUrl}
													title={post.title}
													description={post.description}
													postedAt={post.createdAt}
												/>
											);
										})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</React.Fragment>
	);
};

export async function getServerSideProps(context) {
	const firestore = firebase.firestore();
	const infoRef = firestore.collection("info").orderBy("createdAt", "desc");
	const response = await infoRef.get();
	const result = [];

	response.forEach((doc) => {
		if (doc.exists) {
			const data = doc.data();
			const parts = data.createdAt.toDate().toISOString().substring(0, 10).split("-")
			const date = {day: parts[2], month: parts[1], year: parts[0]};
			result.push({ ...data, createdAt: `${date.day}/${date.month}/${date.year}` });
		}
	});

	return {
		props: { posts: result },
	};
}

export default Blog;
