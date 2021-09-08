import { useState } from 'react';
import './App.css';
import Editor from "@monaco-editor/react";
import Navbar from './Components/Navbar';
import Axios from 'axios';
require('dotenv').config();

const URL = process.env.REACT_APP_URL;

function App() {
  const [userCode, setUserCode] = useState(``);
  const [userLang, setUserLang] = useState("python");
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(20);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  
  const options = {
    fontSize: fontSize
  }

  function compile() {
    if (userCode === ``) {
      return
    }
    Axios.post(`${URL}/compile`, { code: userCode, language: userLang, input: userInput }).then((res) => {
      // setUserOutput(res);
      console.log(res.data.output);
      setUserOutput(res.data.output);
    })
  }

  return (
    <div className="App">
      <Navbar
        userLang={userLang} setUserLang={setUserLang}
        userTheme={userTheme} setUserTheme={setUserTheme}
        fontSize={fontSize} setFontSize={setFontSize}
      />
      <div className="main">
        <div className="left-container">
          <Editor
            options={options}
            height="calc(100vh - 50px)"
            width="100%"
            theme={userTheme}
            language={userLang}
            defaultLanguage="python"
            defaultValue="# Enter your code here"
            onChange={(value)=> {setUserCode(value)}}
          />
          <button className="run-btn" onClick={() => compile()}>Run</button>
        </div>
        <div className="right-container">
          <h4>Input:</h4>
          <div className="input-box">
            <textarea id="code-inp" onChange={(e)=>setUserInput(e.target.value)}></textarea>
          </div>
          <h4>Output:</h4>
          <div className="output-box">
            <pre>{userOutput}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;