   
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

       
          
        <section className="bg-center h-screen bg-cover bg-green-900 bg-no-repeat bg-blend-multiply" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1660139099083-03e0777ac6a7?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
  <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56 bg-opacity-60">
    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">A Seamless Wallet For All</h1>
    <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">X-wallet is a wallet powered by Circle that offers the best wallet services in the markets, wanna try it out click the button below to get started</p>
    <LoginButton />
  </div>
</section>




        {/* <div className='m-5 mt-10'>

        <BlockTitle>Please login or Sign up</BlockTitle>
      <Block  strong outlineIos className="space-y-2 max-w-sm">
     
        </Block>

       

        </div> */}

    </Layout>
  )
}

export default Auth