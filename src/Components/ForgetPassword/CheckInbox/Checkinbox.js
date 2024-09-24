import React from 'react'

const Checkinbox = () => {
  return (
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
  <h1 style={{ fontSize: '140px', padding: 0, margin: 0, display: 'inline' }}>📧</h1>
  <h1 style={{ fontSize: '40px', display: 'inline' }}>Check Your Inbox</h1>
  <p style={{ fontSize: '18px', textAlign: 'center' }}>
    We have sent you a magical link on your provided email account:
  </p>
  <h1 style={{ fontSize: '30px', display: 'inline', color: 'red', fontWeight: 'bold' }}>
    {email && email}
  </h1>
</div>
  )
}

export default Checkinbox