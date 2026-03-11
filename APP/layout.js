import "./globals.css"

export const metadata = {
 title: "MZ Football AI Predictor"
}

export default function RootLayout({ children }) {
 return (
  <html>
   <body className="bg-black text-white">
    {children}
   </body>
  </html>
 )
}
