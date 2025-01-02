const mid = document.querySelector('.mid');
let arr = new Array(9).fill('e');
let winner = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];
let count = 0;
let turn ='O';
const res = document.getElementById('result');
const reset = document.querySelector('button')
const p1 = document.querySelector('.player1')
const p2 = document.querySelector('.player2')
let w = window.innerWidth;

if(w > 600)
p2.style.width = `350px`

else{
    p1.style.width = '120px'
}

const checkWinner =()=>{
    for(let [idx1,idx2,idx3] of winner) {
        if(arr[idx1] != 'e' && arr[idx1] === arr[idx2] && arr[idx2] === arr[idx3]) {
            return 1;
        }
    }

    return 0;
}

const helper = (event)=>{
    // console.log(event.target);
    let element = event.target;
    
    if(arr[element.id] === 'e') {
        element.innerHTML = `${turn}`
        count++;

        if(turn === 'O') {
            arr[element.id] = 'O';
            turn = 'X'

            if(count >= 5) {
                if(checkWinner()) {
                    reset.textContent = `Restart Game`
                    res.innerHTML = `Player O is Winner`
                    mid.removeEventListener('click',helper);
                    return;
                    
                }
            }

            if(w > 600) {
                p2.style.width = `450px`
                p1.style.width = `350px`
            }

            else{
                p1.style.width = '100px';
                p2.style.width = '120px'
            }
            
        }

        else{
            arr[element.id] = 'X';
            turn = 'O'

            if(count >= 5) {
                if(checkWinner()) { 
                    reset.textContent = `Restart Game`
                    res.innerHTML = `Player X is Winner`
                    mid.removeEventListener('click',helper);
                    return;
                }
            }

            if(w > 600) {
                p2.style.width = `350px`
                p1.style.width = `450px`
            }

            else{
                p1.style.width = '120px';
                p2.style.width = '100px'
            }
        }

        if(count == 9) {
            res.innerHTML = `The Match is Draw`
            
            mid.removeEventListener('click',helper);
            reset.textContent = `Restart Game`
            return;
        }
    }
}

mid.addEventListener('click',helper);

reset.addEventListener('click',()=>{
    const cell = document.getElementsByClassName('cell')

    Array.from(cell).forEach((val)=>{
        val.innerHTML=  ""
    })
    reset.innerHTML = `Reset Game`
    arr = new Array(9).fill('e');
    turn = "O"
    count = 0
    res.innerHTML = ""
    mid.addEventListener('click',helper);
})