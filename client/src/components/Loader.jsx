import React, { memo } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
    <div className='w-full h-full parent-center'>

      <ClipLoader
        color={"#75F94C"}
        loading={true}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default memo(Loader)