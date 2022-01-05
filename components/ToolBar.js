// Dependencies
import styled, { css } from 'styled-components'
import React, { useEffect, useState, useCallback } from 'react'
// Components
import { ToolBarButton } from '../styles/components'
import UploadButton from './UploadCSV'
import DownloadButton from './DownloadCSV'
// SVGs
import {
  DownloadSVG,
  UploadSVG,
  SearchSVG,
  RefreshSVG,
  AddSVG,
  SearchToCrossSVG,
} from '../assets/svg'
// Utilities
import { QUERIES } from '../utils/constants'
import { capitilise } from '../utils/helpers'
// Hooks
import { useToggle, useStateContext as useDataContext, useKeyPress } from '../hooks'

// ------------------------------
// ToolBar Component
// ------------------------------
const ToolBar = () => {
  const [{ users }, setUsers] = useDataContext()
  const [searchValue, setSearchValue] = useState('')
  const [isSearchOpen, toggleIsSearchOpen] = useToggle()
  // Handles filter
  useEffect(() => {
    const filteredUsers = users.filter(user =>
      user.firstName.includes(capitilise(searchValue)
      ))
    setUsers(prevState => ({
      ...prevState,
      filteredUsers
    }))
  }, [users, setUsers, searchValue])

  // Sets focus to search input field when it's visible
  useEffect(() => {
    document?.getElementById('search')?.focus()
  }, [isSearchOpen])

  const handleRefresh = useCallback(() => {
    setSearchValue('')
    setUsers(prevState => ({
      ...prevState,
      filteredUsers: users
    }))
  }, [users, setUsers])

  const handleSearch = useCallback(() => {
    toggleIsSearchOpen()
    handleRefresh()
  }, [toggleIsSearchOpen, handleRefresh])

  const handleFilter = (e) => setSearchValue(capitilise(e.target.value))



  // Animate Search icon to cross icon
  // TODO: This isn't working, will need to look further into how to morph between svg shapes
  useEffect(() => {
    let animateToCross = document.getElementById('animation-to-cross')
    let animateToSearch = document.getElementById('animation-to-search')
    if (isSearchOpen) {
      animateToCross.beginElement()
    } else {
      animateToSearch.beginElement()
    }
  }, [isSearchOpen])


  return (
    <OuterContainer>
      <InnerContainer>
        <UploadButton>
          <UploadSVG />
        </UploadButton>
        <DownloadButton
          style={{ marginRight: 'auto' }}
        >
          <DownloadSVG />
        </DownloadButton>
        <AddButton href="/add">
          <AddSVG />
        </AddButton>
        <label htmlFor="search">
          {isSearchOpen &&
            <Search
              id="search"
              tabindex="0"
              value={searchValue}
              onChange={handleFilter}
              placeholder="Search first name..."
            />
          }
          <SearchButton
            onClick={handleSearch}
            $isSearchOpen={isSearchOpen}
          >
            <SearchToCrossSVG />
          </SearchButton>
        </label>
      </InnerContainer>
    </OuterContainer>
  )
}

// ------------------------------
// Styles
// ------------------------------
const AddButton = styled(ToolBarButton)``
// const RefreshButton = styled(ToolBarButton)``
const Search = styled.input`
/* display: none; */
  border-radius: 50px;
  position: absolute;
  left: 0;
  top: 0;
  padding: 1rem min(2.3rem,7vw);
  background: hsl(226 47% 38%);
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  &:focus-visible,
  &:hover {
    box-shadow: 
      0 0 0 2px hsl(var(--colorModeButtonHover)),
      0 0 0 6px hsl(226 47% 38%);
  }
  &::placeholder {
    color: hsla(var(--colorWhite) / .6);
  }

  &:-webkit-autofill {
      -webkit-text-fill-color: hsl(var(--colorWhite));
      -webkit-box-shadow: 
        0 0 0px 1000px hsla(var(--colorModeText) / .1) inset,
        0 0 0px 1000px hsl(226 47% 38%) inset;
      :hover,
      :focus-visible {
        -webkit-text-fill-color: hsl(var(--colorWhite));
        -webkit-box-shadow: 
          0 0 0px 1000px hsl(226 47% 38%) inset,
          0 0 0px 1000px hsl(var(--colorMode)) inset,
          0 0 0 2px hsl(226 47% 38%),
          0 0 0 4px hsla(226 47% 38%);
      }
    }
    /* &:focus-visible {
      box-shadow:  
        0 0 0 2px hsla(var(--colorModeLink)), 
        0 0 0 6px hsla(var(--colorModeShade) / .1);
    } */
`
const SearchButton = styled(ToolBarButton)`
  ${({ $isSearchOpen }) => $isSearchOpen && css`
    background: none;
  `}
`
const OuterContainer = styled.div`
  position: fixed;
  top: calc(var(--navHeight) - 4px);
  width: 100%;
  padding: 1rem min(2.3rem,7vw);
  background: hsl(var(--colorMode));
  transition: background .3s ease;
  z-index: 20000;
  @media (hover: none) and (pointer: coarse) {
    top: revert;
    bottom: -1px;
    border-radius: min(40px, 10vw) min(40px, 10vw) 0 0;
    box-shadow:var(--colorModeBoxShadow);
  }
`

const InnerContainer = styled.div`
  --gapToolbar: clamp(.5rem, 4vw, 2.2rem);
  position: relative; 
  max-width: var(--desktopOuterMaxWidth);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: var(--gapToolbar);
  svg {
    width: 45%
  }
  @media ${QUERIES.tabletAndUp} {
    width: 100%;
  }
  @media (hover: none) and (pointer: coarse) {
    --gapToolbar: clamp(.5rem, 4.2vw, 5rem);
    top: revert;
    bottom: 0;
    justify-content: space-evenly;
    max-width: ${500 / 16}rem;
  }
`

const Seperator = styled.div`
  display: flex;
  gap: var(--gapToolbar);
`

export default ToolBar
