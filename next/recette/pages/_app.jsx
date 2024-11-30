import "@/styles/globals.css";
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/100.css"; // Specify weight
import "@fontsource/poppins/200.css"; // Specify weight
import "@fontsource/poppins/300.css"; // Specify weight
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/700.css"; // Specify weight
import "@fontsource/poppins/900.css"; // Specify weight

import "@fontsource/poppins/100-italic.css"; // Specify weight and style
import "@fontsource/poppins/400-italic.css"; // Specify weight and style
import "@fontsource/poppins/700-italic.css"; // Specify weight and style
import "@fontsource/poppins/900-italic.css"; // Specify weight and style

import "@fontsource/dancing-script"; // Defaults to weight 400
import "@fontsource/dancing-script/400.css"; // Specify weight

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
