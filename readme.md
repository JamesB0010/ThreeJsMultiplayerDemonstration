# Three.js Multiplayer Demonstration

Hi! This repository is a learning resource containing a PowerPoint presentation and accompanying code on how to use **Socket.IO** and **Three.js** to create a simple multiplayer game.

For the best experience, download the presentation directly from [this link](https://github.com/JamesB0010/ThreeJsMultiplayerDemonstration/blob/7df7abd0aa034c3ad63f21bb91a01ce6af797345/Presentation/Multiplayer%20web%20games.pptx).

Otherwise, below is a converted version of the presentation, designed to go along with the code.

---

- **Development time:**  
  - Code: ~7 hours  
  - Presentation: ~8 hours  

Thank you and Enjoy!

---

![](markdownPresentationImages/Multiplayer%20web%20games_0.jpg)

# Multiplayer web games

# A Guide on how to use socket io in conjunction with three js to create a multiplayer game.

# Goals

- Give an introduction on how to use socket io by working through a demo project.
- Provide insight into creating a multiplayer game in three js and structuring the code.
- Code is shared in this presentation, but the way it is presented means you won't be able to simply copy and paste a working solution.

# Design

We will follow a client-server model when designing our networking.

- This means if client A wants to communicate with client B, they must send a message to the server, which will relay that message to the appropriate client.
- We will use a client-authoritative model: trust the client.

# Library

We will be using socket io to handle networking. Socket io is a library that makes working with WebSockets super easy and convenient.

# What is a socket?

A socket is a communication protocol allowing for a persistent two-way connection between devices, facilitating real-time data transfer.

# 80 / 20 rule

The 80 / 20 rule states that 80% of outcomes come from 20% of causes.

- In the case of socket io, a few functions (20%) are commonly used across projects (80%). 
- If you learn these few functions, you'll have enough knowledge to create a multiplayer game.

---

### Example functions and concepts

![](markdownPresentationImages/Multiplayer%20web%20games_1.png)

#### Assign an event listener for a socket connection

---

#### Emitting messages to the server

![](markdownPresentationImages/Multiplayer%20web%20games_2.png)

---

#### Reacting to messages from the server

![](markdownPresentationImages/Multiplayer%20web%20games_3.png)

---

### Flexibility in message payloads

![](markdownPresentationImages/Multiplayer%20web%20games_4.png)

---

# That’s it!

![](markdownPresentationImages/Multiplayer%20web%20games_5.png)

---

### Example sections with further content...

![](markdownPresentationImages/Multiplayer%20web%20games_6.png)

![](markdownPresentationImages/Multiplayer%20web%20games_7.png)

![](markdownPresentationImages/Multiplayer%20web%20games_8.png)

![](markdownPresentationImages/Multiplayer%20web%20games_9.gif)

---

### Scene Builder

![](markdownPresentationImages/Multiplayer%20web%20games_10.gif)

![](markdownPresentationImages/Multiplayer%20web%20games_11.png)

![](markdownPresentationImages/Multiplayer%20web%20games_12.png)

![](markdownPresentationImages/Multiplayer%20web%20games_13.gif)

---

### Multiplayer Concepts

![](markdownPresentationImages/Multiplayer%20web%20games_40.png)

![](markdownPresentationImages/Multiplayer%20web%20games_41.png)

![](markdownPresentationImages/Multiplayer%20web%20games_42.png)

![](markdownPresentationImages/Multiplayer%20web%20games_43.png)

---

### Handle Player Movements

![](markdownPresentationImages/Multiplayer%20web%20games_46.png)

![](markdownPresentationImages/Multiplayer%20web%20games_47.png)

![](markdownPresentationImages/Multiplayer%20web%20games_48.png)

---

### Add more sections as needed...
