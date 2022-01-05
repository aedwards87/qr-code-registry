import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase.config'

export default function useFirestore() {
  const [users, setUsers] = useState([])

  // Adds data
  const handleAdd = async (newUser) => {
    // firstName, lastName & email are required fields
    // If any are left empty return early
    if (
      newUser.firstName === '' ||
      newUser.lastName === '' ||
      newUser.email === ''
    ) {
      return
    }

    // Remove any unnecessary blank spaces
    const firstName = newUser.firstName.trim()
    const lastName = newUser.lastName.trim()
    const companyName = newUser?.companyName?.trim() || ''
    const email = newUser.emailAddress.trim()
    const registered = false
    const imageData = newUser?.imageData?.trim() || ''

    const collectionRef = collection(db, 'Users')
    const payload = {
      firstName,
      lastName,
      companyName,
      email,
      registered,
      imageData,
    }
    await addDoc(collectionRef, payload)
  }

  const handleMultipleAdd = async (newUsers) => {
    const collectionRef = collection(db, 'Users')
    // const confirmWipeAndUpload = confirm('WARNING! Type DELETE ALL to completely remove all data? ')

    // if (confirmWipeAndUpload) {
    users.forEach(async (user) => {
      await deleteDoc(doc(db, 'Users', user.id))
    })

    newUsers.forEach(async (user) => {
      await addDoc(collectionRef, {
        firstName: user.firstName,
        lastName: user.lastName,
        companyName: user.companyName,
        email: user.email,
        registered: user.registered,
        imageData: user.imageData,
      })
    })
    // }
  }

  // const handleEdit = async (id) => setDoc

  // Updates the data to a registered user; using the given ID.
  const handleUpdateRegistered = async (id) => {
    const docRef = doc(db, 'Users', id)
    const payload = { registered: true }
    await updateDoc(docRef, payload)
  }
  // Updates data with new data:image for the QR Code
  // The way this is used is in the form submit.
  // We add the data to firestore, then retrieve it back
  // with the newly added ID from firebase.
  // Then used handleUpdate to add the data:image
  // for the qr code using the ID.
  const handleUpdate = async (id, imageData = '') => {
    // console.log({ id })
    if (id === undefined) return
    const docRef = doc(db, 'Users', id)
    const payload = { imageData }
    await updateDoc(docRef, payload)
  }
  // Deletes a single field
  const handleDelete = async (id) => {
    const deleteRecord = prompt(
      'WARNING! Type DELETE to completely remove this user? '
    )
    const docRef = doc(db, 'Users', id)
    if (deleteRecord === 'DELETE') {
      await deleteDoc(docRef)
    }
  }
  // Deletes EVERY field
  const handleDeleteAll = async () => {
    const deleteRecord = prompt(
      'WARNING! Type DELETE ALL to completely remove all data? '
    )
    if (deleteRecord === 'DELETE ALL') {
      users.forEach(async (user) => {
        await deleteDoc(doc(db, 'Users', user.id))
      })
    }
  }

  // Sorts data into ascending order
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Users'), (snapshot) => {
      // Get Data
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      // Sort data by first name
      // console.log({ result })
      const sortedResult = result.sort((a, b) =>
        a?.firstName < b?.firstName ? -1 : a?.firstName > b?.firstName ? 1 : 0
      )
      // Store data
      setUsers(sortedResult)
    })
    return unsubscribe
  }, [])

  return {
    users,
    handleAdd,
    handleDelete,
    handleDeleteAll,
    handleUpdate,
    handleUpdateRegistered,
    handleMultipleAdd,
  }
}
