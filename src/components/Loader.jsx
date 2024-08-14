import './Loader.css'


function optgenrate(a,b){
  const val =  Math.random()%100;
    val = val*a;
    val = val+b;
  return val;
}

function optgenrate2(a,b){
  const val =  Math.random()%100;
    val = val*a;
    val = val+b;
  return val;
}
function optgenrate3(a,b){
  const val =  Math.random()%100;
    val = val*a;
    val = val+b;
  return val;
}
function generateOTP() { 
  
  // Declare a digits variable 
  // which stores all digits  
  let digits = '0123456789'; 
  let OTP = ''; 
  let len = digits.length 
  for (let i = 0; i < 4; i++) { 
      OTP += digits[Math.floor(Math.random() * len)]; 
  } 
   
  return OTP; 
} 

export default function Loader() {
  return (

    <div className="loader">
    <span className="loader-text">loading</span>
      <span className="load"></span>
  </div>

  )
}
