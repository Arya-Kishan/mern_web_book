import React, { memo } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({ loaderSize = 50 }) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>

      <ClipLoader
        color={"#75F94C"}
        loading={true}
        size={loaderSize}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default memo(Loader)