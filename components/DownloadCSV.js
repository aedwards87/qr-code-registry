// Dependencies
import React, { useRef } from 'react'
import { CSVDownloader as Downloader } from 'react-papaparse'
import styled from 'styled-components'
// Hooks
import { useFirestore } from '../hooks'
// Components
import { ToolBarButton } from '../styles/components'

// ------------------------------
// CSV Downloader component
// ------------------------------
export default function CSVDownloader({ children }) {
  const { users } = useFirestore()
  const orderedUsers = useRef([])

  // Store users within the ref.current, and order them 
  // in such a way we want them displayed in the csv file
  orderedUsers.current = users.map(user => ({
    ...orderedUsers,
    'First name': user.firstName,
    'Last name': user.lastName,
    'Email address': user.email,
    'Company name': user.companyName,
    'Registered': user.registered,
    'Image data': user.imageData,
  }))

  // Remove the current array within each object
  const orderedUsersWithoutCurrent =
    orderedUsers.current.map(user => {
      delete user.current
      return user
    })

  return (
    <Container as="div">
      <Downloader
        // as={ToolBarButton}
        type="button"
        data={orderedUsersWithoutCurrent}
        filename={'qr-code-data'}
        bom={true}
        className="csv_download_button"
      >
        {/* <DownloaderButton> */}
        {children}
        {/* </DownloaderButton> */}
      </Downloader>
    </Container>
  )
}

// ------------------------------
// Styles
// ------------------------------
const Container = styled(ToolBarButton)`
  height: min-content;
  margin-right: auto;
  @media (hover: none) and (pointer: coarse) {
    margin-right: 0;
  }
  > button {
    background: none;
    border: none;
    padding: 0;
  }
  > div {
    border: none !important;
    padding: 0 !important;
  }
`

const DownloaderButton = styled.div`
  width: min(60px,10.4vw);
  height: min(60px,10.4vw);
  aspect-ratio: 1;
  border: none;
  background: hsl(226 47% 38%);
  border-radius: 50px;
  display: grid;
  place-items: center;
  cursor: pointer;
`
