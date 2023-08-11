'use strict';
const switchButton = document.querySelector("#circle");
const font = document.querySelector("#font-option");
const prefont = document.querySelector("#font-choice");
const modeIcon = document.querySelector("#mode");
const modeButton = document.querySelector("#mode-button");
const keyword = document.querySelector("#wrd");
const playPause = document.querySelector("#audio");
const word = document.querySelector("#search-input");
const body = document.querySelector("body");
const noundef = document.querySelector("#firstdef");
const nf = document.querySelector("#nf");
const syns = document.querySelector("#syword");
const ants = document.querySelector("#atword");
const dictionary = {
    defaultMode:"light",
    defaultFont:"serif",
    audioMode:"paused",
    audioLnk : "empty",
    loading(condition){
        const loadbox = document.querySelector("#empty-box");
        const loader = document.querySelector("#loader");
        const empty = document.querySelector("#empty-img");
        
        if (condition=="off") {
            loadbox.style.display = "none";
            loader.style.display = "none";
        } else if (condition=="on") {
            loadbox.style.display = "grid";
            loader.style.display = "block";
            empty.style.display = "none";
        }
    },
    notFound(condition){
        const loadbox = document.querySelector("#empty-box");
        const loader = document.querySelector("#loader");
        const empty = document.querySelector("#empty-img");
        
        if (condition=="off") {
            nf.style.display = "none";
        } else if (condition=="on") {
            loadbox.style.display = "grid";
            loader.style.display = "none";
            empty.style.display = "none";
            nf.style.display = "block";
        }
    },
    switchMode() {
       if (this.defaultMode === "light") {
        this.defaultMode = "dark";
        switchButton.style.marginRight = "0px";
        switchButton.style.marginLeft = "14px";
        body.style.backgroundColor = "black";
        body.style.color = "white";
        modeIcon.src = "IMG_8333.PNG";
        modeButton.style.backgroundColor = "gold";

       } else if (this.defaultMode === "dark") {
        this.defaultMode = 'light';
        switchButton.style.marginRight = "14px";
        switchButton.style.marginLeft = "0px";
        body.style.backgroundColor = "white";
        body.style.color = "black";
        modeIcon.src = "IMG_8335.PNG";
        modeButton.style.backgroundColor = "var(--grey)";
       };
    },
    show(box) {
        const font = document.querySelector(box).style.display = "block";
    },
    hide(box) {
        const font = document.querySelector(box).style.display = "none";       
    },
    changeFont() {
        if (this.defaultFont === "serif") {
            this.defaultFont = "helvetica";
            body.style.fontFamily = "helvetica";
            prefont.innerHTML = "Helvetica";
            font.innerHTML = "Serif";
            prefont.style.marginLeft = "335px";
            keyword.style.fontSize = "39px";
        } else if (this.defaultFont==="helvetica") {
            this.defaultFont = "serif";
            body.style.fontFamily = "serif";
            prefont.innerHTML = "Serif";
            font.innerHTML = "Helvetica";
            prefont.style.marginLeft = "380px";
            keyword.style.fontSize = "45px";
        }
    },
    playAudio() {
        if (this.audioMode === "paused") {
            this.audioMode= "playing";
            playPause.innerHTML = "■"
            this.audioLnk.play();
        } else if (this.audioMode=== "playing") {
            this.audioMode = "paused"
            playPause.innerHTML = "▶"
            this.audioLnk.pause("true");
        }
    },
    check() {
        const bodybox = document.querySelector("#body-box");
        bodybox.style.display = "none";
        this.notFound("off");
        this.loading("on");
        let keyvalue = word.value;
        this.getInfo(String(keyvalue));
    },
    getInfo(word) {
        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+word).then((response) => response.json()).then((data) => this.displayinfo(data));
    },
    displayinfo(obj) {
    this.loading("off");
    const bodybox = document.querySelector("#body-box");
    let obset = new Set(Object.values(obj));
    if (obset.has("No Definitions Found") == true ) {
        this.notFound("on");
        nf.innerHTML = obj.message + ";)"
    } else {
            if (Object.entries(obj).length ===1) {
                bodybox.style.display = "grid";
                keyword.innerHTML= word.value;
                const {phonetic, phonetics, meanings} = obj[0];
                document.querySelector("#sound").innerHTML = phonetic;
                const {audio} = phonetics[0];
                this.audioLnk = new Audio(audio);
                let defs = meanings[0].definitions;
                let syn = meanings[0].synonyms;
                let ant = meanings[0].antonyms;
                let  str = "";
                let  str1 = "";
                for (let swd of syn) {
                    str = str + swd + ", "; 
                };
                for (let awd of ant) {
                    str1 = str1 + awd + ", "; 
                };
                syns.innerHTML= str;
                ants.innerHTML= str1;

                for (let i=0;i<=4;i++) {
                    let line = document.getElementsByClassName("noun")[i];
                    line.innerHTML = String(i+1)+". " + defs[i].definition;
                    line.style.display = "block";
                };
                for (let i=0;i<=3;i++) {
                    let line = document.getElementsByClassName("verb")[i];
                    line.innerHTML = "";
                    line.style.display = "none";
                };
            } else if (Object.entries(obj).length > 1) {
                bodybox.style.display = "grid";
                for (let j=0;j<=1;j++) {   
                    keyword.innerHTML= word.value;
                    const {phonetic, phonetics, meanings} = obj[j];
                    document.querySelector("#sound").innerHTML = phonetic;
                    const {audio} = phonetics[0];
                    this.audioLnk = new Audio(audio);
                    let defs = meanings[0].definitions;
                    let syn = meanings[0].synonyms;
                    let ant = meanings[0].antonyms;
                    let  str = "";
                    let  str1 = "";
                    for (let swd of syn) {
                        str = str + swd + ", "; 
                    };
                    if (ant.length!== 0) {
                        for (let awd of ant) {
                            str1 = str1 + awd + ", "; 
                        };
                        ants.innerHTML= str1;
                    };
                    syns.innerHTML= str;
            
                    if (j==0) {
                        for (let i=0;i<=4;i++) {
                            let line = document.getElementsByClassName("noun")[i];
                            line.innerHTML = String(i+1)+". " + defs[i].definition;
                            line.style.display = "block";
                        };
                        
                    } else {
                        for (let i=0;i<=4;i++) {
                            let line = document.getElementsByClassName("verb")[i];
                            line.innerHTML = String(i+1)+". " + defs[i].definition;
                            line.style.display = "block";
                        };
                        
                    };
                
                };
            };
    };
}
}

