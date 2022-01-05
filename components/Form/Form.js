// Dependencies
import React, { useState } from 'react'
import styled from 'styled-components'
import qrcode from 'qrcode'
import { useForm } from 'react-hook-form'
import { collection, getDocs, query, where } from '@firebase/firestore'
import { db } from '../../firebase.config'
// Components
import FormField from './Field'
import { SubmitButton, GhostSubmitButton } from '../../styles/components/index'
import { useMediaQuerySSR } from '../../styles/MediaQueries'
// Utilities
import { FORM_RULES, QUERIES, INITIALSTATE } from '../../utils/constants'
import { fileName } from '../../utils/helpers'
// Hooks
import { useFirestore, useStateContext } from '../../hooks'
// Assets
import ResetSVG from '../../assets/svg/Reset'

// ------------------------------
// The QR Code form component
// ------------------------------
const QRCodeForm = ({ category = 'Generate' }) => {
  const [_, setInputValues] = useStateContext()
  const [customError, setCustomError] = useState('')
  const [qrData, setQrData] = useState('')
  const { handleAdd, handleUpdate } = useFirestore()
  const isTabletAndUp = useMediaQuerySSR({ query: QUERIES.tabletAndUp })
  const { handleSubmit, control, reset, getValues } = useForm({
    mode: 'onBlur',
    defaultValues: INITIALSTATE,
  })

  // Determines whether the user is submitting
  // to download the QR Code image, or
  // add the user deails to the database.
  // Also, grabs the image data from the canvas element
  const onSubmit = async (data, e) => {
    e.preventDefault()
    const { name } = e.nativeEvent.submitter
    // let canvas = ref?.current?.querySelector('canvas')
    // let imageData = canvas?.toDataURL('image/png')

    // If fields are empty don't do anything
    if (
      data.firstName === '' ||
      data.lastName === '' ||
      data.emailAddress === ''
    ) {
      return
    }

    // If Download button clicked proceed to dowload function
    if (name === 'Download') downloadQRCode(data)
    // If Submit button clicked proceed to submit function
    if (name === 'Submit') addUserToDatabase(data)
  }

  const addUserToDatabase = async (data) => {
    // console.log({ data })
    // Query the database to find if there is
    // already an email in use
    const collectionRef = collection(db, 'Users')
    const queryEmail = query(
      collectionRef,
      where('email', '==', data.emailAddress)
    )
    const emailSnapshot = await getDocs(queryEmail)
    const queryResultsID = emailSnapshot.docs[0]?.id
    // If the email address is already in use return early
    if (queryResultsID) {
      // TODO: Have an error message displayed
      // for the user to see the email address is
      // already in use
      alert('Email address has already been used')
      return
    }

    // If the email is not in use continue...
    // Add data to database
    await handleAdd(data)
    // Retreive data with the email address we just added
    const newEmailSnapshot = await getDocs(queryEmail)
    // Obtain the newly generated ID from firestore
    const newQueryResultsID = newEmailSnapshot.docs[0]?.id

    // Generate the QR Code image data using the new ID
    const generateQRCodeWithID = async () => {
      try {
        const URLQueryStringID = `http://localhost:3000/scan?qr-code=${newQueryResultsID}`
        const result = await qrcode.toDataURL(URLQueryStringID, {
          color: {
            dark: '#001a70',
            light: '#ffffff00',
          },
          scale: 10,
        })
        updateDatabase(newQueryResultsID, result)
      } catch (error) {
        console.log({ error })
      }
    }
    generateQRCodeWithID()

    // Updates firestore database with newly created QR Code image data, then resets form
    const updateDatabase = async (id, newQueryResultsID) => {
      await handleUpdate(id, newQueryResultsID)
      onReset()
    }
  }

  const onReset = () => {
    reset()
    document.getElementById('myform').reset()
    setInputValues(INITIALSTATE)
  }

  // Using the image data, create and
  // download the QR Code image using
  // the filename from above.
  // Then reset state
  const downloadQRCode = async (data) => {
    const generateQRCode = async () => {
      try {
        const result = await qrcode.toDataURL(JSON.stringify(qrData), {
          color: {
            dark: '#001a70',
            light: '#ffffff00',
          },
          scale: 10,
        })
        setQrData(result)
      } catch (error) {
        // setError(error)
        console.log({ error })
      }
    }
    await generateQRCode()

    // Creates an anchor tag containing image data,
    // generates a clicks to download the file,
    // then removes the anchor tag.
    let anchor = document.createElement('a')
    anchor.href = qrData
    anchor.download = fileName(data)
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
    setInputValues(INITIALSTATE)
  }

  // Determines name of button depending on page
  const buttonName =
    category === 'Generate' ? 'Download' : category === 'Add' ? 'Submit' : null

  return (
    <FormContainer id="myform" onSubmit={handleSubmit(onSubmit)}>
      <FormFieldSet>
        <FormField
          control={control}
          name="First Name"
          tabIndex={1}
          customError={customError.firstName}
          rules={FORM_RULES.firstName}
          maxLength={32}
        />
        <FormField
          control={control}
          name="Last name"
          tabIndex={2}
          customError={customError.lastName}
          rules={FORM_RULES.lastName}
          maxLength={99}
        />
        <FormField
          control={control}
          name="Email address"
          tabIndex={3}
          customError={customError.emailAddress}
          rules={FORM_RULES.emailAddress}
          maxLength={360}
        />
        <FormField
          control={control}
          name="Company name"
          tabIndex={4}
          customError={customError.companyName}
          maxLength={360}
          optional
        />
      </FormFieldSet>
      <SubmitButton
        tabIndex={4}
        onClick={() => setCustomError(getValues())}
        name={buttonName}
      >
        {buttonName}
      </SubmitButton>
      <GhostSubmitButton
        tabIndex={5}
        onClick={onReset}
        aria-label="Reset form fields"
      >
        {isTabletAndUp ? 'Reset' : <ResetIcon />}
      </GhostSubmitButton>
    </FormContainer>
  )
}

// ------------------------------
// Styles
// ------------------------------
const FormContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  @media ${QUERIES.tabletAndUp} {
    grid-template-columns: 1fr 1fr;
  }
`

const FormFieldSet = styled.fieldset`
  padding: 0;
  margin: 0;
  border: none;
  display: grid;
  gap: 1rem;
  grid-column: 1 / -1;
  @media ${QUERIES.tabletAndUp} {
    grid-template-columns: 1fr 1fr;
    div:nth-child(3),
    div:nth-child(4) {
      grid-column: 1 / -1;
    }
  }
`

const ResetIcon = styled(ResetSVG)`
  width: 1.5rem;
`

export default QRCodeForm
