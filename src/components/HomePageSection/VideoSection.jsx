import React from 'react'

const VideoSection = () => {
    let videourl=" https://res.cloudinary.com/dqr1ihw8d/video/upload/v1708852581/bagsl69fpvfk7giird1l.mp4"
  return (
    <div>
      <div  className="w-11/12 border-l-8 border-t-8 border-l-white border-t-white mx-auto  shadow-lg shadow-cyan-500/50    ">
<video src={videourl} autoPlay loop muted className='object-cover w-full'/>
</div>
    </div>
  )
}

export default VideoSection
