const newBtn = document.querySelector('#js-new-quote').addEventListener('click', getQuote);
const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";
async function getQuote() {
    console.log("This worked!");
    try{
        const response = await fetch(endpoint);
        if(!response.ok) {
            throw Error(response.status);
        }
        const json = await response.json();
        console.log(json);
        } catch (error) {
        console.log(error);
        alert("error occurred");
    }
    getQuote();
}