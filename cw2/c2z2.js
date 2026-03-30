const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
// TODO

function loadMonitor(arr){
const [serverNum, low, high] = arr[0].split(' ').map(Number);  

    let serverList = new Map();
     for(let i=1; i<arr.length;i++){
       let serverData = arr[i].split(' ')
       serverList.set(serverData[0],{name: serverData[0], load: Number(serverData[1])})
    }
  
    const filteredServerList = new Map(
    [...serverList].filter(([key, value]) => value.load > high || value.load < low )
    );

  
    filteredServerList.size > 0 ?filteredServerList.forEach(value => console.log(value.name)) : console.log("brak")
    console.log("---")
    console.log(serverNum)
  
}

loadMonitor(lines);