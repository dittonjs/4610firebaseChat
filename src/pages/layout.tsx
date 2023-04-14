import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import UserContext, { User } from '../context/user';
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const Layout = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO auth stuff
    const cleanup = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user !== null) {
        setUser(user as User);
        setLoggedIn(!!user);
      } else {
        setUser(null)
        setLoggedIn(false);
      }
      console.log("Our user is: ", user);
    });

    if (!loading) {
      navigate(loggedIn ? '/chat' : '/login');
    }
    return cleanup;
  }, [loggedIn, loading]);

  return(
    <UserContext.Provider value={user}>
      {loading ? <div>Loading...</div> : <Outlet />}
    </UserContext.Provider>
  )
}