import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'customers',
  description: 'List of customers in Acme'
}

function CustomerPage() {
  return (
    <p>CustomerPage</p>
  )
}

export default CustomerPage