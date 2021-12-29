import "../styles/globals.css";

// App Context
import AppContext from "../context/AppContext";

function MyApp({ Component, pageProps }) {
  return (
    <AppContext>
      <Component {...pageProps} />
    </AppContext>
  );
}

export default MyApp;
