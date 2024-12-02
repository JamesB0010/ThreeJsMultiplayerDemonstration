# Three.js Multiplayer Demonstration

Hi! This repository is a learning resource containing a PowerPoint presentation, live deployment and accompanying code on how to use **Socket.IO** and **Three.js** to create a simple multiplayer game.

For the best experience, download the presentation directly from [this link](https://github.com/JamesB0010/ThreeJsMultiplayerDemonstration/blob/7df7abd0aa034c3ad63f21bb91a01ce6af797345/Presentation/Multiplayer%20web%20games.pptx).

Otherwise, below is a converted version of the presentation, designed to go along with the code.


## Play the game!
You can actually play the game and test for yourself using [this link](https://threejsmultiplayerdemonstration.onrender.com).

Although it is hosted on the free teir of render so when you open the link it may be broken, just give it a minute for the server to start up and reload the page and it should work 😄

---

- **Development time:**  
  - Code: ~7 hours  
  - Presentation: ~8 hours  

Enjoy!

---





![Multiplayer web games_0](https://github.com/user-attachments/assets/d47b8ff1-1be4-4ff6-b46e-f69081196b96)

# Multiplayer web games

# A Guide on how to use socket io in conjunction with three js to create a multiplayer game.

# Goals

Give an introduction on how to use socket io by working through a demo project

Give insight into how I would go about creating a multiplayer game in three js and structuring the code

Code is shared in this presentation\, however the way it is presented means you wont be able to simply copy and paste a working solution

# Design

We will follow a client server model when designing our networking

This means if client a wants to communicate with client be they must send a message to the server who will relay that message to the appropriate client

We will use a client authoritative model\, trust the client\.

# Library

We will be using socket io to do our networking\. Socket io is a library which makes working with websockets super easy and convenient\.

# What is a socket

A socket is a communication protocol allowing for a persistent two\-way connection between devices facilitating real time data transfer\.

# 80 / 20 rule

The 80 / 20 rule states that 80% of outcomes come from 20% of causes\.

In the case of socket io there is just a few functions \(20%\) that are used very commonly across the project \(80%\)\. So if you can know these few functions you will have enough knowledge to create a multiplayer game\.

So what are these functions?

![Multiplayer web games_1](https://github.com/user-attachments/assets/5f7fe890-3f18-4dd3-a81c-b93d0d72671c)



Assume io here is an object accessible from this scope

---

What this does is assigns an event listener to react to a socket connecting to the server.

This callback will be ran on the server for each socket when they connect to the server. Each socket represents a two way communication between server and client

![Multiplayer web games_2](https://github.com/user-attachments/assets/e66c71f2-96bd-4ca9-8ee6-ce4bea571077)


Assume socket here is an object accessible from this scope

Special use of emit\. emit is covered in a sec

![Multiplayer web games_3](https://github.com/user-attachments/assets/b160292e-ab7f-4377-acd7-b3e9f8afc0a3)


Assume socket here is an object accessible from this scope

This is how to react to messages from the server

![Multiplayer web games_4](https://github.com/user-attachments/assets/c1adf76c-cb59-4ed2-9266-74dad01f2097)


Flexibility in what we send when we send messages

# That’s it!

![Multiplayer web games_5](https://github.com/user-attachments/assets/7367ac05-63ec-485c-bbd5-ce7286d2fbcc)


# All Together

# Quick recommendation before we start

I used Jetbrains Rider as my ide for this

And it was leagues above any other ide’s that ive used so far\.

It actually has IntelliSense you can be confident in and also has IntelliSense for all the THREEjs symbols which was very useful\.

Its recently became free via a community licence but is also available to students

So yeah… get rider its great\!

# How it's made part 1 setting up the scene

In this step we will just get the three js hello world up and running and served from express\.

So well make an index html file with a link to a css file\, javascript file and an import map to import all our three js dependencies

Very simple stuff we've seen before

![Multiplayer web games_6](https://github.com/user-attachments/assets/931781bd-b603-402d-8056-e4fb1a68d84b)


Next we’ll get some javascript in to get a cube spinning

You may notice that my main file is very small \(12 lines\)\. This is intentional\, all the complexities of setting up a scene is all handled by the sceneInitializer\.

All of your networking code is going to be in this file so keeping your code clean by separating it out into different files and classes will really be worth the time it takes\.

![Multiplayer web games_7](https://github.com/user-attachments/assets/00bef0a9-4a9e-43e3-b8a1-abafa5fd286b)


![Multiplayer web games_8](https://github.com/user-attachments/assets/0e39f95b-f5df-46d9-9747-3b3f665a7613)

Just for reference here is the SceneInitializer\.

It has a few member variables but essentially just sets three js up for us so its ready to be used leaving our main file clean

# Run with live server

![Multiplayer web games_9](https://github.com/user-attachments/assets/d1557b4b-283e-4178-a710-1a7c9bb84e9e)


So when we run this using a live server from our ide we can see our three js scene rendering

# Next serve these files with express (server)

![Multiplayer web games_10](https://github.com/user-attachments/assets/9a7e4123-a0a5-452f-a1a2-6e7b0b3c1550)


# Now lets make our scene look pretty…

![Multiplayer web games_11](https://github.com/user-attachments/assets/359b152b-65f7-4421-8956-a2e6e6cf3e31)


Well make a scene in blender and export everything into a gltf

This is contained in the static folder with

Your other client resources like

Sky sphere textures and source code

# Getting it into three.js

So in our main js were going to import our SceneBuilder class \(which ill show in a sec\)\, create a new instance of a sceneBuilder and chain together a bunch of methods to build our scene in one line\.

Well also call scene builders update function in our animate function\. This way any objects like our orbit controller for example can be updated

![Multiplayer web games_12](https://github.com/user-attachments/assets/ffd421fc-aa93-42bc-b138-50b9e04db100)


![Multiplayer web games_13](https://github.com/user-attachments/assets/9a1bff15-c55c-4994-8572-d0918aa39d19)

# Scene Builder

![Multiplayer web games_14](https://github.com/user-attachments/assets/1217c6d5-7209-4d9a-8516-14520c7f81b2)

The scene builder is composed of some useful member variables\, a simple constructor\, an update function and…

![Multiplayer web games_15](https://github.com/user-attachments/assets/d4401438-61a2-4269-aa92-133dae616497)

![Multiplayer web games_16](https://github.com/user-attachments/assets/2a60c462-d6f6-4a-8878-296daf1d1dfc)

# And…

![Multiplayer web games_17](https://github.com/user-attachments/assets/5db01f37-1c75-479b-9825-3dbf235569fd)

a bunch of chainable methods which allow us to build our scene by adding a bunch of smaller parts to our scene

![Multiplayer web games_18](https://github.com/user-attachments/assets/e414f914-dd8e-4368-8439-e2a724f44892)

![Multiplayer web games_19](https://github.com/user-attachments/assets/b6fb9e9e-4bdc-48ac-941e-0cb8711502a8)

# Okay the last thing we've got to do is get a player controller in

![Multiplayer web games_20](https://github.com/user-attachments/assets/0b7e0f83-6cd5-4340-ad60-3e3e84c50b6b)

This player controller is just a wrapper around the FirstPersonControls class provided by three js\.

The only additions made by this class to the FirstPersonControlls class from THREE\.js are

the y axis is fixed

You can enable / disable the FirstPersonControls by pressing space

We can make a small change to our scene builder to give it the ability to add a player controller into our scene


![Multiplayer web games_21](https://github.com/user-attachments/assets/43d6fb2a-68be-4e71-a689-615e2a15e5a6)


![Multiplayer web games_22](https://github.com/user-attachments/assets/0e303600-2ba7-4224-8516-768917f8ed24)

Now we can swap out our orbit controls for our first person controls


![Multiplayer web games_23](https://github.com/user-attachments/assets/7d06ca73-8e0d-47cd-898b-28bd893e9922)

![Multiplayer web games_24](https://github.com/user-attachments/assets/58dda858-b6b7-413a-abf6-83ba82e1ab13)


# Yipeeee

Also if anyone could tell me what environment I have recreated here that would make me very happy 😉

We have now constructed a base project which we can make multiplayer\.


![Multiplayer web games_25](https://github.com/user-attachments/assets/2ddaf067-644b-40f8-8ed2-bf9b87b4b58b)

The aim will be to have two clients able to connect to the server and see each other walk around\. A client can leave and join back at any time\.

A limitation of the system we will build is that it will be made for only 2 clients to connect at once you will have to think or experiment yourselves if you want more than 2 clients 😉

Doesn’t handle disconnections then reconnections well same again 😉

# Time to make it multiplayer!!

# Server


![Multiplayer web games_26](https://github.com/user-attachments/assets/088c34e4-bf41-4847-8da9-2e462bafdebd)

<span style="color:#ffffff">First we will use npm to install socket io </span>

# Now lets edit our server code

We will add a layer over the top of our express server to make the server an express and socket io server


![Multiplayer web games_27](https://github.com/user-attachments/assets/eff9f233-d9ed-4862-9f3c-2965a0e69ca2)


![Multiplayer web games_28](https://github.com/user-attachments/assets/e9a79c1e-bdbf-4954-b02d-1157db1bf634)

Instead of app\.listen to start our server we can use server\.listen


![Multiplayer web games_29](https://github.com/user-attachments/assets/e14519b0-f46b-4aa6-bfc3-382208b5ed7d)


![Multiplayer web games_30](https://github.com/user-attachments/assets/44677720-9ea7-46e7-af95-8684a2741503)

If your wondering how this socket\.io\.js file actually gets to your client\. Heres how

The node package socket\.io we installed earlier \(npm\) includes both the server side and client side code\.

When we set up our server with socket io the endpoint /socket\.io/socket\.io\.js was automatically created\.

Anyone who has made a server so far has set up their own endpoints\. Looks something like

app\.get\(“Address”\, \(req\, res\) =>\{\}\); see if you can see it in your code

# Next add socket io to the client


![Multiplayer web games_31](https://github.com/user-attachments/assets/33e6d46c-5d13-480e-aa7f-ccc15ff39647)

# continued

Then when html sees our \<script> tag it makes a http get request to the src which in this case is “socket\.io/socket\.io\.js” and the server returns the client side library code


![Multiplayer web games_32](https://github.com/user-attachments/assets/1e9275c0-ec9e-4d5a-92e9-4b70e9b1f72c)

# Okay now we are ready to start using the library!


![Multiplayer web games_33](https://github.com/user-attachments/assets/efd83512-5734-4d78-9aeb-b5484171225a)

# Initialize in our script

# Add this to our server


![Multiplayer web games_34](https://github.com/user-attachments/assets/5c610643-32f1-472f-ae08-1f5d59807c17)

# Test

![Multiplayerwebgames_35-ezgif com-optimize](https://github.com/user-attachments/assets/7fa51aea-81d0-49de-8500-c810119156f2)

# The server can send messages to the client if it wants


![Multiplayer web games_36](https://github.com/user-attachments/assets/00dc8f32-8ac6-4716-90b6-024871b6324d)

# And we can create event handlers to react to these messages


![Multiplayer web games_37](https://github.com/user-attachments/assets/0d8650a8-699d-43df-85c9-6bf30224ee09)

# Test


![Multiplayer web games_38](https://github.com/user-attachments/assets/a472cb13-4f5f-4f13-b804-79fa471fadc8)

# We can send custom data too if we want


![Multiplayer web games_39](https://github.com/user-attachments/assets/bf65c5c9-6157-46d5-a0c2-14eac6b313a3)



* Pretty much anything\!\! As long as it can be serialized to JSON\!
* This includes all of our primitive types:
  * Strings\, numbers\, Booleans and Null
* We can also send objects and arrays \(as long as the contents are serializable\, don’t worry in my experience they always are\)


# So what custom data can we send?

# Question

<span style="color:#ffffff">What is some </span>  <span style="color:#ffffff"> __data __ </span>  <span style="color:#ffffff">that might be useful to send to the server or synchronise between clients?</span>

Position

Rotation \(in y axis\)

Ammo count

Health

Messages if game has an in\-built chat messaging system

And probably more…

# Answer

---

Reason rotation is restricted to y axis is when the player looks up we don’t want the capsule to rotate too because that would look weird, would look like the capsule is floating.

So why not send the whole rotation and just ignore parts of it. We should avoid sending large amounts of data sending wasted data as this will increase latency.

# In this demonstration we will only be sharing positional data for simplicity's sake

To Server from Client

A message to get the position of another player \(to spawn them in the correct place\)

A message to notify the server when the client moves around

To Client from Server

A message to welcome the user when they connect

A message to notify the other clients when a new client has connected

A message to notify a newly connected client of the already connected clients

A message to notify other clients when a client has disconnected

A message to notify other clients when a client moves around \(synch movement\)

# What messages will need to be sent?

![Multiplayer web games_40](https://github.com/user-attachments/assets/84aeac83-0011-4db7-a0a0-bfbf55492405)

# Skeleton Code for Server networking

---

So you can see the two messages sent to the client

And you can see a bunch of messages received from the client

![Multiplayer web games_41](https://github.com/user-attachments/assets/f421485c-097c-4647-bdad-2dd65bef0f57)

# Skeleton code client

# Steps to now get multiplayer logic working

# Spawn player/client 1 and 2 in different positions (will have to keep track of number of clients)

Pseudocode

Have the server keep track of the number of clients connected

When you send the welcome message also send the number of clients connected

When the client receives the welcome message they can do a simple if else statement to check if they are the first client or not and spawn themselves in the appropriate pre set position

![Multiplayer web games_42](https://github.com/user-attachments/assets/544ba917-785e-46f3-ae7a-ddd8582f50b8)

![Multiplayer web games_43](https://github.com/user-attachments/assets/22f5a011-928e-4d82-9aa7-234a068e1219)

# Spawn a representation of client 2, client side, on client 1’s screen and vice versa

Pseudocode Server

The server keeps track of each player's position starting at some default value for player1 and some \(different\) default value for player 2

When a socket joins if they are not the first player send the SpawnPlayer1\_OnPlayer2Client message to spawn so player 2 can see player 1

Send a message to all currently connected clients that a new player has joined

When get player pos message is received\, get the position of a player using the id and call the callback function passing in this position



* Pseudocode Client
* Create a InitOtherPlayerPos function which spawns a representation of the other player into the scene at a location
* Call the InitOtherPlayerPos function as a reaction to a new player joining or as a reaction to SpawnPlayer1\_OnPlayer2Client\.
  * Special case: if reacting to the latter message before you spawn the player representation you must get the position of the other player from the server using the “GetOtherPlayerPos” message


![Multiplayer web games_44](https://github.com/user-attachments/assets/940469b0-66a4-46e3-aad0-3770cf8b446e)

![Multiplayer web games_45](https://github.com/user-attachments/assets/b2aeb91d-7bae-4e69-a7f1-706a3ad0984b)

# Network the movement of both clients

Pseudocode Client

Adjust the player controller to dispatch an event when the player moves

When this event is fired send a client moved message to the server with the new player position

When the update other player message is received update the position of the other player representation using the position supplied by the message



* Pseudocode Server
* When the client moved message is received
  * Update the stored client positions variable
  * Send a update other player message to all clients except the sender


![Multiplayer web games_46](https://github.com/user-attachments/assets/6dac22c8-9187-462d-9fb9-8ee0b7ca8508)

![Multiplayer web games_47](https://github.com/user-attachments/assets/ae210d6b-f5bd-4b3e-81ec-87232f798e88)

![Multiplayer web games_48](https://github.com/user-attachments/assets/5b4e78a5-82bc-49f3-9dec-dfdbe6d1ee68)

# Gracefully handle players quitting



* Pseudocode
* Server
  * Decrement the variable keeping track of the number of connected clients
  * Delete and Stop keeping track of the player who's quit position
  * Broadcast a user disconnected message to the other clients
* Client
  * Remove the other player representation from the scene
  * Set the reference to the player representation to null


![Multiplayer web games_49](https://github.com/user-attachments/assets/d57dc5b2-d6de-4ee8-aa31-be4bded066c2)

![Multiplayer web games_50](https://github.com/user-attachments/assets/69e33e41-fe23-423d-a22c-9f9f1660bec6)


<img src="https://github.com/user-attachments/assets/f2641805-06e8-4667-893a-3059c86d631d" width="100%" height="auto"/>


# Final Touches
Now we can make it look a little better by adding a title, frost screen border, removing one of the alerts, placing the camera in a nice location to start, and a button that when you press starts the networking stuff


This is done by placing the player spawning code and part of the networking logic in a function and having that function run as a result of the button being pressed






<img src="https://github.com/user-attachments/assets/45013cda-2f4f-42a5-af56-af4dad512331" width="100%" height="auto"/>

# Result

![](img%5CMultiplayer%20web%20games_52.gif)

# Thank you for watching


![links](https://github.com/user-attachments/assets/986814fc-0a89-4bc0-b92a-fea7d708e44f)



# In case anyone was curious

The map i recreated was Nacht der untoten from the cod zombies series

![Nacht_Der_Untoten_Menu_Selection_BO3-ezgif com-webp-to-png-converter](https://github.com/user-attachments/assets/533dd0eb-d4b6-4f05-bf0a-60d54771dfd8)


![nacht](https://github.com/user-attachments/assets/bd22b0a8-4ba3-407e-8147-7322139ec9d3)

![myNacht](https://github.com/user-attachments/assets/a6400a12-45a3-4907-aca2-9ea43289044e)


![nacht2-ezgif com-webp-to-png-converter](https://github.com/user-attachments/assets/c6fbc0e5-5dcd-4289-9de4-fa3819b6910f)
![Screenshot 2024-12-02 021215](https://github.com/user-attachments/assets/ca7e87ea-0364-422a-9b11-ff0d94d60344)



![nacht3-ezgif com-webp-to-png-converter](https://github.com/user-attachments/assets/8bce5fa2-0078-48d4-9543-c4f16be7e8e6)

![Screenshot 2024-12-02 021304](https://github.com/user-attachments/assets/f57714f2-5b92-4c5d-bdd5-b105586241b6)


![mysterybox-ezgif com-webp-to-png-converter](https://github.com/user-attachments/assets/fcbbafa3-150a-424b-8e54-50d67af1c128)

![mystery box](https://github.com/user-attachments/assets/cd0c02a5-2ec9-473f-b2e1-b15f8392556b)


