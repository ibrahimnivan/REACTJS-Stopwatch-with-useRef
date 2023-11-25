import { useState, useRef } from "react";
import './App.css'

function App() {
  const [randomInput, setRandomInput] = useState("");
  const [seconds, setSeconds] = useState(0);

  const renders = useRef(0);
  const timerId = useRef(0);
  // the value of useRef is still the same between renders (persist)
  //updating ref doesn't trigger re render

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRandomInput(e.target.value);
    renders.current++ //count every rerender
  };

  const startTimer = () => {
    timerId.current = setInterval(() => {
      renders.current++;
      setSeconds(prev => prev + 1);
    }, 1000);
  }

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
  }

  const resetTimer = () => {
    stopTimer();
    if (seconds) {
      renders.current++;
      setSeconds(0);
    }
  }

  return (
    <>
      <main className='app'>
        <input
          type='text'
          value={randomInput}
          placeholder='Random Input'
          onChange={ handleChange }
        />
        <p>Renders: {renders.current}</p>
        <br />
        <br />
        <section>
          <button onClick={startTimer}>Start</button>
          <button onClick={stopTimer}>Stop</button>
          <button onClick={resetTimer}>Reset</button>
        </section>
        <br /><br />
        <p>Seconds: {seconds}</p>
        <br /><br />
        <p>{randomInput}</p>
      </main>
    </>
  );
}

export default App;
