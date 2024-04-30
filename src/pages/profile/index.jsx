   
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
const Index = () => {
    const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useAuth0();
  return (
    
    <Layout>
        <Navbar  title="X-wallet" />

        hello {user?.name}

    </Layout>
  )
}

export default Index