import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import historyIcon from '../../assets/history.svg'
import youtubeIcon from '../../assets/icons/youtubeIcon.svg'
import searchIcon from '../../assets/icons/searchIcon.svg'

import YoutubePage from './YoutubePage';
import GooglePage from './GooglePage';
import useSearchApi from '../../hooks/useSearchApi';
import Loader from '../../components/Loader';
import Error from '../../components/Error';

const DoubtPage = () => {
  const { pathname } = useLocation()
  const [pop, setPop] = useState(false);
  const [showGoole, setShowGoogle] = useState(true);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { googleSearch, youtubeSearch, isLoading, isError } = useSearchApi();

  const handleSearch = async (type) => {

    if (type == 'google') {
      setShowGoogle(true);
      let res = await googleSearch(searchText);
      setResult(res)
    } else {
      setShowGoogle(false);
      let res = await youtubeSearch(searchText);
      let { contents } = res;
      setResult(contents)
    }

  }

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      handleSearch();
    }
  }

  useEffect(() => {
    result == null ? "" : setHistory((word) => [...word, { word: searchText, type: Array.isArray(result) ? "youtube" : "google" }]);
  }, [result])


  return (
    <div className='w-full h-full'>

      {/* heading */}
      <div className='w-full h-[32px] flex justify-between relative'>
        <p className='text-2xl font-semibold border-b-2 border-white capitalize'>{pathname.split("/")[2]}</p>
        <img loading="lazy" onClick={() => setPop(!pop)} src={historyIcon} alt="" srcSet="" />

        {/* pop */}
        {pop && <div className='w-[200px] h-[400px] flex flex-col gap-2 absolute top-6 right-6 bg-bgHistoryPop rounded-lg'>
          <p className='w-full h-[40px] flex justify-center items-center'>Your history</p>
          <div className='w-full h-[320px] overflow-scroll flex flex-col gap-1 p-2'>
            {history.map((e) => (
              <p className='flex justify-between gap-2 capitalize items-center text-[18px]'>
                <span>{e.word}</span>
                <img loading="lazy" className='w-[20px] h-[20px]' src={e.type == "youtube" ? youtubeIcon : searchIcon} alt="" srcset="" />
              </p>
            ))}
          </div>
          <p onClick={() => setPop(false)} className='w-full h-[40px] flex justify-center items-center absolute bottom-0 left-0'>Close</p>
        </div>}

      </div>

      <div className='w-full h-[calc(100dvh-65px)] md:h-[calc(100dvh-120px)] overflow-hidden flex flex-wrap justify-start items-start pt-5'>

        <div className='w-full h-[55px] flex justify-center gap-2 px-0 lg:px-5 py-2'>

          <input className='w-full p-2 rounded-lg text-black font-medium' type="text" value={searchText} onChange={e => setSearchText(e.target.value)} onKeyUp={handleEnter} placeholder='Search...' />

          <button className='w-[50px] lg:w-[150px] bg-blue-500 text-white rounded-lg px-0 py-0 lg:px-4 lg:py-2 flex items-center justify-center gap-2' onClick={() => (handleSearch("google"))}>
            <img loading="lazy" className='w-[20px] h-[20px]' src={searchIcon} alt="" srcSet="" />
            <span className='hidden lg:block'>Google</span>
          </button>

          <button className='w-[50px] lg:w-[150px] bg-blue-500 text-white rounded-lg px-0 py-0 lg:px-4 lg:py-2 flex items-center justify-center gap-2' onClick={() => (handleSearch("youtube"))}>
            <img loading="lazy" className='w-[20px] h-[20px]' src={youtubeIcon} alt="" srcSet="" />
            <span className='hidden lg:block'>Youtube</span>
          </button>

        </div>

        {/* SHOWING RESULTS */}
        <div className='w-full h-[calc(100dvh-175px)] overflow-scroll'>
          {isError
            ?
            <Error />
            :

            !isLoading
              ?

              showGoole
                ?
                <GooglePage result={result} />
                :
                <YoutubePage result={result} />

              :
              <Loader />
          }
        </div>

      </div>

    </div>
  )
}

export default DoubtPage