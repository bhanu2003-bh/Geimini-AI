import './Button.css'
import "babel-polyfill";
import {useState,useEffect} from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { obj } from "./confg";
import SpeechRecognition,{useSpeechRecognition} from 'react-speech-recognition'
import Loader from './components/Loader';


function App() {
 const [output, setoutput] = useState('');
const [Input,setInput] = useState('');
const [text,settext] = useState(true);
const [load,setload] = useState(false);

const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
const { transcript,resetTranscript,browserSupportsSpeechRecognition} = useSpeechRecognition();


if (!browserSupportsSpeechRecognition) {
   alert('Browser does not support speech recognition.');
}


function SpeechMe(e){
  e.preventDefault();
  if(text){
       resetTranscript();
    startListening();
  }
  else{
    SpeechRecognition.stopListening();
    handleSubmit();
  }
settext((prev) => !prev);

}


function speak(Speech) {
  
  const utterance = new SpeechSynthesisUtterance(Speech);

  
  const voices = speechSynthesis.getVoices();

  console.log(voices);
  utterance.voice = voices[1]; 

  
  speechSynthesis.speak(utterance);
}


const genAI = new GoogleGenerativeAI(obj.api_url);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


async function run(Question = "How are you") {
  const result = await model.generateContent(Question);
  const response = await result.response;
  const text = response.text();
  return text;
}

 function Geimini(Question) {
 
   run(Question)
  .then((res) => {
     setload(false);
     setoutput(res);
     speak(res);
  })
  .catch((err) =>{
    alert(err);
  });
}


function fun(e){
setInput(e.target.value);
}

function handleSubmit(e){
if(e) e.preventDefault();
Geimini(Input);
setload(true);
}



useEffect(()=>{
document.querySelector('#email').value = transcript;
setInput(transcript);
},[transcript])


  return (
    <div>
      <div className="flex-container">
        <div className="form-container">
          <form className="form">
            <div className="form-group">
              <label htmlFor="email">Message Jarvis</label>
              <input
                type="text"
                id="email"
                name="email"
                required=""
                onChange={fun}
                placeholder="Ask me Anything...."
              ></input>
              <br></br>
              <button onClick={SpeechMe} >{text ? 'Tap to Speak' : 'Listining'}</button>
            </div>
            <div className="form-group">
              <label htmlFor="textarea">Jarvis Response</label>
              <textarea
                name="textarea"
                className='text-area'
                rows="10"
                cols="50"
                disabled
                value = {output}
              >
              </textarea>
              {load ? <Loader></Loader> : <br></br>}
            </div>
            <button onClick={handleSubmit}>Submit</button>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
