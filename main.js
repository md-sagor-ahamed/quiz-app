

const UI = {
    count:0,
    timerToClean: "",
    timeToLeft: "",
    loadSelector(){
        const header = document.querySelector(".header");
        const startTheGame = document.querySelector(".startBtn");
        const quizBody = document.querySelector(".quizBody");
        const exittTheGame = document.querySelector(".exitBtn");
        const continueTheGame = document.querySelector(".continueBtn");
        const quizContainer = document.querySelector(".quizContainer");
        const runningTIme = document.querySelector(".runningTIme");
        const quizItemsTitle = document.querySelector(".quizItemsTitle");
        const quizList = document.querySelector(".list");
        const itemNumber = document.querySelector(".itemNumber");
        const nextBtn = document.querySelector(".nextBtn");
        const timeLeft = document.querySelector(".timeLeft");
        const quizWrapper = document.querySelector(".quizesWrapper");
        let counter;
        return {
            header,
            startTheGame,
            quizBody,
            exittTheGame,
            continueTheGame,
            quizContainer,
            runningTIme,
            quizItemsTitle,
            quizList,
            itemNumber,
            nextBtn,
            counter,
            timeLeft,
            quizWrapper
        }
    },
    quizItemList(){
        const items = [
            {
                id: "1",
                question: "What does HTML stands for?",
                list: [
                   "Hypertrophic Management Language",
                   "Hyperberic Tertiary Logrithm",
                    "Hypertext Markup Language",
                    "Hyperresonant Marginal Logrithm"
                ],
                answer: "Hypertext Markup Language"
            },
            {
                id: "2",
                question: "What does CSS stands for?",
                list: [
                    "Casing Style Sheet",
                    "Collating Style Sheet",
                    "Cascading Style Sheets",
                    "Cascade Style Sheets",
                ],
                answer: "Cascading Style Sheets"
            },
            {
                id: "3",
                question: "JavaScript File Has An Extension of?",
                list: [
                    ".Java",
                    ".Js",
                    ".javascript",
                    ".xml",
                ],
                answer: ".Js"
            },
            {
                id: "4",
                question: "Laravel is based on which language?",
                list: [
                    "Python",
                    "PHP",
                    "French",
                    "Java",
                ],
                answer: "PHP"
            },
            {
                id: "5",
                question: "What does PHP stand for?",
                list: [
                    "Hypertext preprocessor",
                    "Hypertext programming",
                    "Hypertext preprogramming",
                    "Hometext preprocessor",
                ],
                answer: "Hypertext preprocessor"
            },
        ]
        return items;
    },
    checkingTheItem(e){
        const {quizList, nextBtn} = this.loadSelector();
        const value = document.querySelectorAll(".quizItems")
        const item = e.target.textContent;
        const answer = e.target.parentElement.id;
        if(item === answer){
            e.target.children[1].innerHTML = `<i class="far right fa-check-circle"></i>`
            this.count++;
            quizList.classList.add("disabled");
            nextBtn.style.display = "block";
            clearInterval(this.timerToClean)
            clearInterval(this.timeToLeft)
        }else if(!answer){
            
        }else{
            e.target.children[1].innerHTML = `<i class="far wrong fa-times-circle"></i>`
            for(let i = 0; i < value.length; i++){
                if(value[i].textContent === answer){
                    value[i].parentElement.children[1].innerHTML = `<i class="far right fa-check-circle"></i>`
                }
            }
            quizList.classList.add("disabled");
            nextBtn.style.display = "block";
            clearInterval(this.timerToClean);
            clearInterval(this.timeToLeft);
        }
    },
    removeDisabled(){
        const {quizList} = this.loadSelector()
        quizList.classList.remove("disabled")
    },
    playGameAgain(e){
        if(e.target.classList.contains("playAgain")){
            location.reload()
        }
    },
    displayTheItems(val){
        const {quizItemsTitle, quizList, itemNumber} = this.loadSelector();
        const item = this.quizItemList()
        const list = item[val]
        if(list === undefined){
        }else{
            quizList.innerHTML = "";
            quizItemsTitle.textContent = `${list.id}. ${list.question}`;
            quizList.id = list.answer;
            list.list.forEach(listItems=>{
                const div = document.createElement("div");
                let li = document.createElement("li");
                li.className = "quizItems"
                let span = document.createElement("span");
                span.className = "icon"
                // span.textContent = "sagor ahamed"
                li.textContent = listItems;
                div.className = "quizItemList";
                div.appendChild(li);
                div.appendChild(span);
                quizList.appendChild(div);
            })
            itemNumber.textContent = `${list.id} out of ${item.length} Questions`
        }
    },
    continueGame(){
        const {quizBody, quizContainer} = this.loadSelector()
            quizBody.style.display = "none";
            quizContainer.style.display = "block";
            this.countDown(15)
    },
    exitGame(){
        const {header, quizBody} = this.loadSelector()
        header.style.display = "block";
        quizBody.style.display = "none";
    },
    startGame(){
        const {header, quizBody} = this.loadSelector();
        header.style.display = "none";
        quizBody.style.display = "block";
    },
    displaytimer(num){
        const {timeLeft} = this.loadSelector();
        this.timeToLeft = setInterval(()=>{
            num++
            if(num === 3980){
                clearInterval(this.timeToLeft)
            }else{
                timeLeft.style.width = num/5.999 + "px";
            }
        })
    },
    countDown(num){
        let {runningTIme} = this.loadSelector();
        this.timerToClean = setInterval(() => {
            num--
            runningTIme.textContent = num
           if(num === 0){
             clearInterval(this.timerToClean)
           }
        }, 1000);
        this.displaytimer(num)
    },
    init(){
        const {startTheGame, exittTheGame, continueTheGame, nextBtn, quizList, quizWrapper} = this.loadSelector();
        startTheGame.addEventListener("click", this.startGame.bind(this));
        exittTheGame.addEventListener("click", this.exitGame.bind(this));
        continueTheGame.addEventListener("click", this.continueGame.bind(this));
        quizWrapper.addEventListener("click", this.playGameAgain.bind(this));
        this.displayTheItems()
        let count = 0;
        nextBtn.addEventListener("click", ()=>{
            count++;
            this.countDown(15)
            this.displayTheItems(count)
            this.removeDisabled();
            nextBtn.style.display = "none";
            if(count === 5){
                quizWrapper.innerHTML = `<h1 class="result">You got ${this.count} out of ${this.quizItemList().length}</h1>
                <button class="playAgain">Play Again</button>
                `
            }
        });
        this.displayTheItems(count)
        quizList.addEventListener("click", this.checkingTheItem.bind(this));
    }
};
UI.init();


