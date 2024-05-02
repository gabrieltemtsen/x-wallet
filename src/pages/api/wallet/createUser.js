import { initiateUserControlledWalletsClient } from "@circle-fin/user-controlled-wallets"


export const CircleClient = initiateUserControlledWalletsClient({
    apiKey: process.env.NEXT_PUBLIC_CIRCLE_API_KEY
});

export default async function handler(req,res) {

    const { userId } = req.body

    let createUser = await CircleClient.createUser({
        userId
    });

   

    let createSession = await CircleClient.createUserToken({
        userId
    });


    let createUserPinWithWallets = await CircleClient.createUserPin({
        userId,
    });

    return res.status(200).json({
        data: {
            userToken: createSession.data.userToken,
            encryptionKey: createSession.data.encryptionKey,
            challengeId: createUserPinWithWallets.data.challengeId
        }
    });
}