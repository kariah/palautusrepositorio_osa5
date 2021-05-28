import React from 'react'

const Notification = (props) => {
  const infoMessage = props.infoMessage
  const errorMessage = props.errorMessage

  if (infoMessage === null && errorMessage === null) {
    return null
  }

  if (infoMessage !== undefined && infoMessage !== null) {
    return (
      <div className="info" id="info">
        {infoMessage}
      </div>)
  }
  else if (infoMessage !== undefined && errorMessage !== null) {
    return (
      <div className="error" id="error">
        {errorMessage}
      </div>)
  }
  else
  {
    return (
      <div>
      </div>)
  }
}


export default Notification