import { useState,useCallback, useEffect, useRef } from "react";

function App(){
  const [length,setLength] = useState(8)
  const [num,setNum] = useState(false)
  const [char,setChar] = useState(false)
  const [password , setPassword] = useState()
  const passwordRef = useRef(null)

  const passwordGenerator= useCallback(()=>{
    let pass =''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(num) str+='0123456789'
    if(char) str+="@%&*@!#*%*"

    for (let i = 1;i<= length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)

    }
    setPassword(pass)
  } ,[length,num,char,setPassword])
                                    // use call back hook
  
  const copyPasswordToClip = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])



  useEffect(()=>{
    passwordGenerator()
  },[length,char,num,,passwordGenerator])
                              

  return (<>
      <h1>Password Generator</h1>
     <div className="container">
      <input type="text"
      value={password}
      className="inputt"
      placeholder="password..."
      readOnly
      ref={passwordRef}
      />  
      <button
      onClick={copyPasswordToClip}
      >Copy</button>
     </div>
     <div className="">
      <div>
        <input type="range" min={6} max={20} value={length} className="" 
        onChange={(e)=>{
          setLength(e.target.value)
        }}
        />
        <label>Length: {length}
        </label>
      </div>
      <div>
        <input type="checkbox"
        defaultChecked={num}
        onChange={()=>{
          setNum((prev) => !prev)
        }}
        />
        <label >Numbers</label>

        <input type="checkbox"
        defaultChecked={char}
        onChange={()=>{
          setChar((prev)=>!prev)
        }}
        />
        <label >Special Characters </label>
      </div>
     </div>
  </>)
}

export default App;
