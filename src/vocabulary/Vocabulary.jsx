import React, { useState, useEffect, useRef } from 'react';
import { FaAssistiveListeningSystems, FaBars, FaTimes } from "react-icons/fa";

const Vocabulary = () => {
  const videoSources = [
    'https://www.w3schools.com/html/mov_bbb.mp4',
    'https://www.w3schools.com/html/movie.mp4'
  ];

  const videoSubtitles = [
    "This is the subtitle for the first video.",
    "This is the subtitle for the second video."
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoKey, setVideoKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const videoRef = useRef(null);

  const handleRepeatVideo = () => setVideoKey(k => k + 1);
  const handleVideoEnded = () => {
    setCurrentVideoIndex(i => (i + 1) % videoSources.length);
    setVideoKey(k => k + 1);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && isPaused && videoRef.current) {
        videoRef.current.play();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPaused]);

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
    
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-sky-700 p-2 rounded text-white"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      
      <div
        className={`
          bg-zinc-950 flex flex-col items-center pt-10 gap-6 shrink-0
          w-64 z-40
          fixed top-0 left-0 h-full transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:w-80 md:pt-20
        `}
      >
        <button className='w-60 py-2 bg-sky-700 text-white rounded hover:bg-sky-600 transition-colors'>
          Vocabulary
        </button>
        <button className='w-60 py-2 bg-sky-700 text-white rounded hover:bg-sky-600 transition-colors'>
          Practicing Assessment
        </button>
        <button className='w-60 py-2 bg-sky-700 text-white rounded hover:bg-sky-600 transition-colors'>
          AI Interaction
        </button>
        <button className='w-60 py-2 bg-sky-700 text-white rounded hover:bg-sky-600 transition-colors'>
          Real Time AI
        </button>
        <button className='w-60 py-2 bg-sky-700 text-white rounded hover:bg-sky-600 transition-colors'>
          Feedback
        </button>
      </div>

      
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

     
      <div className="flex-grow grid grid-cols-1 md:grid-cols-7 grid-rows-1 md:grid-rows-[minmax(0,70vh)_minmax(0,30vh)] gap-4 bg-stone-950 p-2 overflow-auto">
       
        <div className='bg-neutral-900 md:col-span-5 rounded-xl overflow-hidden relative h-[70vh] min-h-[400px]'>
          <video
            key={videoKey}
            ref={videoRef}
            src={videoSources[currentVideoIndex]}
            controls
            autoPlay
            onEnded={handleVideoEnded}
            onPause={() => setIsPaused(true)}
            onPlay={() => setIsPaused(false)}
            className="w-full h-full object-contain rounded-xl"
          />
          <button
            onClick={handleRepeatVideo}
            className="absolute top-4 right-4 bg-white px-4 py-2 rounded-md hover:bg-sky-700 shadow text-sm transition-colors"
          >
            Repeat
          </button>
          {isPaused && (
            <div
              style={{ backdropFilter: "blur(5px)" }}
              className={`absolute bottom-10 text-center left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-3xl shadow flex items-center gap-2 text-xl font-medium ${
                windowWidth < 400 ? 'text-sm w-64 h-16' : 'w-[360px] h-20'
              }`}
            >
              Listening in Progress <FaAssistiveListeningSystems size={windowWidth < 400 ? 20 : 28} />
            </div>
          )}
        </div>

        
        <div className='bg-neutral-900 md:col-span-2 md:row-span-2 overflow-y-auto p-4 flex flex-col gap-4 rounded-xl'>
          {Array.from({ length: 12 }).map((_, idx) => (
            <div key={idx} className="w-full bg-gray-700 rounded-lg shadow-md hover:bg-sky-600 transition-colors">
              <button className="w-full h-20 py-5 px-2 text-white rounded-lg text-left">
                Task Assessment {idx + 1}
              </button>
            </div>
          ))}
        </div>

       
        <div className='bg-neutral-900 md:col-span-5 rounded-xl p-4 text-white text-lg overflow-auto'>
          {videoSubtitles[currentVideoIndex]}
        </div>
      </div>
    </div>
  );
};

export default Vocabulary;