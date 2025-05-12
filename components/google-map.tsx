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
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.2896306269766!2d-0.18619492414035!3d5.6691887339789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9c7ebaeabe93%3A0x72c6d55266d8ca5d!2sThe%20Cultured%20Man!5e0!3m2!1sen!2sus!4v1714504825345!5m2!1sen!2sus`

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
