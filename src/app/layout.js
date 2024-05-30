import "./globals.css"

export const metadata = {
  title: "Zillow Clone",
  description: "A Demo App",
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
