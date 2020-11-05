import React, {useState, useEffect} from 'react'
import './App.css';

function App() {
	//userInput holds value of current input
	const [userInput, setUserInput] = useState("")
	//userInputs holds Array of previous inputs
	const [userInputs, setUserInputs] = useState([])
	//scores holds Array of scores as string -> for example ["++-","--"]
	const [scores, setScores] = useState([])
	//test holds 4 digits random number with no repetitions
	const [test, setTest] = useState()
	//decleration of controlArray
	var controlArray=[]

	//useEffect hook will trigger randomNumber() and set it's value as test value
	useEffect(() => {
		setTest(randomNumber())
	}, [])

	//Generates 4 digit random number with no repetitions
	function randomNumber(){
		return mix( "0123456789".split('') ).join('').substring(0,4);
	}
	
	//suffles the number
	function mix(number){
		for(var j, x, i = number.length; i; j = Math.floor(Math.random() * i), x = number[--i], number[i] = number[j], number[j] = x);
		return number;
	}
	//This function triggers on every input change and assign the target value as userInput
	const onUserInputChange=(event)=>{
		setUserInput(event.target.value)
	}
	//on submittion of userInput, this function push current userInput into userInputs
	//also the function triggers check() and by changing controlArray, this function push controlArray into scores Array
	//Before pushing controlArray, it is sorted in order to sort controlArray as "++--" instead of unsorted combinations like "-++-"
	//After all of these operations, function sets userInput and controlArray empty.
	const onSubmit=(e)=>{
		e.preventDefault()
		check();
		setUserInputs([...userInputs, userInput])
		setScores([...scores, controlArray.sort().join("")])
		setUserInput("")
		controlArray=[];
	}
	//this function compares test number with userInput
	const check = ()=>{
		if(test===userInput){
			alert("Kazandınız!")
			controlArray=["++++"]
		}else{
			for(var i=0; i<4 ; i++){
				if(test.substring(i,(i+1)) === userInput.substring(i,(i+1))){
					controlArray.push("+")
				}else if(test.substring(i,(i+1)) === userInput.substring(0,1)){
					controlArray.push("-")
				}else if(test.substring(i,(i+1)) === userInput.substring(1,2)){
					controlArray.push("-")
				}else if(test.substring(i,(i+1)) === userInput.substring(2,3)){
					controlArray.push("-")
				}else if(test.substring(i,(i+1)) === userInput.substring(3,4)){
					controlArray.push("-")
				}
			}
		}
	}

	// on restarting game both score and Input array refresh and new test number is assigned
	const onRestartGame=()=>{
		setScores([])
		setUserInputs([])
		setTest(randomNumber())
	}
	return (
		<div className="App">
			<h1>Sayı Bulma Oyunu</h1>
			<form action="" onSubmit={onSubmit}>
				<input type="text" value={userInput} onChange={onUserInputChange} minLength="4" maxLength="4"/>
				<button type="submit">Sayıyı Dene</button>
			</form>
			<br/>
			<br/>
			<table className="center">
				<tr>
					<th>Tahmin</th>
					<th>Sonuç</th>
				</tr>
				<tr>
					<td>
						{userInputs.map((userInput,index)=>{
							return <div key={index}>{userInput}</div>
						})}
					</td>
					<td>
						{scores.map((score,index)=>{
							return <div key={index}>{score.length ? score : <br/>}</div>
						})}
					</td>
				</tr>
			</table>
			<br/>
			<br/>
			<button onClick={onRestartGame}>Yeni Oyun</button>
		</div>
	);
}

export default App;
