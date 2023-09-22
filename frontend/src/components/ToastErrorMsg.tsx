import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

const ToastErrorMsg = ({ e, onClose }: { e: string; onClose: Function }) => {
  return (
    <ToastContainer position='top-end'>
      <Toast
        onClose={() => onClose(e)}
        show={!!e && e.length > 0}
        delay={5000}
        autohide
        className='d-inline-block mx-2 mt-3'
        bg={'danger'}
      >
        <Toast.Header closeButton className='rounded'>
          <span className='me-auto'>
            <strong>Error</strong>
            &nbsp;-&nbsp;
            <span className='text-danger'>{e}</span>
          </span>
        </Toast.Header>
      </Toast>
    </ToastContainer>
  )
}

export default ToastErrorMsg
