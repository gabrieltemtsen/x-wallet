import { useAuth0 } from "@auth0/auth0-react";
import { useConvexAuth, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api"; 
import { useUserContext } from "@/context/UserContext";

export default function useStoreUserEffect() {
  const { isAuthenticated } = useConvexAuth();

  const { user } = useAuth0(); 
  // When this state is set we know the server
  // has stored the user.
  const [userId, setUserId] = useState(null);
  const storeUser = useMutation(api.users.store);
  const [userInfo, setUserInfo] = useState(null);
  const {updateUserId} = useUserContext();

 

  // Call the `storeUser` mutation function to store
  // the current user in the `users` table and return the `Id` value.
  useEffect(() => {
    // If the user is not logged in don't do anything
    if (!isAuthenticated) {
      return;
    }
    // Store the user in the database.
    // Recall that `storeUser` gets the user information via the `auth`
    // object on the server. You don't need to pass anything manually here.
    async function createUser() {
      const id = await storeUser();
      updateUserId(id._id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('newUid', id._id);
      }
      setUserInfo(id);
      setUserId(id._id);
    }
    
    
    createUser();
    return () => setUserId(null);
    // Make sure the effect reruns if the user logs in with
    // a different identity
  }, [isAuthenticated, storeUser, user?.sub]);
  return {userId, userInfo};
}