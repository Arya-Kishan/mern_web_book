import React from 'react'

const GooglePage = ({ result: result1 }) => {

    function createMarkup(html) {
        return { __html: html };
    }


    return (
        <div className='w-full h-full overflow-scroll'>

            {result1 ? <div className='flex flex-col gap-8'>

                {result1.items.map((e) => (
                    <div key={e.htmlTitle} className='cursor-pointer' onClick={() => window.open(e.link)}>
                        <p className='text-[12px] lg:text-1xl text-yellow-600 truncate'>{e.formattedUrl}</p>
                        <p className='text-white text-[16px] lg:text-xl py-2 line-clamp-1 text-ellipsis'>{e.title}</p>
                        <p className='text-white text-[14px] lg:text-[15px] line-clamp-2 text-ellipsis' dangerouslySetInnerHTML={createMarkup(e.htmlSnippet)}></p>
                    </div>
                ))}

            </div> : <div className='w-full h-full flex justify-center items-center'>Search</div>
            }

        </div>
    )
}

export default GooglePage