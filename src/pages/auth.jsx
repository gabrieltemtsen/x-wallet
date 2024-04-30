   
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
        import LoginButton from "../components/Auth/LoginButton";
        import useStoreUserEffect from "../hooks/useStoreUserEffect";

const Auth = () => {
    const userId = useStoreUserEffect();
  return (

    <Layout>
        <Navbar  title="X-wallet" />
        <div className='m-5 mt-10'>

        <BlockTitle>Please login or Sign up</BlockTitle>
      <Block  strong outlineIos className="space-y-2 max-w-sm">
      <LoginButton />
        </Block>

       

        </div>

    </Layout>
  )
}

export default Auth