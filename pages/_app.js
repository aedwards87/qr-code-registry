import Layout from "../components/Layout"
import { GlobalStyles } from "../styles/GlobalStyles"
import { NavMenuToggleProvider } from "../hooks"
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import { useEffect } from "react";
import { AuthUserProvider } from "../hooks/context/useAuthContext";

function MyApp({ Component, pageProps }) {


  return (
    <AuthUserProvider>
      <NavMenuToggleProvider>
        <Layout>
          <GlobalStyles />
          <Component {...pageProps} />
        </Layout>
      </NavMenuToggleProvider>
    </AuthUserProvider>
  )
}

export default MyApp
