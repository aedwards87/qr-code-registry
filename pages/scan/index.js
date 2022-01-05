import Scan from './scan'
import { StateContextProvider } from '../../hooks'
import { INITIALSTATE } from '../../utils/constants'

// TODO: Issue on touch devices with screen larger than laptop. Double click on stop scan button because of click outside hook

const initialState = {
  qrReaderID: 'qr-reader',
  isScanSuccess: false,
  isScanFailure: false,
  isScanOpen: false,
  isLaptopAndUp: false,
  data: INITIALSTATE,
  error: ""
}

const ScanIndex = () => {
  return (
    <StateContextProvider initialState={initialState}>
      <Scan title="Scan QR Code" scanner initialState={initialState} />
    </StateContextProvider>
  )
}
export default ScanIndex
