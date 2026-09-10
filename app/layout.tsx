import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata:Metadata={title:"IngatlanScan",description:"Digitális ingatlanfelmérés mobilon és weben.",manifest:"/manifest.webmanifest"};
export const viewport:Viewport={width:"device-width",initialScale:1,themeColor:"#090a0a"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="hu"><body>{children}</body></html>}
