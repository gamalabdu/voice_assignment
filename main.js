
window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = false;



var canvas = document.getElementById("canvas");
var speakBtn = document.getElementById('speak-btn')
var ctx = canvas.getContext("2d");
ctx.font = "40px Poppins, sans-serif";
ctx.fillStyle = "white";
ctx.textAlign = "center";
let apple = ctx.fillText("Apple", canvas.width/4, canvas.height/4);
let banana = ctx.fillText("Banana", canvas.width/4, canvas.height/4 + 300);
ctx.fillText("LapTop", canvas.width/4 + 400, canvas.height/4);
ctx.fillText("Bug", canvas.width/4 + 400, canvas.height/4 + 300);
ctx.fillText("Book", canvas.width/2, canvas.height/2);
ctx.font = "15px Poppins, sans-serif";
ctx.fillStyle = "red"
ctx.fillText("Say 'help' to learn more", 150, 550);
ctx.fillText("Say 'about' to hear more", 650, 550);
ctx.fillText("Click 'Speak' to talk!", 400, 540);
ctx.fillText("Click 'Stop' then 'Speak' to say something else!", 400, 580);



let images = { 
    'apple': 'https://media.istockphoto.com/photos/red-apple-with-leaf-isolated-on-white-background-picture-id185262648?b=1&k=20&m=185262648&s=170667a&w=0&h=2ouM2rkF5oBplBmZdqs3hSOdBzA4mcGNCoF2P0KUMTM=',
    'banana': 'https://th-thumbnailer.cdn-si-edu.com/4Nq8HbTKgX6djk07DqHqRsRuFq0=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/d5/24/d5243019-e0fc-4b3c-8cdb-48e22f38bff2/istock-183380744.jpg',
    'book': 'https://www.collinsdictionary.com/images/full/book_181404689_1000.jpg',
    'laptop': 'https://www.notebookcheck.net/uploads/tx_nbc2/MicrosoftSurfaceLaptop3-15__1_.JPG',
    'bug': 'https://inspectallservices.com/application/files/thumbnails/small/7516/0573/1349/lady-bug-487833155.jpg',
    'error': 'https://i.ytimg.com/vi/ANRZ_ZRHJEw/hqdefault.jpg'
}


let button = speakBtn.addEventListener('click', (e) => {
    

    let txt = e.target.innerText;

    // e.target.innerText = txt == 'Speak' ? 'Stop' : 'Speak';

    if(txt === 'Speak') {
        recognition.start()
        e.target.textContent = "Stop"
    } else {
        e.target.textContent = 'Speak'
        recognition.stop()
    }

})

let transcript

recognition.addEventListener ('result',(e) => {

    // const text = Array.from(e.results)  // one way
    // .map(result => result[0])
    // .map(result => result.transcript)


    const current = e.resultIndex;
    transcript = e.results[current][0].transcript.toLowerCase()

    findWord(transcript)
    
    // if (transcript == "help" && !executed) {
    //     executed = true
    //     readOut("help")
    //     recognition.abort()
    // }
    //  else if ( transcript == "about" && !executed) {
    //     executed = true
    //     readOut("about")
    //     recognition.abort()
    // }   

})


function findWord (transcript) {

    let executed = false

    for(word in images) {
        
        if(transcript === word) {

            console.log("Did you say " + word + "?")
            showImg(word)
            readOut(transcript)
            executed = true
            // recognition.abort()   

        } else if (transcript == "help" && !executed) {
            executed = true
            readOut("help")
            // recognition.abort()
        }
         else if (transcript == "about" && !executed) {
            executed = true
            readOut("about")
            // recognition.abort()

         } else if (transcript != "help" && transcript != "about" && executed === false) {
            showImg('error')
            console.log("could not find " + transcript)
    
        }
    }

}



function showImg(myWord) {
    
    let value
    let img = new Image();
  
      for(word in images) {
                  // console.log(word)
                  // console.log(myWord)
              if(myWord === word) {
                  value = images[word]
                  img.src = value 
  
                  // setInterval(img.onload = () => {      ctx.drawImage(img, 150, 50, 500,500)  
                  // },4000)
  
                  img.onload = () => {  
  
                          ctx.drawImage(img, 150, 50, 500,500) 
  
                              setTimeout(() => {
  
                                  ctx.clearRect(0,0,canvas.width,canvas.height)
  
                                  document.location.reload()
                          
                              }, 2000);  
  
                   }
  
              } else if (myWord === 'error') {
  
                  value = images[word]
                  img.src = value 
  
                  // setInterval(img.onload = () => {      ctx.drawImage(img, 150, 50, 500,500)  
                  // },4000)
  
                  img.onload = () => {  
  
                          ctx.drawImage(img, 150, 50, 500,500) 
  
                              setTimeout(() => {
  
                                  ctx.clearRect(0,0,canvas.width,canvas.height)
  
                                  document.location.reload()
                          
                              }, 2000);  
  
                   }
  
              }
  
  
      }
  
  }

  


function readOut (message) {

    const help = "Click speak and say any of the words you see on the screen to see an image of the word!"

    const about = "This is a program built by Gamal Abdu in the year 2022"

    const images = {
        'apple': "apple",
        'banana': "banana",
        'book': "book",
        'bug': "bug",
        'laptop': "laptop",
        'error': "could not find word"
    }

    const speech = new SpeechSynthesisUtterance()
    
    speech.volume = 1
    speech.rate = 1
    speech.pitch = 1

    if(message == "help") {
        speech.text = help
    } else if (message == "about") {
        speech.text = about
     }
    else if(message != 'help' && message != 'about') {
        speech.text = images[message]
    } else {
        return
    }

    window.speechSynthesis.speak(speech)
}





