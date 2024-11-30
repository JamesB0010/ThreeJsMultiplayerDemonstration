export default class NetworkingLogic{
    #socket;
    constructor() {
        this.#socket = io();

        this.#socket.on("Welcome", (connectedClientsCount)=>{
            alert(`Welcome user to the game! `);
            
            if(connectedClientsCount > 1){
                this.#socket.emit("SpawnOtherPlayer");
            }
        })

        this.#socket.on("New Player Joined", (id)=>{

            const newPlayerEvent = new CustomEvent("PlayerAdded", {detail: id});
            document.dispatchEvent(newPlayerEvent);
        })
    }
}