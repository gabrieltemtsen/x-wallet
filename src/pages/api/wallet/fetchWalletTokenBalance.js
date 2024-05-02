

import { initiateUserControlledWalletsClient } from "@circle-fin/user-controlled-wallets"

export const CircleClient = initiateUserControlledWalletsClient({
    apiKey: process.env.NEXT_PUBLIC_CIRCLE_API_KEY
});

export default async function handler(req, res) {
    const { userId } = req.body;

    try {
        const { userToken, walletId, userId } = req.body;
    
        let wallets = await CircleClient.getWalletTokenBalance({
            userToken: userToken,
            walletId: walletId,
            userId: userId
        });

        console.log(await wallets.data)

        

       const data  = {
            wallets: wallets.data
        }
        

        return res.status(200).json({ data });
    } catch (error) {
        console.error("Error getting wallet:", error);
        return res.status(500).json({ error: "Failed to get wallet" });
    }
}
