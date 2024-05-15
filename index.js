const setupElem = document.getElementById("setup");
const punchlineElem = document.getElementById("punchline");

let jokeIndex = 0;
let jokes = [];

const initJokes = async () => {
    setupElem.innerText = "LOADING";
    punchlineElem.innerText = "LOADING";
    try {
        jokeIndex = 0;
        jokes = await get10Jokes();
        showJoke();

    } catch (error) {
        alert(error.message);
    }
}

const get10Jokes = async () => {
    try {
        const res = await fetch("https://official-joke-api.appspot.com/random_ten");
        const jokes = await res.json();
        if (!res.ok) {
            throw new Error(jokes);
        }
        return jokes;
    } catch (error) {
        throw new Error(error.message);
    }
}

const showJoke = () => {
    const { setup, punchline } = jokes[jokeIndex];
    setupElem.innerText = setup;
    punchlineElem.innerText = punchline;
}

window.addEventListener("load", async () => {
    await initJokes();
});

document.getElementById("reset").addEventListener("click", async () => {
    await initJokes();
})

document.getElementById("prevJoke").addEventListener("click", () => {
    jokeIndex--;
    jokeIndex = (jokeIndex + 10) % 10;
    showJoke();
});

document.getElementById("nextJoke").addEventListener("click", () => {
    jokeIndex++;
    jokeIndex = (jokeIndex + 10) % 10;
    showJoke();
});