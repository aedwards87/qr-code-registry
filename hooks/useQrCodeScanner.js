import { useState, useRef, useEffect, useCallback } from 'react'
import { useWindowSize } from './useWindowSize'
import { Html5Qrcode } from 'html5-qrcode'
import { INITIALSTATE, QUERIES } from '../utils/constants'
import { useStateContext } from '.'
import { getDoc, doc } from '@firebase/firestore'
import { db } from '../firebase.config'
import useFirestore from './useFirestore'
import { useKeyPress } from '.'

// MAYBE GOOD TIME TO TRY REDUCER/SWITCH ???

// ------------------------------
// useQrCodeScanner Hook
// ------------------------------
const useQrCodeScanner = ({ qrReaderID = '' }) => {
  const [{ isScanOpen }, setState] = useStateContext()
  // Get window sizes
  const { width, height } = useWindowSize()
  // Store current size, if window is resized
  // we're going to call stopQrScanner() to stop the camera
  const [currentWindowSize, setCurrentWindowSize] = useState({ width, height })
  const { handleUpdateRegistered } = useFirestore()
  // Initialised inside Start function and saved in
  // this Ref for access elsewhere e.g. Stop fucntion
  const html5QrCodeScannerRef = useRef(null)

  // Dependency for useEffect so has to be initialised first
  const stopQrScanner = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isScanOpen: false,
    }))
    try {
      html5QrCodeScannerRef.current
        .stop()
        .then((res) => {
          html5QrCodeScannerRef.current.clear()
        })
        .catch((err) => {
          console.log(err.message)
        })
    } catch (err) {
      console.log(err)
    }
  }, [setState])
  // Close camera when Esc key is pressed, a fallback
  // in the unlikelihood the close button failed to show
  useKeyPress(stopQrScanner)

  // Because the canvas/video can't adjust dynamically to
  // match the full window size, when the window is resized,
  // we'll stop the video altogether. This way the user
  // is forced to start a new scan, thus ensuring the
  // canvas/video always matches the full window size.
  useEffect(() => {
    setCurrentWindowSize({ width, height })
    if (
      currentWindowSize.width === undefined ||
      currentWindowSize.height === undefined ||
      !html5QrCodeScannerRef.current ||
      !isScanOpen
    ) {
      return // return early if sizes are not yet defined
    }
    if (width !== currentWindowSize.width) {
      stopQrScanner()
    }
  }, [
    // Dependencies
    width,
    height,
    currentWindowSize.width,
    currentWindowSize.height,
    stopQrScanner,
    isScanOpen,
  ])

  // Start/Open camera
  const startQrScanner = async () => {
    try {
      const html5QrCodeScanner = new Html5Qrcode(qrReaderID)
      html5QrCodeScannerRef.current = html5QrCodeScanner

      // TODO: Handle error with a message to inform the user to allow access
      // This method will trigger user permissions
      // Html5Qrcode.getCameras().then(devices => {
      //
      //   devices would be an array of objects of type:
      //   { id: "id", label: "label" }
      //
      //   if (devices && devices.length) {
      //     cameraId = devices[0].id;
      //     // .. use this to start scanning.
      //   }
      // }).catch(err => {
      //   // handle err
      // });

      const isLaptopAndUp = window.matchMedia(QUERIES.laptopAndUp).matches

      setState((prevState) => ({
        ...prevState,
        data: INITIALSTATE,
        isScanOpen: true,
        isLaptopAndUp,
      }))

      // TODO: QR Code will store a URL to scan page with a query string containing the ID. e.g. http://localhost:3000/scan?qr-code=4uguj4jk2342h5235
      // TODO: ON page load check if there is a query string, if so, produce results, else nothing.
      // TODO: ON scan find url query string for qr-code then produce results

      // Execute on successful scan
      const qrCodeSuccessCallback = async (decodedURL, decodedResult) => {
        try {
          // Retreive the URL with a query string from the Qr Code.
          // Remove everything expect the query string result, which
          // should be the ID used to find the user in the database.
          // const regex = 'https://www.qrcode.com/scan?qr-code='
          const regex = 'http://localhost:3000/scan?qr-code='
          const qrCodeID = decodedURL.replace(regex, '')

          // console.log({ qrCodeID, decodedURL, decodedResult });
          // Fetch data matching decodedURL from scan
          const docRef = doc(db, 'Users', qrCodeID)
          const snapshot = await getDoc(docRef)
          const data = snapshot.data()
          // Throw error if id doesn't match any in database
          if (!data) {
            stopQrScanner()
            throw new Error()
          }
          // If the ID matches, pass the data to
          // state and update to successful scan
          setState((prevState) => ({
            ...prevState,
            isScanSuccess: true,
            data,
          }))
          handleUpdateRegistered(qrCodeID)
          stopQrScanner()
        } catch (error) {
          // If error is thrown, catch it here
          // and setState of scan to failed
          setState((prevState) => ({
            ...prevState,
            isScanFailure: true,
          }))
        }
      }

      // Open camera
      html5QrCodeScanner
        .start(
          { facingMode: 'environment' },
          {
            fps: 50,
            qrbox: { width: 'none', height: 'none' },
            aspectRatio: isLaptopAndUp ? 1 : width / height,
          },
          qrCodeSuccessCallback
        )
        .catch((err) => {
          console.log({ err })
          setState((prevState) => ({
            ...prevState,
            isScanSuccess: false,
            isScanFailure: true,
            isScanOpen: false,
            data: INITIALSTATE,
            error: err || 'QR Code parsing failed',
          }))
        })
    } catch (e) {
      console.log({ e })
      setState((prevState) => ({
        ...prevState,
        isScanSuccess: false,
        isScanFailure: true,
        isScanOpen: false,
        data: INITIALSTATE,
        error: e || 'QR Code parsing failed',
      }))
    }
  }

  const onLoadScanURL = async (qrCodeID) => {
    try {
      // Retreive the URL with a query string from the Qr Code.
      // Remove everything expect the query string result, which
      // should be the ID used to find the user in the database.
      // const regex = 'https://www.qrcode.com/scan?qr-code='
      // Fetch data matching qrCodeID from query string
      const docRef = doc(db, 'Users', qrCodeID)
      const snapshot = await getDoc(docRef)
      const data = snapshot.data()
      // Throw error if ID doesn't match any in database
      if (!qrCodeID.length >= 20 || !data) {
        throw new Error()
      }
      // If the ID matches, pass the data to
      // state and update to successful scan
      setState((prevState) => ({
        ...prevState,
        isScanSuccess: true,
        data,
      }))
      handleUpdateRegistered(qrCodeID)
      // stopQrScanner()
    } catch (error) {
      // If error is thrown, catch it here
      // and setState of scan to failed
      setState((prevState) => ({
        ...prevState,
        isScanFailure: true,
      }))
    }
  }

  return {
    isScanOpen,
    startQrScanner,
    stopQrScanner,
    onLoadScanURL,
  }
}

export default useQrCodeScanner
