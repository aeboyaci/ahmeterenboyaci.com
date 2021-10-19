import React from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar/Navbar";

const About = () => {
	return (
		<React.Fragment>
			<Head>
				<meta property={"og:title"} content={"Hakkımda - Ahmet Eren BOYACI"} />
				<meta
					property={"og:description"}
					content={
						"Ahmet Eren BOYACI - TOBB ETÜ Bilgisayar Mühendisliği 2.sınıf öğrencisiyim. Cross Platfrom Fully Undetectable malwarelar geliştirebilmekteyim. Malware geliştirmek dışında halihazırda bulunan ve yaygın olarak kullanılan malwareları gizleyecek Crypter'lar geliştirebilmekteyim."
					}
				/>
				<title>Hakkımda - Ahmet Eren BOYACI</title>
				<meta
					name="description"
					content="Ahmet Eren BOYACI - TOBB ETÜ Bilgisayar Mühendisliği 2.sınıf öğrencisiyim. Cross Platfrom Fully Undetectable malwarelar geliştirebilmekteyim. Malware geliştirmek dışında halihazırda bulunan ve yaygın olarak kullanılan malwareları gizleyecek Crypter'lar geliştirebilmekteyim."
				/>
			</Head>

			<Navbar />
			<div id={"hero"} className="jumbotron jumbotron-fluid hero-section">
				<div className="container text-center">
					<h1 className="display-3">Hakkımda</h1>
				</div>
			</div>
			<section>
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-sm-12 mb-4">
							<img className="about-me-img" src={"/images/about-me.jpg"} alt="about-me resim" />
						</div>
						<div id={"about-container"} className="col-md-6 col-sm-12 mb-4">
							<p>
								Lise yıllarımdan beri siber g&uuml;venlik alanına &ccedil;ok b&uuml;y&uuml;k ilgim var ve bu alanda
								ilerlemek i&ccedil;in &ccedil;aba g&ouml;sterdim. Bu ilgim &uuml;zerine profesyonel ortamlarda
								g&ouml;rev alarak ve eğitimlere katılarak iyi bir temel oluşturdum. Amacım bu temelimi &uuml;st
								seviyelere &ccedil;ıkararak siber g&uuml;venlik alanında gelişmek. Bu doğrultuda Savunma Sanayii
								Başkanlığı himayesinde ger&ccedil;ekleştirilen Siber G&uuml;venlik Yaz Kampına katıldım. Kampın ilk
								saatlerinde Etucyber ile tanıştım ve katılımcı olarak gittiğim yaz kampına g&ouml;revli olarak devam
								ettim. Bu kamp i&ccedil;erisinde Siber G&uuml;venliğe Giriş eğitimini tamamladım ve etkinlikte
								g&ouml;rev aldığım i&ccedil;in diğer Etucyber ve Siber Kul&uuml;pler Birliği &uuml;yeleri ile birlikte
								Siber G&uuml;venlik K&uuml;melenmesi tarafından hazırlanmış bir teşekk&uuml;r belgesi aldım. Şu anda
								Cumhurbaşkanlığı Dijital D&ouml;n&uuml;ş&uuml;m Ofisi himayesinde ger&ccedil;ekleştirilen Sertifikalı
								Siber G&uuml;venlik Uzmanlığı Eğitimi'ni almaktayım.
							</p>
							<p>
								Evde oluşturduğum lab ortamında tryhackme, hackthebox gibi platformlardaki makinalara ve VulnHub'tan
								indirmiş olduğum zaafiyetli sistemlere sızarak sızma testi yeteneklerimi geliştirmekteyim. Ayrıca bir
								s&uuml;redir zararlı yazılımlar &uuml;zerinde &ccedil;alışmaktayım.
								<strong> Cross Platfrom Fully Undetectable</strong> malwarelar geliştirebilmekteyim. Malware geliştirmek
								dışında halihazırda bulunan ve yaygın olarak kullanılan malwareları gizleyecek
								<em> Crypter'lar</em> geliştirebilmekteyim. Son zamanlarda ise <em>crackme</em> uygulamaları ile
								uğraşmaktayım. B&ouml;ylece tersine m&uuml;hendislik bilgimi arttırıp zararlı yazılım bilgimi de
								kullanarak zararlı yazılım analizi yapmayı d&uuml;ş&uuml;n&uuml;yorum.
							</p>
							<p>
								Siber g&uuml;venlik çalışmalarım dışında ayrıca modern web uygulaması geliştirmeye y&ouml;nelik
								&ccedil;alışmalarım da mevcut. MERN stack yapısıyla veya Blazor ile full-stack modern web uygulamaları
								geliştirebilmekteyim.
							</p>
							<p>
								<Link href="/AhmetErenBoyaci_CV.pdf">
									<a target="_blank" className="cv-link">
										Özgeçmişi görüntüle
									</a>
								</Link>
							</p>
						</div>
					</div>
				</div>
			</section>
		</React.Fragment>
	);
};

export default About;
