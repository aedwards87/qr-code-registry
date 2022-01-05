// Dependencies
import React, { useLayoutEffect, useState } from 'react'
import Image from 'next/image'
import qrcode from 'qrcode'

// ------------------------------
// QRCodeImage Component
// ------------------------------
const QRCodeImage = ({
  className,
  imageData = {
    firstName: '',
    lastName: '',
    emailAddress: '',
  },
  directData,
  alt = 'QR Code',
  width = '100%',
  height = '100%',
  ...props
}) => {
  const [qrData, setQRData] = useState('')
  const [error, setError] = useState('')

  useLayoutEffect(() => {
    // Create new vairable as to not mutate the original
    const newImageData = imageData
    // If no companyName is provided, delete the key from the object
    newImageData.companyName === '' ? delete newImageData['companyName'] : null
    // Generate the QR Code
    const generateQRCode = async () => {
      try {
        const result = await qrcode.toDataURL(JSON.stringify(newImageData), {
          color: {
            dark: '#001a70',
            light: '#ffffff00'
          },
          scale: 10
        })
        setQRData(result)
      } catch (error) {
        setError(error)
        console.log({ error });
      }
    }
    generateQRCode()
  }, [imageData])

  if (error) return <p>Oops! Something seems to have gone wrong.</p>
  if (!qrData) return <h2>Loading...</h2>
  if (qrData) return (
    <Image
      className={className}
      src={directData || qrData}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  )
}

export default QRCodeImage
