import React from 'react'
import Row from './Row.js'

export default function Grid( {currentGuess, guesses, turn} ) {
  return (
    <div>
        {guesses.map((guess, index) => {
            return <Row key={index} guess={guess}/>
        })}
    </div>
  )
}
