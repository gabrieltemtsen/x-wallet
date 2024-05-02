

import { initiateUserControlledWalletsClient } from "@circle-fin/user-controlled-wallets"

export const CircleClient = initiateUserControlledWalletsClient({
    apiKey: process.env.NEXT_PUBLIC_CIRCLE_API_KEY
});

export default async function handler(req, res) {
   

    try {
        const { type, userToken, name, description }= req.body

    let createWallet = await CircleClient.createWallet({
        blockchains: ["ETH-SEPOLIA"],
        accountType: 'EOA',
        userToken,
        metadata: [
            {
                name,
                refId: description
            }
        ]
    });

        

       const data  = {
            challengeId: createWallet.data.challengeId
        }

        return res.status(200).json({ data });
    } catch (error) {
        console.log("Error creating wallet:", error);
        console.error("Error creating wallet:", error);
        return res.status(500).json({ error: "Failed to create wallet" });
    }
}
