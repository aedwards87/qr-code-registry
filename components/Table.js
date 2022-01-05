// Dependencies
import React from 'react'
import styled, { css } from 'styled-components'
// Components
import { Button } from '../styles/components'
// Assets
import { DeleteSVG } from '../assets/svg'
// Hooks
import useFirestore from '../hooks/useFirestore'
import { useStateContext as useDataContext } from '../hooks'
// Utilities
import { fileName } from '../utils/helpers'

// ------------------------------
// Table component
// ------------------------------
const Table = () => {
  const { handleDelete } = useFirestore()
  const [{ filteredUsers }] = useDataContext()

  return (
    <TableContainer>
      <FieldSetContainer>
        <RowTitle>
          <ColumnTitle>First name</ColumnTitle>
        </RowTitle>
        <RowTitle>
          <ColumnTitle>Last name</ColumnTitle>
        </RowTitle>
        <RowTitle>
          <ColumnTitle>Email address</ColumnTitle>
        </RowTitle>
        <RowTitle>
          <ColumnTitle>Company name</ColumnTitle>
        </RowTitle>
        <RowTitle>
          <ColumnTitle>QR Code</ColumnTitle>
        </RowTitle>
        <RowTitle>
          <ColumnTitle>Registered</ColumnTitle>
        </RowTitle>
        <RowTitle>
          <ColumnTitle>Delete</ColumnTitle>
        </RowTitle>
        <Space />
        {filteredUsers.map(user =>
          <React.Fragment key={user.id}>
            <RowData>
              <ColumnData>{user.firstName}</ColumnData>
            </RowData>
            <RowData>
              <ColumnData>{user.lastName}</ColumnData>
            </RowData>
            <RowData>
              <ColumnData>{user.email}</ColumnData>
            </RowData>
            <RowData>
              <ColumnData>{user.companyName}</ColumnData>
            </RowData>
            <RowData>
              <ColumnData
                as={user.imageData !== '' ? QrLink : 'div'}
                href={user.imageData}
                download={user.imageData !== '' && fileName(user)}
                title={`Download ${user.firstName} ${user.lastName}'s QR Code`}
                style={{
                  padding: 0,
                  justifyItems: "center",
                  border: 'none'
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.imageData}
                  alt={`${user.firstName} ${user.lastName}'s qr code`}
                  // onError={(e)=>{e.target.onerror = null; e.target.src="image_path_here"}}
                  onError={(event) => event.target.style.display = 'none'}
                  width="50px"
                  height="50px"
                />
              </ColumnData>
            </RowData>
            <RowData>
              <ColumnData registered={user.registered}>
                {user.registered ? 'Registered' : 'Not registered'}
              </ColumnData>
            </RowData>
            <RowData>
              <ColumnData
                as={QrButton}
                onClick={() => handleDelete(user.id)}
              >
                <DeleteSVG />
              </ColumnData>
            </RowData>
            <Space />
          </React.Fragment>
        )}
      </FieldSetContainer>
    </TableContainer>
  )
}



// ------------------------------
// Styles
// ------------------------------
const TableContainer = styled.div`
  display: grid;
  width: 100%;
  padding-bottom: 3rem;
`
const FieldSetContainer = styled.div`
  width: 1064px;
  display: grid;
  grid-template-columns: repeat(8, max-content);
  gap: min(1.25rem, 4vw);
`

const Space = styled.div`
  width: 7vw;
  height: 2rem;
`

const RowTitle = styled.div`
  display: grid;
  height: min-content;
  align-self: end;
`

const ColumnTitle = styled.h2`
  color: hsl(var(--colorModeDot));
  font-size: var(--fontSize400);
  display: flex;
`

const RowData = styled.div`
  display: grid;
`

const ColumnData = styled.p`
  position: relative;
  display: grid;
  align-items: center;
  justify-items: start;
  color: hsl(var(--colorMode1));
  border-radius: ${15 / 16}rem;
  padding: 1.6rem 1.3rem;
  background: hsla(var(--colorModeShade) / .1);
  
  ${({ registered }) =>
    (registered === true) ? css`
      background: hsl(var(--colorSuccess));
      color: hsl(var(--colorSecondary));
      font-weight: var(--fontWeightMedium);
    ` : (registered === false) ? css`
      background: hsl(var(--colorError));
      color: hsl(var(--colorWhite));
      font-weight: var(--fontWeightMedium);
    ` : null
  }
`

const QrLink = styled.a`
  background: hsla(var(--colorModeQRCodeBackground));
  transition: background .3s ease;
  &:hover,
  &:focus-visible {
    background: hsla(var(--colorModeQRCodeBackgroundHover));
  }
`

const QrButton = styled(Button)`
  transition: background .3s ease;
  &:hover,
  &focus-visible {
    background: hsla(var(--colorModeShade) / .3);
  }
`


export default Table
