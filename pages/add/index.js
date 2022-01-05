import QRCodeTemplate from '../../components/QRCodeTemplate'
import { StateContextProvider } from '../../hooks'
import { INITIALSTATE } from '../../utils/constants'

const Add = () => {
  return (
    <StateContextProvider initialState={INITIALSTATE}>
      <QRCodeTemplate title="Add QR Code" />
    </StateContextProvider>
  )
}

export default Add