import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/contexts/cart/cart.context";

const getRedHatBold = localFont({
	src: "./assets/fonts/RedHatText-VariableFont_wght.ttf",
	variable: "--font-redhat",
	weight: "400, 600, 700",
});

export const metadata: Metadata = {
	title: "Product list with cart",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<CartProvider>
			<html lang="en">
				<body
					className={`${getRedHatBold.variable} antialiased container mx-auto md:px-4 bg-cart-rose-50`}
				>
					{children}
				</body>
			</html>
		</CartProvider>
	);
}
