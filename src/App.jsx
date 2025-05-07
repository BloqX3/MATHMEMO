import { useState } from 'react'
import './App.css'
import ConstantInput from './components/ConstInput';
import RadioSelector from "./components/RadioSelector.jsx";
import piDigits from './assets/pi1mil.txt?raw';
import eDigits from './assets/e1mil.txt?raw';
import phiDigits from './assets/phi1mil.txt?raw';
import TopBar from './components/TopBar.jsx';

const CONSTANTS = [
  { value: 'pi',    label: 'π = 3.14...', number: piDigits  },
  { value: 'e',     label: 'e = 2.71...', number: eDigits },
  { value: 'phi',   label: 'φ = 1.61...', number: phiDigits}
]

function App() {
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState(0);
  const [errors, set_errors] = useState(0)

  const [no, setNo] = useState(10);

  // simple validation: at least 5 digits
  const validate = text => {
    //text.replace(/\D/g, '').length >= 5;
    if(text === CONSTANTS[selected].number.substring(0, text.length))
        setValue(text)
    else{
      set_errors(errors+1)
      return false;
    }
    return true;
  }

  const handleChange = (text) => {
    var res = validate(text);
    if(res){
      setValue(text);
    }
  };

  function reset(){
    setValue("")
    set_errors(0)
  }
  function show_next(){
    if(value.replace(".","").length < 1000000)
    setValue(value + CONSTANTS[selected].number[value.length])
  }

  return (
    <main style={{
           width:'100%',
           height:'100vh',
           display:'flex',
           flexDirection:'column',
         }}>
          
          <TopBar/>
      <div style={{
           display:'flex',
           flexDirection:'column',
           padding:'20px 20px 10px 20px',
           boxSizing:'border-box'

         }}>
        <h1 style={{fontSize:'30px'}}>MATHMEMO: memorize math constants!</h1>
        <div style={{marginTop:"20px"}}>
        <RadioSelector
          name="constants"
          options={CONSTANTS}
          selectedIndex={selected}
          onChange={(i)=>{
            setSelected(i);
            reset()
          }}
        />
        </div>
        <div style={{display:'flex', gap: 20, alignItems:'center', flexWrap: "wrap"}}>
          <h4>{value.replace(".","").length} digits / <span style={{color:(errors > 4) && "#D22B2B"}}>{errors} error</span></h4>
          <button onClick={reset}>reset</button>
          <button onClick={show_next}>show next</button>
          <button onClick={()=>{
            reset()
            setValue(CONSTANTS[selected].number)
          }}>reveal digits</button>
          <button onClick={()=>{
            reset()
            const num = CONSTANTS[selected].number;
            var res = num.substring(0, Math.min(parseInt(no, 10), num.length))
            if(res.includes('.')){
              res = num.substring(0, Math.min(parseInt(no, 10) + 1, num.length))
            }
            setValue(res)
          }}>reveal first:</button>

            <input 
            style={{
              width: "60px"
            }}
              type='number' 
              value={no}
              onChange={(val)=>val.target.value >= 0 && val.target.value <=1000000 && setNo(val.target.value)}
              min={0}
              max={1000000}
            />
        </div>
      </div>

      <ConstantInput
        Label="Write down digits:"
        value={value}
        error={errors}
        onChange={handleChange}
      />
      </main>

  );
}

export default App
