   
        // Konsta UI components
        import Layout from '@/components/Layout';
import {
          Page,
          Navbar,
          Block,
          Button,
          List,
          ListItem,
          Link,
          BlockTitle,
        } from 'konsta/react';
        import { useConvexAuth } from "convex/react";
      import { useAuth0 } from "@auth0/auth0-react";
      import Auth from './auth';
      import useStoreUserEffect from "../hooks/useStoreUserEffect";

        
        export default function Home() {
          const { isLoading, isAuthenticated } = useConvexAuth();
          const { user } = useAuth0();
          const userId = useStoreUserEffect();


          if (!isAuthenticated) {
            return (
              <Auth />
            );
          }

           
          return (
            <Layout>
               <Navbar  title="X-wallet" />
              </Layout>
          );
        }
        
        