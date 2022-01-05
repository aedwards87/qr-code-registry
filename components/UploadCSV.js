// Dependencies
import React, { useRef } from 'react'
import qrcode from 'qrcode'
import styled from 'styled-components'
import { readRemoteFile } from 'react-papaparse'
import { collection, query, where, getDocs } from '@firebase/firestore'
import { db } from '../firebase.config'
// Hooks
import { useFirestore } from '../hooks'
// Components
import { ToolBarButton } from '../styles/components'
// Utilities
import { camalise } from '../utils/helpers'

// ------------------------------
// Upload CSV Component
// ------------------------------
export default function UploadCSV({ children }) {
  const buttonRef = useRef()
  const { handleMultipleAdd, handleUpdate } = useFirestore()

  const handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    const confirmWipeAndUpload = confirm(
      'WARNING! Uploading a file will remove any data stored in the database'
    )
    if (confirmWipeAndUpload && buttonRef.current) {
      readRemoteFile(e.target.files[0], {
        worker: true,
        download: true,
        complete: (results) => handleOnFileLoad(results),
      })
      handleRemoveFile()
    }
  }

  // Removes the file downloaded to the input tag
  const handleRemoveFile = () => (buttonRef.current.value = null)

  // Fire after the file is uploaded.
  // Reteive the data from the file uploaded,
  // and then send it to firestore for storage.
  // Retreive the data back from firestore with
  // it's newly generated Id, generate a QR
  // quote and update firestore.
  const handleOnFileLoad = async (results) => {
    // Camalising the headings to make it easier to parse
    const uploadedData = results?.data[0].map((data) => camalise(data))
    const csvDataWithoutHeadings = results?.data.slice(1) // Removing first row with the headings on

    const fileHasMandatoryFields =
      uploadedData.includes('firstName') &&
      uploadedData.includes('lastName') &&
      uploadedData.includes('emailAddress')

    // Throw an error if the mandatory fields required aren't available
    if (!fileHasMandatoryFields) {
      handleRemoveFile()
      throw new Error('There appears to be fields missing!')
    }

    // Using the first row containing the headings, retreive their key
    const firstNameIndex = uploadedData.indexOf('firstName')
    const lastNameIndex = uploadedData.indexOf('lastName')
    const emailIndex = uploadedData.indexOf('emailAddress')
    const companyNameIndex = uploadedData.indexOf('companyName')
    const registeredIndex = uploadedData.indexOf('registered')
    const imageDataIndex = uploadedData.indexOf('imageData')

    // Map through the data and store in state. Using the object
    // keys of the headings received from the uploaded data, we
    // can make sure the right data is stored in the correct place
    const mapResultData = csvDataWithoutHeadings.map((data) => {
      return {
        firstName: data[firstNameIndex],
        lastName: data[lastNameIndex],
        email: data[emailIndex],
        companyName: data[companyNameIndex] ? data[companyNameIndex] : '',
        registered: data[registeredIndex]
          ? JSON.parse(data[registeredIndex].toLowerCase())
          : false,
        imageData: data[imageDataIndex] ? data[imageDataIndex] : '',
      }
    })

    await handleMultipleAdd(mapResultData)

    const collectionRef = collection(db, 'Users')
    const mapData = csvDataWithoutHeadings.map(
      async (data) =>
        await getDocs(
          query(collectionRef, where('email', '==', data[emailIndex]))
        ).then((data) => generateQRCodeWithID(data.docs[0]?.id))
    )

    // Generate QR Code
    const generateQRCodeWithID = async (id) => {
      if (!id) return
      try {
        const URLQueryStringID = `http://localhost:3000/scan?qr-code=${id}`
        const qrDataURL = await qrcode
          .toDataURL(URLQueryStringID, {
            color: {
              dark: '#001a70',
              light: '#ffffff00',
            },
            scale: 10,
          })
          .then((qrDataURL) => {
            handleUpdate(id, qrDataURL)
          })
      } catch (error) {
        console.log({ error })
      }
    }

    handleRemoveFile()
  }

  return (
    <Container as="label" htmlFor="cvs_upload_file">
      {children}
      <Input
        type="file"
        ref={buttonRef}
        id="cvs_upload_file"
        name="filename"
        onChange={handleOpenDialog}
        style={{
          display: 'none',
        }}
      />
    </Container>
  )
}

const Container = styled(ToolBarButton)`
  position: relative;
`

const Input = styled.input`
  display: inline-block;
  position: absolute;
  /* 
    We are ensuring the input is hidden, as it
    displays as hideous box when a file is uploaded.
    And, because it's contained within a label 
    we can still access its functionality.
  */
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1;
  width: 1;
  margin: -1;
  padding: 0;
  border: 0;
  inset: 0;
`
