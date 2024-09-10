import React from 'react'
import PulseLoader from "react-spinners/PulseLoader";


const LoaderButton = ({ text, loading = false, width = '90px', bgColor = "bg-blue-700", onClick = () => { } }) => {
    return (
        <button onClick={onClick} disabled={loading} className={`h-[40px] px-4 py-2 flex items-center justify-center capitalize ${bgColor} shadow-md rounded-lg`} style={{ width: width }}>
            {loading ? <PulseLoader
                color={"#75F94C"}
                loading={true}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
            /> : <p>{text}</p>}
        </button>
    )
}

export default LoaderButton