import "@/styles/globals.css";
import { App } from 'konsta/react';
import { Auth0Provider } from '@auth0/auth0-react';
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuth0 } from "convex/react-auth0";
const convex = new ConvexReactClient('https://brilliant-salmon-688.convex.cloud');
const authDomain = 'dev-3kvo8gurvbtg3koc.us.auth0.com' 
// process.env.NEXT_APP_AUTH0_DOMAIN 
const authClientId = 'PHGzChWplNnxn9QWG28nnkNiYVe2hKn2'

export default function MyApp({ Component, pageProps }) {
  return (
    <App theme="material">
       <Auth0Provider
    domain={authDomain}
    clientId={authClientId}
    authorizationParams={{
      redirect_uri: typeof window !== 'undefined' ? window.location.origin : undefined
    }}
    cacheLocation="localstorage"
  >
     <ConvexProviderWithAuth0 client={convex}>
       <Component {...pageProps} />
     </ConvexProviderWithAuth0>
         

  </Auth0Provider>
    </App>
  );
}
