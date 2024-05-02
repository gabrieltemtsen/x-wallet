   
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
        import { useEffect, useState } from 'react';
import Loader from '../../components/X-Loader';
const Index = () => {
    const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useAuth0();
  const [delayComplete, setDelayComplete] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayComplete(true);
    }, 4500); // 4.5 seconds delay

    return () => clearTimeout(timer);
  }, []);

  if(!delayComplete) {
    return (
     <Loader />
    );
  }
  return (
    
    <Layout>
        <Navbar  title="X-wallet" />

        <div className='flex flex-col m-3 align-center justify-center items-center '>

          <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  
    <div class="flex flex-col items-center m-3 pb-10">
        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="prof"/>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white"> {user?.name}  </h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">X-Wallet Holder</span>
        <div class="flex mt-4 md:mt-6">
            <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Logout</a>
            {/* <a href="#" class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Message</a> */}
        </div>
    </div>
</div>
          </div>
          <BlockTitle>Settings</BlockTitle>
      <List strong strongIos outlineIos className=''>
        <ListItem  link title="Reset Pin" after="" />
        <ListItem className='mt-3'  link title="Change Password" after="" />
        <ListItem className='mt-3'  link title="Update Pin" />
      </List>

        




    </Layout>
  )
}

export default Index