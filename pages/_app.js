import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import NProgress from "nprogress";
import Router from "next/router";
import "nprogress/nprogress.css";
import Head from "next/head";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#1976D2",
		},
		secondary: {
			main: "#CC4125",
		},
	},
});

export function reportWebVitals(metric) {
	console.log(metric);
}

function MyApp({ Component, pageProps }) {
	NProgress.configure({
		minimum: 0.3,
		easing: "ease",
		speed: 800,
		showSpinner: false,
	});

	Router.events.on("routeChangeStart", () => NProgress.start());
	Router.events.on("routeChangeComplete", () => NProgress.done());
	Router.events.on("routeChangeError", () => NProgress.done());

	return (
		<ThemeProvider theme={theme}>
			<Head>
				<meta name="twitter:card" content={`Ahmet Eren BOYACI'nın siber güvenlik blogu.`} />
				<meta name="twitter:site" content="@aeboyaci" />
				<meta name="twitter:creator" content="@aeboyaci" />
				<meta name={"twitter:image"} content={"https://blog-next.vercel.app/images/about-me.png"} />
				<meta property="og:url" content="https://blog-next.vercel.app/" />
				<meta property="og:title" content={`Ahmet Eren BOYACI`} />
				<meta
					property="og:description"
					content={`Ahmet Eren BOYACI - TOBB ETÜ Bilgisayar Mühendisliği 2.sınıf öğrencisiyim. Cross Platfrom Fully Undetectable malwarelar geliştirebilmekteyim. Malware geliştirmek dışında halihazırda bulunan ve yaygın olarak kullanılan malwareları gizleyecek Crypter'lar geliştirebilmekteyim.`}
				/>
				<meta property="og:image" content={"https://blog-next.vercel.app/images/about-me.png"} />
				<meta httpEquiv="content-language" content={"tr"} />
				<title>Ahmet Eren BOYACI</title>
			</Head>
			<Component {...pageProps} />

			<script
				src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
				integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
				crossOrigin="anonymous"
			/>
			<script
				src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
				integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns"
				crossOrigin="anonymous"
			/>
		</ThemeProvider>
	);
}

export default MyApp;
