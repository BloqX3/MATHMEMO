import { useState } from 'react';
import './App.css';
import ConstantInput from './components/ConstInput';
import RadioSelector from './components/RadioSelector.jsx';
import TopBar from './components/TopBar.jsx';
import piDigits from './assets/pi1mil.txt?raw';
import eDigits from './assets/e1mil.txt?raw';
import phiDigits from './assets/phi1mil.txt?raw';
import { estimatePercentile } from './benchmark.js';

const CONSTANTS = [
  { value: 'pi',  label: 'π = 3.14...', number: piDigits },
  { value: 'e',   label: 'e = 2.71...', number: eDigits },
  { value: 'phi', label: 'φ = 1.61...', number: phiDigits },
];

const REACTIONS = ['🚀', '😎', '😱', '💀'];

function App() {
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState(0);
  const [errors, setErrors] = useState(0);
  const [percentile, setPercentile] = useState(0);
  const [no, setNo] = useState(10);

  const currentNumber = CONSTANTS[selected].number;

  // Validation: check if the text is a prefix of the current constant number.
  const validate = (text) => {
    if (currentNumber.startsWith(text)) {
      return true;
    } else {
      setErrors((prev) => prev + 1);
      return false;
    }
  };

  const handleChange = (text) => {
    if (validate(text)) {
      setValue(text);
      const cleanLength = text.replace('.', '').length;
      setPercentile(cleanLength === 0 ? 0 : estimatePercentile(cleanLength));
    }
  };

  const reset = () => {
    setValue('');
    setPercentile(0)
    setErrors(0);
  };

  const showNext = () => {
    // Only adds the next character if we have not exceeded one million digits.
    if (value.replace('.', '').length < 1000000) {
      setValue(value + currentNumber[value.length]);
    }
  };

  const revealDigits = () => {
    reset();
    setValue(currentNumber);
  };

  const revealFirst = () => {
    reset();
    const revealCount = parseInt(no, 10);
    let substring = currentNumber.substring(0, Math.min(revealCount, currentNumber.length));
    // If the substring includes a decimal point, reveal one digit extra.
    if (substring.includes('.')) {
      substring = currentNumber.substring(0, Math.min(revealCount + 1, currentNumber.length));
    }
    setValue(substring);
  };

  // Declared inline style objects for clarity and to avoid duplication.
  const mainStyle = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 20px 10px 20px',
    boxSizing: 'border-box',
  };

  const actionContainerStyle = {
    display: 'flex',
    columnGap: 15,
    rowGap: 5,
    alignItems: 'center',
    flexWrap: 'wrap',
  };

  const errorStyle = {
    color: errors > 4 ? '#D22B2B' : 'inherit',
  };

  return (
    <main style={mainStyle}>
      <TopBar percentage={percentile} />
      <div style={containerStyle}>
        <h1 style={{ fontSize: '30px' }}>
          MATHMEMO: memorize math constants!{' '}
          {REACTIONS[Math.min(Math.floor(value.length / 150), REACTIONS.length - 1)]}
        </h1>
        <div style={{ marginTop: '20px' }}>
          <RadioSelector
            name="constants"
            options={CONSTANTS}
            selectedIndex={selected}
            onChange={(i) => {
              setSelected(i);
              reset();
            }}
          />
        </div>
        <div style={actionContainerStyle}>
          <h4>
            {value.replace('.', '').length} digits /{' '}
            <span style={errorStyle}>{errors} error</span>
          </h4>
          <button onClick={reset}>reset</button>
          <button onClick={showNext}>show next</button>
          <button onClick={revealDigits}>reveal digits</button>
          <button onClick={revealFirst}>reveal first:</button>
          <input
            style={{ width: '60px' }}
            type="number"
            value={no}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              if (newValue >= 0 && newValue <= 1000000) setNo(newValue);
            }}
            min={0}
            max={1000000}
          />
        </div>
      </div>
      <ConstantInput Label="Write down digits:" value={value} error={errors} onChange={handleChange} />
    </main>
  );
}

export default App;