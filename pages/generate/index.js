import QRCodeTemplate from '../../components/QRCodeTemplate'
import { StateContextProvider } from '../../hooks'
import { INITIALSTATE } from '../../utils/constants'

const Generate = () => {
  return (
    <StateContextProvider initialState={INITIALSTATE}>
      <QRCodeTemplate title="Generate QR Code" />
    </StateContextProvider>
  )
}

export default Generate