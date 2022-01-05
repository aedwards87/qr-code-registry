import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebase.config'
import { useEffect, useState } from 'react';

export default function useFirebaseAuth(email = 'aedwards1987@gmail.com', password = 'adamed') {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() =>
    onAuthStateChanged(auth, user => {
      setUser(user)
      setLoading(false)
    }), [user])

  const login = async (e) => {
    // e.preventDefault()
    try {
      setLoading(true)
      setError('')
      const loginUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      setLoading(false)
      return loginUser
    } catch (e) {
      setError(e)
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  return { user, login, logout, loading, error }
}
