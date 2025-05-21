"use client"

interface GoogleMapProps {
  address?: string
  zoom?: number
  height?: string
  className?: string
}

export function GoogleMap({
  address = "The Cultured Man",
  zoom = 15,
  height = "400px",
  className = "",
}: GoogleMapProps) {
  // Encode the address for the Google Maps URL
  const encodedAddress = encodeURIComponent(address)

  // Create the Google Maps embed URL
const mapUrl = `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d208.40621041357352!2d-0.26380616116144145!3d5.657958394928059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9f61be4f9aff%3A0xd4da4354a07fea38!2sThe%20Cultured%20Man!5e1!3m2!1sen!2sgh!4v1747830293583!5m2!1sen!2sgh`

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0, borderRadius: "0.375rem" }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`${address} Location`}
        className="w-full h-full"
      ></iframe>
    </div>
  )
}
