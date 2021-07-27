const dinos = [
			{
					"species": "Triceratops",
					"weight": 13000,
					"height": 114,
					"diet": "herbavor",
					"where": "North America",
					"when": "Late Cretaceous",
					"fact": "First discovered in 1889 by Othniel Charles Marsh"
			},
			{
					"species": "Tyrannosaurus Rex",
					"weight": 11905,
					"height": 144,
					"diet": "carnivor",
					"where": "North America",
					"when": "Late Cretaceous",
					"fact": "The largest known skull measures in at 5 feet long."
			},
			{
					"species": "Anklyosaurus",
					"weight": 10500,
					"height": 55,
					"diet": "herbavor",
					"where": "North America",
					"when": "Late Cretaceous",
					"fact": "Anklyosaurus survived for approximately 135 million years."
			},
			{
					"species": "Brachiosaurus",
					"weight": 70000,
					"height": 372,
					"diet": "herbavor",
					"where": "North America",
					"when": "Late Jurasic",
					"fact": "An asteroid was named 9954 Brachiosaurus in 1991."
			},
			{
					"species": "Stegosaurus",
					"weight": 11600,
					"height": 79,
					"diet": "herbavor",
					"where": "North America, Europe, Asia",
					"when": "Late Jurasic to Early Cretaceous",
					"fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
			},
			{
					"species": "Elasmosaurus",
					"weight": 16000,
					"height": 59,
					"diet": "carnivor",
					"where": "North America",
					"when": "Late Cretaceous",
					"fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
			},
			{
					"species": "Pteranodon",
					"weight": 44,
					"height": 20,
					"diet": "carnivor",
					"where": "North America",
					"when": "Late Cretaceous",
					"fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
			},
			{
					"species": "Pigeon",
					"weight": 0.5,
					"height": 9,
					"diet": "herbavor",
					"where": "World Wide",
					"when": "Holocene",
					"fact": "All birds are living dinosaurs."
			}
	]

//Animal constructor function
function Animal(data){
	function getInfo() {}
	return {
		weight : data.weight,
		height: data.height,
		diet: data.diet,
		species: data.species,
		image: `${data.species.toLowerCase()}.png`,
		getInfo
	}
}

//Human constructor function
function Human(data) {
	Object.assign(data,{species: 'human'})
	const human = Object.assign({},Animal(data),
	{
		name: data.name	
	})

	function getHuman(){
		return {
			name:human.name,
			image:human.image
		}
	}
	return Object.assign({},human,{getInfo:getHuman})    
}

//Dino constructor function
function Dino(data) {
	const dino = Object.assign({},Animal(data),
	{
		where: data.where,
		when: data.when,
		fact: data.fact			
	})
	function setFact(fact) {
		dino.fact = fact
	}
	function getDino(){
		return {
			species:dino.species,
			image:dino.image,
			fact: dino.fact
		}
	}
	return Object.assign({},dino,{
		getInfo:getDino,
		setFact
	})
}

//Bird factory function
function Bird(data) {
	const bird = Dino(data)
	bird.setFact('All birds are living dinosaurs.')
	return bird  
}

//random function
function getRandom() {
	return Math.floor(Math.random()*6)
}

//Facts generator
function factsGenerator(human) {
	return function getFacts(dino){
		const fact = dino.fact
		const whereFact = `${dino.species} lived in ${dino.where}`
		const whenFact = `${dino.species} lived at ${dino.when}`

		// Create Dino Compare Method 1.
    // NOTE: Weight is in lbs.
		function compareWeight() {
			const times = Math.floor(dino.weight / human.weight * 10)/10
			if (times > 1) {
				return `${dino.species} was ${times} times heavier than human`
			}
			const timesHuman = Math.floor(human.weight / dino.weight * 10)/10
			return `Human is ${timesHuman} times heavier than ${dino.species} `
		}

		// Create Dino Compare Method 2.
    // NOTE: Height in inches.
		function compareHeight(){
			const times = Math.floor(dino.height / human.height * 10)/10
			if (times > 1) {
				return `${dino.species} was ${times} times bigger than ${human.name}`
			}
			const timesHuman = Math.floor(human.height / dino.height * 10)/10
			return `${human.name} is ${timesHuman} times bigger than ${dino.species} `
		}

		// Create Dino Compare Method 3.
		function compareDiet() {
			if(dino.diet === 'carnivor') return `${dino.species} could eat humans`
			if(dino.diet === 'herbavor') return `${dino.species} only eat plants`
		}

		switch (getRandom()) {
			case 1: return whereFact
			case 2: return whenFact
			case 3: return compareWeight()
			case 4: return compareHeight()
			case 5: return compareDiet()
			default: return fact
		}
	}
}

//Animals Factory
function Creator(data) {
	const human = Human(data)
	const generator = factsGenerator(human)
	
	function createDino(dino){
		const dinosaur = Dino(dino)
		const fact = generator(dinosaur)
		dinosaur.setFact(fact)
		return dinosaur.getInfo()
	}

	function createBird(bird) {
		return Bird(bird).getInfo()
	}

	return{
		human:human.getInfo(),
		createDino,
		createBird
	}
}

//Tile creator
function createTile(data) {
	const dataTile = document.createElement('div')
	dataTile.classList.add('grid-item')
	const text = (data.name)?data.name:data.species

	const title = document.createElement('h3')
	const titleText = document.createTextNode(text)
	title.appendChild(titleText)
	dataTile.appendChild(title)

	const img = document.createElement('img')
	img.setAttribute('alt',text)
	img.setAttribute('src',`images/${data.image}`)
	dataTile.appendChild(img)

	if(data.fact){
		const fact = document.createElement('p')
		const factText = document.createTextNode(data.fact)	
		fact.appendChild(factText)
		dataTile.appendChild(fact)
	}

	return dataTile
}

//Array generator
function createArr(dinos,man) {
	const god = (Creator)(man)
	const bird =  dinos.pop()
	const dinosArr = dinos.map(dino => god.createDino(dino))
	const birdCard = god.createBird(bird)
	const humanCard = god.human
	dinosArr.splice(4,0,humanCard)
	dinosArr.splice(8,0,birdCard)
	return dinosArr
}

// Use IIFE to get human data from form
const getData = function() {	
	const form = document.querySelector('form')	
	const data = Object.fromEntries(new FormData(form))
	//Validate entries
	if(!data.name || !data.height || !data.weight) return false
	// Remove form from screen
	form.classList.toggle('hide')
	return data
}

const submit = document.getElementById('btn')
submit.addEventListener('click',onSubmit)

// On button click, prepare and display infographic
function onSubmit(ev) {
	ev.preventDefault()	
	const man = (getData)()
	if(!man) return
	const dinoCard = createArr(dinos,man)
	// Generate Tiles for each Dino in Array
	const tiles = dinoCard.map(data => createTile(data))
	
	// Add tiles to DOM
	const grid = document.getElementById('grid')	
	tiles.forEach(tile => grid.appendChild(tile))
}
