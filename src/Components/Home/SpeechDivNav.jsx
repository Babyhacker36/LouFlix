import React from 'react'


const SpeechDiv_nav = (props) => {
  const {speechText1, speechText2} = props
  return (
    <div id='speech_bubble_div_nav'>
    <div>
        <p className='speech_text' id="speech_typewriter_nav">{speechText1}</p>
        <p className='speech_text' id="speech_typewriter_nav2"> {speechText2}</p>
    </div>
</div>
  )
}

export default SpeechDiv_nav


