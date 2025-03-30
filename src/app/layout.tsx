import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

import { SessionProvider } from "next-auth/react";
import AuthComponent from "@/components/AuthComponent";
export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<SessionProvider>
					<div className="flex flex-col items-center text-center h-screen max-h-screen p-5">
						<AuthComponent>{children}</AuthComponent>
					</div>
				</SessionProvider>
			</body>
		</html>
	);
}
