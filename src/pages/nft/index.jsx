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
      const trendingNFTs = [
        {
          id: 1,
          image: 'https://example.com/nft-image1.png',
          title: 'CryptoPunk #1234',
          price: 5.0,
        },
        {
          id: 2,
          image: 'https://example.com/nft-image2.png',
          title: 'Art Blocks #5678',
          price: 10.0,
        },
        {
          id: 3,
          image: 'https://example.com/nft-image3.png',
          title: 'Decentraland Parcel',
          price: 100.0,
        },
      ];
    
      const newNFTs = [
        {
          id: 4,
          image: 'https://example.com/nft-image4.png',
          title: 'NFT Art #1',
          price: 20.0,
        },
        {
          id: 5,
          image: 'https://example.com/nft-image5.png',
          title: 'NFT Art #2',
          price: 15.0,
        },
        {
          id: 6,
          image: 'https://example.com/nft-image6.png',
          title: 'NFT Art #3',
          price: 25.0,
        },
      ];
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

<div className="container mx-auto mt-8">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Trending NFTs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingNFTs.map(nft => (
            <div key={nft.id} className="border rounded-lg overflow-hidden">
              <img src={nft.image} alt={nft.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{nft.title}</h3>
                <p className="text-gray-600 mb-2">${nft.price}</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">New NFTs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newNFTs.map(nft => (
            <div key={nft.id} className="border rounded-lg overflow-hidden">
              <img src={nft.image} alt={nft.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{nft.title}</h3>
                <p className="text-gray-600 mb-2">${nft.price}</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>

    </Layout>
  )
}

export default Index