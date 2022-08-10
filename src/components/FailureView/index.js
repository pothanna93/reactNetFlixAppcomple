import {RiAlertFill} from 'react-icons/ri'

import './index.css'

const FailureView = props => {
  const {onRetry} = props
  const onClickRetry = () => {
    onRetry()
  }

  return (
    <div className="fail-container">
      <RiAlertFill className="triangle" />
      <p className="try-description">Something went wrong. Please try again</p>
      <button type="button" className="try-btn" onClick={onClickRetry}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
