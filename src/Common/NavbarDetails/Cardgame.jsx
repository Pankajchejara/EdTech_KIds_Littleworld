import React, { useState, useEffect } from 'react';
import RightAnswer from '../../data/right.mp3'
import WrongAnswer from '../../data/wrong.mp3'
import Spinner from '../../components/Spinner';
import IconBtn from '../Icon';
import toast from 'react-hot-toast';
const Cardgame = () => {
  const [wordList, setWordList] = useState([]);
  const [image, setImage] = useState('');
  const [selectedWord, setSelectedWord] = useState("");
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(true);
const [loading,setLoading]=useState(true);
const ErrorImage="https://res.cloudinary.com/dqr1ihw8d/image/upload/v1709390466/hk1afhsrucj0dbdukkpd.jpg"
  const unsplashurl=`https://api.unsplash.com/search/photos?page=1&query=${selectedWord.word}&client_id=p7Sl3eBqlIgMOZnRAGaC0g0ACR3lf5risDUIPGZDeXc` 
  const[wrong,setWrong]=useState(0);
const rightaud =new Audio(RightAnswer)
const wrongaud =new Audio(WrongAnswer)

async function fetchdata(){


try{
setLoading(true);
  const unsplashdata=await fetch(unsplashurl)
  const unsplashJsonData=await unsplashdata.json()
  setLoading(false);
  setImage(unsplashJsonData.results[0].urls.small)
}
catch{
  setImage(ErrorImage)
}
}
  useEffect(() => {
   
    const wordsData = [
      { word: 'Banana', image: image},
      { word: 'Apple', image:image},
      { word: 'Dog', image: image},
      { word: 'Carrot', image: image},
      { word: 'elephant', image: image },
      { word: 'grapes', image: image },
      { word: 'fish', image: image },
      { word: 'hen', image: image },
      { word: 'jacket', image: image },
      { word: 'lion', image: image },
      { word: 'Mango', image: image },
      { word: 'orange', image: image },
      { word: 'nest', image: image },
      { word: 'iron', image: image },
      { word: 'parrot', image: image },
      { word: 'queen', image: image },

    ];
 
    setWordList(wordsData);
    setSelectedWord(getRandomWord(wordsData));
  }, []);


  useEffect(()=>{
 fetchdata();
  },[selectedWord.word])


  const getRandomWord = (wordArray) => {
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    return wordArray[randomIndex];
    
  };

  const handleWordClick = (selected) => {
    if (selected.word === selectedWord.word) {
      setScore(score + 1);
      rightaud.play();
      setSelectedWord(getRandomWord(wordList));
      toast.success("Right Answer")
    }
    else{
 setWrong(wrong+1);
 wrongaud.play();
 toast.error("Wrong Answer")
    }
  };

  function clickToSubmit(){
    setDone(false)
  }
  function clickToRestart(){
    setDone(true)
    setScore(0)
    setWrong(0)
  }
  function backhandler(){
    setDone(true)
    setScore(0);
    setWrong(0);
  }

  return (
    <div className='py-[80px] w-full '>
  {
    done?(  <div className='flex flex-col justify-center items-center rounded-[10px] w-[80%] mx-auto bg-richblack-700'>
        <h1 className='text-3xl font-bold text-white mt-[20px] '>Kids Learning Game - Words</h1>
       
        <div className='flex justify-center items-center flex-wrap' >
          {wordList.map((wordData, index) => (
            <div className='hover:bg-richblack-25 text-white '
              key={index}
              style={{
                margin: '10px',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                cursor: 'pointer',
                textAlign: 'center',
                fontSize: '18px',
              }}
              onClick={() => handleWordClick(wordData)}
            >
              {wordData.word}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p className='text-white opacity-80'>Click on the word for the corresponding image:</p>
      {
       loading? (<div className='w-[600px] h-[200px] text-white flex justify-center items-center'>Please wait ....<Spinner/></div>):(
       <div className=' flex items-center justify-center'>
        <img className='object-fill h-full w-[600px] rounded-md'
        src={selectedWord ? image : ''}
        alt={selectedWord ? selectedWord : ''}
        style={{ maxWidth: '200px', maxHeight: '200px' }}
      />
       </div>) 
      } 
          
  
          
        </div>
        <div className='w-full flex justify-evenly mb-[20px] '>
        <IconBtn onclick={clickToSubmit} className='w-[100px] bg-blue-100 p-1 rounded-md hover:bg-blue-200'>Submit</IconBtn> 
  <IconBtn outline={true} onclick={clickToRestart} className='w-[100px] bg-brown-100  p-1 rounded-md hover:bg-brown-300'>RestartGame</IconBtn> 
        </div>
 
      </div>):(

        <div className='w-[90%] h-[500px] gap-y-3 mt-5 mx-auto bg-richblack-700 flex flex-col justify-center items-center text-center'>
             <p className='text-blue-100'> RightAnswer : {score}</p>
             <p className='text-red-100'> WrongAnswer : {wrong}</p>
        <IconBtn onclick={backhandler} outline={true}>Back to Game</IconBtn>
          </div>
      )
  }    

  
    </div>
   
  );
};

export default Cardgame;
