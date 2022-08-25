const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 50
const blockHeight = 15
const ballDiameter = 15
const boardWidth = 600
const boardHeight = 300
let xDirection = -2
let yDirection = 2

const userStart = [300, 10]
let currentPosition = userStart

const ballStart = [270, 40]
let ballCurrentPosition = ballStart

let timerId
let score = 0


class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    this.topLeft = [xAxis, yAxis + blockHeight]
  }
}


const blocks = [
  new Block(5, 270),
  new Block(65, 270),
  new Block(125, 270),
  new Block(185, 270),
  new Block(245, 270),
  new Block(305, 270),
  new Block(365, 270),
  new Block(425, 270),
  new Block(485, 270),
  new Block(545, 270),
  new Block(5, 245),
  new Block(65, 245),
  new Block(125, 245),
  new Block(185, 245),
  new Block(245, 245),
  new Block(305, 245),
  new Block(365, 245),
  new Block(425, 245),
  new Block(485, 245),
  new Block(545, 245),
  new Block(5, 220),
  new Block(65, 220),
  new Block(125, 220),
  new Block(185, 220),
  new Block(245, 220),
  new Block(305, 220),
  new Block(365, 220),
  new Block(425, 220),
  new Block(485, 220),
  new Block(545, 220),
  new Block(5, 195),
  new Block(65, 195),
  new Block(125, 195),
  new Block(185, 195),
  new Block(245, 195),
  new Block(305, 195),
  new Block(365, 195),
  new Block(425, 195),
  new Block(485, 195),
  new Block(545, 195),
]


function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0] + 'px'  
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'  
    grid.appendChild(block)
    console.log(blocks[i].bottomLeft)
  }
}
addBlocks()


const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
drawUser()


const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBall()


function moveUser(e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10
        console.log(currentPosition[0] > 0)
        drawUser()   
      }
      break
    case 'ArrowRight':
      if (currentPosition[0] < (boardWidth - blockWidth)) {
        currentPosition[0] += 10
        console.log(currentPosition[0])
        drawUser()   
      }
      break
  }
}
document.addEventListener('keydown', moveUser)


function drawUser() {
  user.style.left = currentPosition[0] + 'px'
  user.style.bottom = currentPosition[1] + 'px'
}


function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px'
  ball.style.bottom = ballCurrentPosition[1] + 'px'
}


function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}
timerId = setInterval(moveBall, 30)


function checkForCollisions() {
  //check for block collision
  for (let i = 0; i < blocks.length; i++){
    if
    (
      (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
      ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1]) 
    )
      {
      const allBlocks = Array.from(document.querySelectorAll('.block'))
      allBlocks[i].classList.remove('block')
      blocks.splice(i,1)
      changeDirection()   
      score++
      scoreDisplay.innerHTML = score
      if (blocks.length == 0) {
        scoreDisplay.innerHTML = 'Победа!😎'
        clearInterval(timerId)
        document.removeEventListener('keydown', moveUser)
      }
    }
  }
  
  if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[0] <= 0 || ballCurrentPosition[1] >= (boardHeight - ballDiameter))
  {
    changeDirection()
  }

  
  if
  (
    (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
    (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight ) 
  )
  {
    changeDirection()
  }

 
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId)
    scoreDisplay.innerHTML = 'Попробуй еще раз 😟'
    document.removeEventListener('keydown', moveUser)
  }
}


function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2
    return
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2
    return
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2
    return
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2
    return
  }
}
