import { useState } from 'react'

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0) // Le nombre d'essai
    const [currentGuess, setCurrentGuess] = useState('') 
    const [guesses, setGuesses] = useState([...Array(6)]) 
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false) // Reponse trouvée ou non

    const formatGuess = () => {
        // Tableau des lettres de la solution
        let solutionArray = [...solution]
        // {S, grey}, {k, grey}, {a, grey}, {t, grey}, {e, grey}
        let formattedGuess = [...currentGuess].map((letter) => {
            return {key: letter, color: 'grey'}
        })
        
        // Find any green letter
        formattedGuess.forEach((letter, index) => {
            if (solutionArray[index] === letter.key) {
                formattedGuess[index].color = "green"
                solutionArray[index] = null;
            }
        })

        // Find any yellow letter
        formattedGuess.forEach((letter, index) => {
            if (solutionArray.includes(letter.key)
            && letter.color !== 'green'
            && solutionArray[index] !== letter.key) {
                formattedGuess[index].color = "yellow"
                solutionArray[solutionArray.indexOf(letter.key)] = null
            }
        })

        return formattedGuess
    }

    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true);
        }

        setGuesses((previousGuesses) => {
            let newGuesses = [...previousGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })

        setHistory((previousHistory) => {
            return [...previousHistory, currentGuess]
        })

        setTurn((previousTurn) => {
            return previousTurn + 1;
        })

        setCurrentGuess("")
    } 

    const handleKeyUp = ({ key }) => {

        key = key.toUpperCase();
        if (key === "ENTER") {
            if (currentGuess.length !== 5) {
                return;
            }

            if (turn > 5) {
                return;
            }

            if (history.includes(currentGuess)) {
                return;
            }

            /* if (motNexistePas() === true) {
                return;
            } */

            // Soumission
            const formatted = formatGuess();
            addNewGuess(formatted)
        }

        if (key === "BACKSPACE") {
            setCurrentGuess((prev) => {
                // Retire une lettre
                return prev.slice(0, -1)
            })
            return
        }

        // N'accepte que les lettres
        if (/^[A-Za-z]$/.test(key)) {
            key = key
            // 5 is the limit of guesses
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    let str = prev + key
                    return str
                })
            }
        }

    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyUp}

}

export default useWordle