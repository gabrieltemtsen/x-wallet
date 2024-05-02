import { initiateUserControlledWalletsClient } from "@circle-fin/user-controlled-wallets"

export const CircleClient = initiateUserControlledWalletsClient({
    apiKey: process.env.NEXT_PUBLIC_CIRCLE_API_KEY
});

export default async function handler(req, res) {
    const { userId } = req.body;

    try {
       

        // Create user session
        const createSession = await CircleClient.createUserToken({ userId });

       

        // Response data
        const data = {
            userToken: createSession.data.userToken,
            encryptionKey: createSession.data.encryptionKey,
        }

        return res.status(200).json({ data });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Failed to create user" });
    }
}
