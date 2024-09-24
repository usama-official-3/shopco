import React from 'react'

const Checkinbox = () => {
  return (
    <div style={{ display: 'flex',background:'#000000', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '90vh', padding: '2rem' }}>
    <h1 style={{ fontSize: '140px', padding: 0, margin: 0, display: 'inline' }}>📧</h1>
    <h1 style={{ fontSize: '40px', display: 'inline',color:'white' }}>Check Your Inbox</h1>
    <div style={{color:'white'}}>
        We have sent You a magical Link on Your Provided Email Account 
        <h1 style={{ fontSize: '30px', display: 'inline', color: 'red', fontWeight: 'bold' }}>
            {/* {email && email} */}
        </h1>
    </div>
</div>


  )
}

export default Checkinbox