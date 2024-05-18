const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () =>{
    let word = document.getElementById("input").value;
    fetch(`${url}${word}`)
        .then((response)=> response.json())
        .then((data)=>{
            console.log(data);
            result.innerHTML = `
                    <div class="word">
                        <p>${word}</p>
                        <button onclick="playSound()">
                            <span class="material-symbols-outlined" style="font-size: 35px;">volume_up</span>
                        </button>
                    </div>
                    <div class="details">
                        <p>${data[0].meanings[0].partOfSpeech}</p>
                        <p>${data[0].phonetic || ""}</p>
                    </div>
                    <div class="meaning">
                        ${data[0].meanings[0].definitions[0].definition}
                    </div>
                    <div class="example">
                        ${data[0].meanings[0].definitions[0].example || ""}
                    </div>`;
            sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});

function playSound(){
    sound.play();
}
