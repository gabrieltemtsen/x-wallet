   
        // Konsta UI components
        import Layout from '@/components/Layout';
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
      import Auth from './auth';
      import useStoreUserEffect from "../hooks/useStoreUserEffect";
      import { useState } from 'react';

      const tokens = [
        {
          id: 1,
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png',
          title: 'Ethereum (ETH)',
          price: 3200,
          balance: 2.5,
        },
        {
          id: 2,
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png',
          title: 'USD Coin (USDC)',
          price: 1.0,
          balance: 10000,
        },
        {
          id: 3,
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png',
          title: 'Binance Coin (BNB)',
          price: 400,
          balance: 5,
        },
      ];
      const nfts = [
        {
          id: 1,
          image: 'https://example.com/nft-image1.png',
          title: 'CryptoPunk #1234',
          description: 'Rare CryptoPunk with sunglasses',
          price: 5.0,
        },
        {
          id: 2,
          image: 'https://example.com/nft-image2.png',
          title: 'Art Blocks #5678',
          description: 'Generative art piece',
          price: 10.0,
        },
        {
          id: 3,
          image: 'https://example.com/nft-image3.png',
          title: 'Decentraland Parcel',
          description: 'Virtual land in Decentraland',
          price: 100.0,
        },
      ];
        
        export default function Home() {
          const { isLoading, isAuthenticated } = useConvexAuth();
          const { user } = useAuth0();
          const userId = useStoreUserEffect();
          const [activeTab, setActiveTab] = useState('token');


          if (!isAuthenticated) {
            return (
              <Auth />
            );
          }

           
          return (
            <Layout>
               <Navbar  title="X-wallet" />
               <Block strong>
              
                <div className='flex flex-col m-3 align-center justify-center items-center '>
                <span className='text-lg font-bold'>
                      WALLET
                    </span>
                  <div className='flex flex-row m-3 p-4 gap-10 justify-center'>
                    
                    <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-3xl w-7.9 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>France</option>
                    <option>Germany</option>
                    </select>

                    <Button className=' w-2/2 max-w-sm'>
                      add Wallet
                    </Button>

                  </div>
                  <span className='text-lg font-bold'> $ 0 </span>
                </div>
                  
               </Block>
               <BlockTitle>Block Title</BlockTitle>

               <Block>Add here</Block>
               <div className='flex flex-row border-bottom'>

               <TabbarLink
          active={activeTab === 'token'}
          onClick={() => setActiveTab('token')}
          className={activeTab === 'token' ? 'border-b border-gray-800' : ''}
          
          label={'Tokens'}
        />
        <TabbarLink
          active={activeTab === 'nft'}
          onClick={() => setActiveTab('nft')}
          className={activeTab === 'nft' ? 'border-b border-gray-800' : ''}

          
          label={'NFT'}
        />
      </div>
      {activeTab === 'token' && (
        <> 
        <div className="flex justify-between w-full p-8">
         <div className="flex flex-col items-center">
           <span className="text-3xl mb-2">&#10148;</span>
           <p className="text-md">Send</p>
         </div>
         <div className="flex flex-col items-center">
           <span className="text-3xl mb-2">&#128230;</span>
           <p className="text-md">Receive</p>
         </div>
         <div className="flex flex-col items-center">
           <span className="text-3xl mb-2">&#8646;</span>
           <p className="text-md">Swap</p>
         </div>
       </div> 
        <Block>
        {tokens.map(token => (
        <div key={token.id} className="flex items-center p-4 border-b border-gray-300">
          <img src={token.logo} alt={token.title} className="w-12 h-12 mr-4" />
          <div>
            <h2 className="text-xl font-semibold mb-1">{token.title}</h2>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Price:</p>
                <p className="text-gray-600">Balance:</p>
              </div>
              <div>
                <p className="text-gray-600">${token.price}</p>
                <p className="text-gray-600">{token.balance} {token.title.split(' ')[0]}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      </Block>
        </>
        
       
        )}

        {activeTab === 'nft' && (
          <>
          {nfts.map(nft => (
        <div key={nft.id} className="flex items-center p-4 border-b border-gray-300">
          <img src={nft.image} alt={nft.title} className="w-16 h-16 mr-4" />
          <div>
            <h2 className="text-xl font-semibold mb-1">{nft.title}</h2>
            <p className="text-gray-600 mb-1">{nft.description}</p>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Price:</p>
              </div>
              <div>
                <p className="text-gray-600">${nft.price}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
          </>
        )}

     
              </Layout>
          );
        }
        
        