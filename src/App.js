import {useCallback, useEffect, useState, useRef} from 'react'
import './App.css';

function App() {
  
 let [length,setlength]=useState(8);
 let [addnum, setaddnum] = useState(false);
 let[addchar, setaddchar] =useState(false);
 const [password, setpassword] = useState("");

 const passwordref=useRef(null)

 const copytoclip=useCallback(()=>{
  passwordref?.current?.select()
  window.navigator.clipboard.writeText(password)
 }
)

function getnumber(e){
  let num=e.target.value
  setlength(num)
}

const generatepass= useCallback(()=>{
  let pass=""
  let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

  if(addnum){
    str+="012345678"
  }
  if(addchar){
    str+="{}[](()!`^%#@$"
  }

  for(let i=1;i<=length;i++){
    pass+= str.charAt(Math.floor(Math.random()*str.length+1))
  }
  setpassword(pass)
},[length,addchar,addnum,setpassword]
)

useEffect(()=>{
  generatepass()
}, [length,addchar,addnum,generatepass])

  return (
    <div className="App">
      <h1 className="heading">Password generator</h1>
      <div className="main">
      <input className="input" value={password} placeholder="password" ref={passwordref}></input>
      <button className="but" onClick={copytoclip}>Copy</button>
      <div className="changes">
      <input type="range" min={8} max={100} onChange={getnumber}></input>
      <p value={length}>Length:{length}</p>
      <input type="checkbox" defaultChecked={addnum} onChange={()=>{setaddnum((prev)=>!prev)}}></input>
      <p>Number</p>
      <input type="checkbox" defaultChecked={addchar} onChange={()=>{setaddchar((prev)=>!prev)}}></input>
      <p>Character</p>
      </div>
      </div>
    </div>
  );
}

export default App;
