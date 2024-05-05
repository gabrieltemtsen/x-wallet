import Layout from '@/components/Layout'
import React from 'react'
   
        // Konsta UI components
import {
          Page,
          Navbar,
          Block,
          Button,
          List,
          TabbarLink,
          ListItem,
          Link,
          BlockTitle,
        } from 'konsta/react';
        import { useConvexAuth } from "convex/react";
      import { useAuth0 } from "@auth0/auth0-react";
      import Auth from '../auth';
      import useStoreUserEffect from "../../hooks/useStoreUserEffect";
      import { useEffect, useState } from 'react';
      import Loader from '../../components/X-Loader';
const Index = () => {
    const { isLoading, isAuthenticated } = useConvexAuth();
    const { user } = useAuth0();
    const userId = useStoreUserEffect();
    const [activeTab, setActiveTab] = useState('token');
    const [delayComplete, setDelayComplete] = useState(false);
    useEffect(() => {
      const timer = setTimeout(() => {
        setDelayComplete(true);
      }, 3000); // 3 seconds delay
  
      return () => clearTimeout(timer);
    }, []);

    if(!delayComplete) {
      return (
       <Loader />
      );
    }

    if (!isAuthenticated) {
        return (
          <Auth />
        );
      }
  return (
   <Layout>
    <Navbar  title="X-wallet" />

    Coming Soon!

    </Layout>
  )
}

export default Index