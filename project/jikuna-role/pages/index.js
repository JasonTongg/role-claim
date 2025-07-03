// pages/index.tsx
import React from "react";
import DiscordLogin from "../components/DiscordLogin";
import "../app/globals.css";
import Image from "next/image";
import Discord from "../public/discord.png";
import Logo from "../public/Logo2.webp";
import Head from "next/head";

const HomePage = () => {
	return (
		<div className="bg-bg">
			<Head>
				<title>Jikuna Role</title>
			</Head>
			<video autoPlay loop muted playsInline className="bg-video">
				<source src="./background2.webm" type="video/webm" />
			</video>
			<Image src={Logo}
				style={{
					position: "fixed",
					top: "10px",
					left: "10px",
					width: "100px",
					height: "auto"
				}}
			></Image>
			<div className="container">
				<Image src={Discord}
					alt="Discord Logo"
					width={100}
					height={100}
					style={{ opacity: "0.8" }} />
				<DiscordLogin />
			</div>
		</div>
	);
};

export default HomePage;
