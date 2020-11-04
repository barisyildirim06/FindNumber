import React, {useState, useEffect} from 'react'
import './App.css';

function App() {
	const [userInputs, setUserInputs] = useState([])
	const [scores, setScores] = useState([])
	const [test, setTest] = useState()

	useEffect(() => {
		setTest(randomNumber())
	}, [])

	function randomNumber(){
		return mix( "0123456789".split('') ).join('').substring(0,4);
	}
	
	function mix(number){
			for(var j, x, i = number.length; i; j = Math.floor(Math.random() * i), x = number[--i], number[i] = number[j], number[j] = x);
			return number;
	}

	console.log(test)
	var userInput
	const onUserInputChange=(event)=>{
		userInput = event.target.value
		console.log(userInput)
	}
	const onSubmit=(e)=>{
		e.preventDefault()
		check();
		setUserInputs([...userInputs, userInput])
		setScores([...scores, controlArray.sort().join("")])
		controlArray=[];
	}
	var controlArray=[]
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

	const onRestartGame=()=>{
		setScores([])
		setUserInputs([])
		setTest(randomNumber())
		console.log(test)
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
