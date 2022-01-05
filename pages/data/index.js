import { StateContextProvider as DataContextProvider, useFirestore } from '../../hooks'
import Data from './data'

const DataIndex = () => {
  const { users } = useFirestore()

  const initialState = {
    users,
    filteredUsers: users
  }

  return (
    <DataContextProvider initialState={initialState}>
      <Data title="Store QR data" scanner />
    </DataContextProvider>
  )
}
export default DataIndex
