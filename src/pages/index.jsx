/* eslint-disable @next/next/no-img-element */
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Link,
  TabbarLink,
  Sheet,
  Preloader,
  Notification,
  BlockTitle,
  Toast,
  Chip,
} from "konsta/react";

        import { useConvexAuth } from "convex/react";
      import { useAuth0 } from "@auth0/auth0-react";
      import Auth from './auth';
      import useStoreUserEffect from "../hooks/useStoreUserEffect";
      import { use, useState } from 'react';
      import { useAction, useQuery, useMutation } from 'convex/react'
      import { api } from '../../convex/_generated/api'
      import { useEffect } from 'react';
import Loader from '@/components/X-Loader';
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
import { useUserContext } from "@/context/UserContext";

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
      let CircleClient;
      const CIRCLE_APP_ID = process.env.NEXT_PUBLIC_CIRCLE_APP_ID;

        
        export default function Home() {
          const {userId, userInfo} = useStoreUserEffect();
          const { user } = useAuth0();
          const { isLoading, isAuthenticated } = useConvexAuth();
          const router = useRouter();
          const updatePinState = useMutation(api.users.updatePinState);
          const {setData, userToken, encryptionKey, updateWalletId, walletId, uId} = useUserContext();
          const [selectedWallet, setSelectedWallet] = useState(null);
          const [tokensBalances, setTokensBalances] = useState([]);
          const [storedUserId, setStoredUserId] = useState('');
          
          const [sheetOpened, setSheetOpened] = useState(false);

          const [transferSheetOpened, setTransferSheetOpened] = useState(false);
          const [walletName, setWalletName] = useState("");
          const [walletDescription, setWalletDescription] = useState("");
          const [inTxn, setInTxn] = useState(false);
          const [userPinSet, setUserPinSet] = useState(false);
         
          const [activeTab, setActiveTab] = useState('token');
          const [delayComplete, setDelayComplete] = useState(false);
          const [wallets, setWallets] = useState([]);

          useEffect(() => {
            CircleClient = new W3SSdk();
          }, [userId, userToken, encryptionKey]);

          useEffect(() => {
            const storedUserIds = localStorage.getItem('newUid');
            if (storedUserIds) {
              setStoredUserId(storedUserIds);
            }
          }, []);

          async function executeChallenge() {
            console.log('Tryinggg')
            if (!storedUserId) {
              router.reload();
              return;
            }
            try {
              setInTxn(true);
              const response = await fetch('/api/wallet/createUser', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: storedUserId }),
              });
              
              if (response.ok) {
                const { data } = await response.json();
                const { userToken, encryptionKey, challengeId } = data;
                
                // console.log(userToken, encryptionKey, challengeId);

                setData(userToken, encryptionKey, userId, '');

                CircleClient.setAppSettings({
                  appId: CIRCLE_APP_ID,
                });
          
                CircleClient.setAuthentication({
                  encryptionKey,
                  userToken,
                });
          
                await new Promise((resolve, reject) => {
                  CircleClient.execute(challengeId, async (error) => {
                    if (error) {
                      alert(error?.message);
                      reject(error);
                    }
          
                    resolve(null);
                  });
                });
                setInTxn(false);
                
                const updatePinStateResponse = await updatePinState({id: userId});userId
              } else {
                console.error('Failed to create user');
                const data = await response.json();
                console.error(data.error);
                setInTxn(false);
              }
              
            } catch (error) {
              setInTxn(false);
              console.error('Error creating user:', error);
            }
          }

          const createWallet = async () => {
            try {
              setInTxn(true);
              const response = await fetch('/api/wallet/createWallet', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId, name: walletName, description: walletDescription, userToken }),
              });
          
              if (response.ok) {
                const { data } = await response.json();

                 const {challengeId} = data;
                 console.log(CIRCLE_APP_ID, 'chai')
                 console.log(challengeId)

                 CircleClient.setAppSettings({
                  appId: '3df1d810-6b73-551d-8cc9-7a3e90ba37ec',
                });
          
                CircleClient.setAuthentication({
                  encryptionKey,
                  userToken,
                });
          
                await new Promise((resolve, reject) => {
                  CircleClient.execute(challengeId, async (error) => {
                    if (error) {
                      alert(error?.message);
                      reject(error);
                    }
          
                    resolve(null);
                  });
                });

                
                
                // setWallets([...wallets, wallet]);
                alert('Wallet created successfully');
                getAllWallets();
                setSheetOpened(false);
                setInTxn(false);
              } else {
                console.error('Failed to create wallet');
                setInTxn(false);
              }
            } catch (error) {
              console.error('Error creating wallet:', error);
              setInTxn(false);
            }
          }

          const getAllWallets = async () => {
            try {
              const response = await fetch('/api/wallet/getAllWallets', {
                method: 'POST', // Change method to POST
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId, userToken: userToken }), // Include userId and userToken in the request body
              });
          
              if (response.ok) {
                const { data } = await response.json();
                const { wallets } = data;
                setWallets(wallets);
              } else {
                console.error('Failed to get wallets');
              }
            } catch (error) {
              console.error('Error getting wallets:', error);
            }
          };
          const getAllTokenBalances = async () => {
            try {
              const response = await fetch('/api/wallet/fetchWalletTokenBalance', {
                method: 'POST', // Change method to POST
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId, userToken: userToken, walletId: walletId }), // Include userId and userToken in the request body
              });
          
              if (response.ok) {
                const { data } = await response.json();
                const { wallets } = data;
                setTokensBalances(wallets);
              } else {
                console.error('Failed to get wallets balnaces');
              }
            } catch (error) {
              console.error('Error getting wallets balances:', error);
            }
          };
          useEffect(() => {
            getAllTokenBalances()
            if (user) {
              getAllWallets();
              
            }
          }
          , [user, walletId]);
          
        
          useEffect(() => {

           

            

            setUserPinSet(userInfo?.isPinSet);


             const timer = setTimeout(() => {


              setDelayComplete(true);
              const refreshToken = async () => {
                try {
                  const response = await fetch('/api/wallet/refreshToken', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: userId }),
                  });
                  if (response.ok) {
                    const { data } = await response.json();
                    const { userToken, encryptionKey } = data;
                    setData(userToken, encryptionKey, userId, '');
                  } else {
                    console.error('Failed to refresh token');
                  }
                } catch (error) {
                  console.error('Error refreshing token:', error);
                }
                
              }
              refreshToken()
            }, 4500); // 4.5 seconds delay
            
        
            return () => clearTimeout(timer);
          }, [user,userId]);
        

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
          if(isAuthenticated && !userPinSet && delayComplete) {

            return (
              <Block>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">Welcome Onboard, {user?.name}</span>
                
                  {inTxn ? ( 
                    <Preloader className="center-item" />
                  ) : (
                    <Button
                    onClick={() => {
                      executeChallenge(userId);
                    }}
                    className="w-2/3 max-w-sm"
                  >
                    Click to set up your account
                  </Button>
                  )}
                </div>
                </Block>
            )

            
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
      <select
        id="wallets"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-3xl w-7.9 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => {
          const selectedWalletId = e.target.value;
          const selectedWallet = wallets.find(wallet => wallet.id === selectedWalletId);
          if (selectedWallet) {
            const walletId = selectedWalletId;
            updateWalletId(walletId);
            setSelectedWallet(selectedWallet);
          }
        }}
      >
        <option value="">Select a wallet</option>
        {wallets.map(wallet => (
          <option key={wallet.id} value={wallet.id}>{wallet.name}</option>
        ))}
      </select>
      <Button onClick={() => setSheetOpened(true)} className='w-2/2 max-w-sm'>
        Add Wallet
      </Button>
    </div>
    <span className='text-lg font-bold'> $ 0 </span>
    {selectedWallet && (
      <div>
        <p>Selected Wallet: {selectedWallet.name}</p>
        <p>Wallet Address: {selectedWallet.address}</p>
      </div>
    )}
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
        <div className="flex justify-between w-full p-8 ">
         <div className="flex flex-col items-center cursor-pointer">
           <span className="text-3xl mb-2">&#10148;</span>
           <p className="text-md">Send</p>
         </div>
         <div className="flex flex-col items-center">
           <span className="text-3xl mb-2 cursor-pointer">&#128230;</span>
           <p className="text-md">Receive</p>
         </div>
         <div className="flex flex-col items-center">
           <span onClick={(e)=> {alert('coming soon')}} className="text-3xl mb-2 cursor-pointer">&#8646;</span>
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
  <Sheet
          className="pb-safe"
          opened={sheetOpened}
          onBackdropClick={() => setSheetOpened(false)}
        >
          <div class="relative p-4 w-full max-w-md max-h-full mb-15">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  Create Wallet
                </h3>
                <button
                  onClick={(e) => {
                    setSheetOpened(false);
                  }}
                  type="button"
                  class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div class="p-4 md:p-5">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Wallet Name
                  </label>
                  <input
                    onChange={(e) => {
                      setWalletName(e.target.value);
                    }}
                    type="text"
                    name="text"
                    id="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="e.g Portfolio 101"
                    required
                  />
                </div>

                <div className="mt-2 mb-3">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Wallet Description
                  </label>
                  <input
                    onChange={(e) => {
                      setWalletDescription(e.target.value);
                    }}
                    type="text"
                    name="text"
                    id="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="desc"
                    required
                  />
                </div>
               

                {!inTxn ? (
                  <Button
                    onClick={createWallet}
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Create
                  </Button>
                ) : (
                  <Preloader className="center-item " />
                )}
              </div>
            </div>
          </div>
</Sheet>
     
              </Layout>
          );
        }
        
        