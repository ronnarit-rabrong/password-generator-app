import "./style.scss";
import React from "react";
import { randomFn, validateFn } from "./helper";
import { arrowIcon, copyIcon } from "./iconPath";
import type { inputEvent, formEvent } from "../../types/event";

export default function Generator(): React.ReactElement {
  const [error, setError] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>("PTx1f5DaFX");
  const [charactorLength, setCharactorLength] = React.useState<number>(10);
  const [charactorToInsert, setCharactorToInsert] = React.useState<{ [key: string]: boolean }>({
    uppercase: true,
    lowercase: true,
    number: true,
    symbol: false,
  });

  const level = validateFn(password);
  const levelName = ["LOWER", "LOW", "MEDIUM", "HIGH", "HIGHER"];
  const charactorLengthBar = (charactorLength * 100) / 20;

  function handleCharactorLength(e: inputEvent): void {
    const value = parseInt(e.currentTarget.value);
    setCharactorLength(value);
  }

  function handleCharactorToInsert(e: inputEvent): void {
    const key = e.currentTarget.id;
    const value = e.currentTarget.checked;
    setCharactorToInsert((values) => ({ ...values, [key]: value }));
  }

  function handleClickCopyPassword(text: string): void {
    navigator.clipboard
      .writeText(text)
      .then(() => alert(`"${password}" Copy Completed.`))
      .catch((err) => {
        alert(`Copy Failure.`);
        console.error(err);
      });
  }

  function handleSubmit(e: formEvent): void {
    e.preventDefault();
    const result = randomFn(charactorLength, charactorToInsert);
    setPassword(result);
    setError(false);
  }

  React.useEffect((): void => {
    function checkInput() {
      const charactorToInsertArray = [...Object.values(charactorToInsert)];
      const selectCharator = charactorToInsertArray.some((item) => item === true);
      if (charactorLength < 5 || selectCharator === false) {
        setError(true);
      } else {
        setError(false);
      }
    }
    checkInput();
  }, [charactorToInsert, charactorLength]);

  return (
    <section className={`generater ${error ? "generater--error" : ""}`}>
      {/* generator title */}
      <h1 className="title">Password Generator</h1>

      {/* generator result */}
      <div className="result">
        <h2 className="result__password">{password}</h2>
        <button className="result__copy" onClick={async () => handleClickCopyPassword(password)} disabled={error}>
          <span>COPIED</span>
          <svg width="21" height="24" xmlns="http://www.w3.org/2000/svg">
            <path d={copyIcon} fill="#A4FFAF" />
          </svg>
        </button>
      </div>

      {/* generator form */}
      <form onSubmit={handleSubmit}>
        {/* fleld generator-form-charactorLength */}
        <div className="form-range">
          <label className="form-range__label" htmlFor="charactor-range">
            Character Lengths
          </label>
          <div className="form-range__bar" style={{ width: charactorLengthBar + "%" }}></div>
          <input className="form-range__input" id="charactor-range" type="range" min={0} max={20} value={charactorLength} onChange={handleCharactorLength} />
          <span className="form-range__value">{charactorLength}</span>
        </div>

        {/* field generator-form-charactorInsert*/}
        <div className="form-checkbox">
          <input className="form-checkbox__input" id="uppercase" type="checkbox" checked={charactorToInsert.uppercase} onChange={handleCharactorToInsert} />
          <label className="form-checkbox__label" htmlFor="uppercase">
            Include Uppercase Letters
          </label>
        </div>

        <div className="form-checkbox">
          <input className="form-checkbox__input" type="checkbox" id="lowercase" checked={charactorToInsert.lowercase} onChange={handleCharactorToInsert} />
          <label className="form-checkbox__label" htmlFor="lowercase">
            Include Lowercase Letters
          </label>
        </div>

        <div className="form-checkbox">
          <input className="form-checkbox__input" id="number" type="checkbox" checked={charactorToInsert.number} onChange={handleCharactorToInsert} />
          <label className="form-checkbox__label" htmlFor="number">
            Include Numbers
          </label>
        </div>

        <div className="form-checkbox">
          <input className="form-checkbox__input" id="symbol" type="checkbox" checked={charactorToInsert.symbol} onChange={handleCharactorToInsert} />
          <label className="form-checkbox__label" htmlFor="symbol">
            Include Symbols
          </label>
        </div>

        {/* validate-password */}
        <div className="form-validate">
          <p className="form-validate__info">STRENGTH</p>
          <div className="score">
            <p className="score__name">{levelName[level]}</p>
            <p className={`score__level score__level--${level}`}>{level > -1 && <span></span>}</p>
            <p className={`score__level score__level--${level}`}>{level > 0 && <span></span>}</p>
            <p className={`score__level score__level--${level}`}>{level > 1 && <span></span>}</p>
            <p className={`score__level score__level--${level}`}>{level > 2 && <span></span>}</p>
            <p className={`score__level score__level--${level}`}>{level > 3 && <span></span>}</p>
          </div>
        </div>

        {/* submit to generate password */}
        <button className="form-submit" type="submit" disabled={error}>
          <span>GENERATE</span>
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path fill="#24232C" d={arrowIcon} />
          </svg>
        </button>
      </form>
    </section>
  );
}
