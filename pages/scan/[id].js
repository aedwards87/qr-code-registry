import React, { useState } from 'react'
import { useFirestore } from '../../hooks'
import Unfound404 from '../404'


export const getServerSideProps = async (context) => {
  const id = context.params.id
  return {
    props: { id }
  }
}

const ScanTemplate = ({ id }) => {
  const { users } = useFirestore()
  const filteredUser = users.filter(user => user.id === id)

  console.log({ filteredUser, id });

  // TODO: This should probably be the unsuccessful page
  if (filteredUser !== []) {
    return <Unfound404 />
  }

  // The idea here is to give the QR code the full url.
  // we then look to retreive the ID from it.
  // either from the device or website scanner
  // const x = async () => {
  //   const collectionRef = collection(db, 'Users')
  //   const res = await getDocs(collectionRef)
  //   console.log('a:', res.docs.map(x => x.id));
  // }
  // x()
  // This method is good when using the phone camera to scan Qr Code as it will send the person scanning to the actual page
  // const router = useRouter()
  // const { id } = router.query
  // console.log({ id })

  // This method is good when using the website scanner
  // const scannedQrCodeURL = 'https://www.qrcode.com/scan/hwr9uh39rb2jfhweuirg3y4'
  // // Remove from string recieved
  // const regex = 'https://www.qrcode.com/scan/'
  // const scannedId = scannedQrCodeURL.replace(regex, '')
  // console.log({ scannedId })


  return (
    <div>
      Hi
    </div>
  )
}

export default ScanTemplate
