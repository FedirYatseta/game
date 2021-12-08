const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')

const timeList = document.querySelector('#time-list')

const timeEl = document.querySelector('#time')

const board = document.querySelector('#board')

const colors = ['#FCFDF8','#A3A184' ,'#4A2D74','#B6A800','#694F90',
'#FFF25E','#661141','#CD88AF']
let time = 0
let score = 0

startBtn.addEventListener('click', e => {
    e.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', e =>{
if(e.target.classList.contains('time-btn')){
     screens[1].classList.add('up')
  time =  parseInt(e.target.getAttribute('data-time'))
  screens[1].classList.add('up')
  startGame()
}
})


board.addEventListener('click', e=> {
    if(e.target.classList.contains('circle')){
        score++
        e.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {

    if(time === 0){
        finishGame()
    }else{
        let current = --time
        if(current < 10){
            current=`0${current}`
        }
        setTime(current)
    }
   
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame(){
    timeEl.parentNode.classList.add('hide')
    board.innerHTML=`<h1> Результат <span class='primary'> ${score} </span></h1>`
}

function createRandomCircle(){
    const circle = document.createElement('div')
    circle.classList.add('square')
    circle.addEventListener('mouseover', () => setColor(circle))
    const size = getRandomNumber(10,60)
    const {width,height} = board.getBoundingClientRect()
    const x = getRandomNumber(0,width - size)
    const y = getRandomNumber(0,height - size)
    circle.classList.add('circle')
    circle.style.width =`${size}px`
    circle.style.height =`${size}px`
    circle.style.top=`${y}px`
    circle.style.left=`${x}px`
    circle.style.background = setColor(circle)
    board.append(circle)
}

function getRandomNumber(min, max){
    return Math.round(Math.random()* (max-min) + min)
}

function setColor(element){
    const color = getRandomColor()
    element.style.backgroundColor = color
}

function getRandomColor(){
    const index =   Math.floor( Math.random() * colors.length)
    return colors[index]
  }