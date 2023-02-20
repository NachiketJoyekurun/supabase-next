import Link from 'next/link'
import React from 'react'

const NavigationLinks = ({
  href,
  title
}) => {
  return (
    <Link href={href}>
      <li className='navButton'>{title}</li>
    </Link>
  )
}

export default NavigationLinks