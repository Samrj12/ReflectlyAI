import React from 'react'

const FallingStar = ({className, height}) => {
    const h = height || "h-24"
  return (
    <div className={`relative flex flex-col items-center justify-center z-10 ${className}`}>
    <div
      className={`w-px  from-[1%]  bg-gradient-to-b from-inherit via-inherit to-inherit ${h}`}
    >
    </div>

      <div className={`leading-1 drop-shadow-[0_30px_100px_#d9f99d] translate-y-1/2`}>&#10022;</div>
    </div>
  )
}

export default FallingStar