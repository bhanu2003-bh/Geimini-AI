import { GoogleGenerativeAI } from "@google/generative-ai";
import { obj } from "../confg";
import UserContext from "../context/UserContext";
import { useContext } from "react";



const genAI = new GoogleGenerativeAI(obj.api_url);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


async function run(Question = "How are you") {
  const result = await model.generateContent(Question);
  const response = await result.response;
  const text = response.text();
  return text;
}

 function useGeimini(Question) {
  const {setresult} = useContext(UserContext);
   run(Question)
  .then((res) => {
    setresult(res);
  })
  .catch((err) =>{
    alert(err);
  });
}

export default useGeimini;
