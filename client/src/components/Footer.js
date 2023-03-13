import React from 'react'
import Status from "./Status";

export default function Footer({loading, status}) {
  return (
    <p className='footer'>
        Estado del servidor:
        {loading ? " Cargando..." : <Status status={status} />}
    </p>
  )
}
