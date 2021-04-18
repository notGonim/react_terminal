import * as esbuild from 'esbuild-wasm'
import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'


const App =()=>{
    
    const [input ,setInput]=useState('')
const [code,setCode]=useState('')

const ref=useRef<any>()


const startService =async()=>{
ref.current = await  esbuild.initialize({
    worker: true,
    wasmURL: '/esbuild.wasm'
  })
ref.current=true
}


useEffect(()=>{
startService()

},[])

const onSubmitHandler= async()=>{
 
if(!ref.current)
return
const res=await   esbuild.transform(input,{
            loader:'jsx',
            target:'es2015'
        }) 
         setCode(res.code)
       }


return  (
        <div className="">
            <textarea value={input} onChange={(e)=>setInput(e.target.value)} ></textarea>
<button onClick={onSubmitHandler}>Submit</button>
<pre>{code}</pre>
        </div>
    )
}


ReactDOM.render(
    <App/>,
    document.querySelector('#root')
)