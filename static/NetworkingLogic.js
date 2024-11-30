export default class NetworkingLogic{
    #socket;
    constructor() {
        this.#socket = io();

        this.#socket.on("Welcome", (id)=>{
            alert(`Welcome user ${id} to the game! `);
        })

        this.#socket.on("New Player Joined", (id)=>{

            const newPlayerEvent = new CustomEvent("PlayerAdded", {detail: id});
            document.dispatchEvent(newPlayerEvent);
        })
    }
}