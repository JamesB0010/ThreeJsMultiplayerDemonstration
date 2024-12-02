# Three.js Multiplayer Demonstration

Hi! This repository is a learning resource containing a PowerPoint presentation and accompanying code on how to use **Socket.IO** and **Three.js** to create a simple multiplayer game.

For the best experience, download the presentation directly from [this link](https://github.com/JamesB0010/ThreeJsMultiplayerDemonstration/blob/7df7abd0aa034c3ad63f21bb91a01ce6af797345/Presentation/Multiplayer%20web%20games.pptx).

Otherwise, below is a converted version of the presentation, designed to go along with the code.

---

- **Development time:**  
  - Code: ~7 hours  
  - Presentation: ~8 hours  

Enjoy!

---






![](img%5CMultiplayer%20web%20games_0.jpg)

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

![](img%5CMultiplayer%20web%20games_1.png)

Assume io here is an object accessible from this scope

---

What this does is assigns an event listener to react to a socket connecting to the server.

This callback will be ran on the server for each socket when they connect to the server. Each socket represents a two way communication between server and client

![](img%5CMultiplayer%20web%20games_2.png)

Assume socket here is an object accessible from this scope

Special use of emit\. emit is covered in a sec

![](img%5CMultiplayer%20web%20games_3.png)

Assume socket here is an object accessible from this scope

This is how to react to messages from the server

![](img%5CMultiplayer%20web%20games_4.png)

Flexibility in what we send when we send messages

# That’s it!

![](img%5CMultiplayer%20web%20games_5.png)

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

![](img%5CMultiplayer%20web%20games_6.png)

Next we’ll get some javascript in to get a cube spinning

You may notice that my main file is very small \(12 lines\)\. This is intentional\, all the complexities of setting up a scene is all handled by the sceneInitializer\.

All of your networking code is going to be in this file so keeping your code clean by separating it out into different files and classes will really be worth the time it takes\.

![](img%5CMultiplayer%20web%20games_7.png)

![](img%5CMultiplayer%20web%20games_8.png)

Just for reference here is the SceneInitializer\.

It has a few member variables but essentially just sets three js up for us so its ready to be used leaving our main file clean

# Run with live server

![](img%5CMultiplayer%20web%20games_9.gif)

So when we run this using a live server from our ide we can see our three js scene rendering

# Next serve these files with express (server)

![](img%5CMultiplayer%20web%20games_10.gif)

# Now lets make our scene look pretty…

![](img%5CMultiplayer%20web%20games_11.png)

Well make a scene in blender and export everything into a gltf

This is contained in the static folder with

Your other client resources like

Sky sphere textures and source code

# Getting it into three.js

So in our main js were going to import our SceneBuilder class \(which ill show in a sec\)\, create a new instance of a sceneBuilder and chain together a bunch of methods to build our scene in one line\.

Well also call scene builders update function in our animate function\. This way any objects like our orbit controller for example can be updated

![](img%5CMultiplayer%20web%20games_12.png)

![](img%5CMultiplayer%20web%20games_13.gif)

# Scene Builder

![](img%5CMultiplayer%20web%20games_14.png)

The scene builder is composed of some useful member variables\, a simple constructor\, an update function and…

![](img%5CMultiplayer%20web%20games_15.png)

![](img%5CMultiplayer%20web%20games_16.png)

# And…

![](img%5CMultiplayer%20web%20games_17.png)

a bunch of chainable methods which allow us to build our scene by adding a bunch of smaller parts to our scene

![](img%5CMultiplayer%20web%20games_18.png)

![](img%5CMultiplayer%20web%20games_19.png)

# Okay the last thing we've got to do is get a player controller in

![](img%5CMultiplayer%20web%20games_20.png)

This player controller is just a wrapper around the FirstPersonControls class provided by three js\.

The only additions made by this class to the FirstPersonControlls class from THREE\.js are

the y axis is fixed

You can enable / disable the FirstPersonControls by pressing space

We can make a small change to our scene builder to give it the ability to add a player controller into our scene

![](img%5CMultiplayer%20web%20games_21.png)

![](img%5CMultiplayer%20web%20games_22.png)

Now we can swap out our orbit controls for our first person controls

![](img%5CMultiplayer%20web%20games_23.png)

![](img%5CMultiplayer%20web%20games_24.png)

# Yipeeee

Also if anyone could tell me what environment I have recreated here that would make me very happy 😉

We have now constructed a base project which we can make multiplayer\.

![](img%5CMultiplayer%20web%20games_25.gif)

The aim will be to have two clients able to connect to the server and see each other walk around\. A client can leave and join back at any time\.

A limitation of the system we will build is that it will be made for only 2 clients to connect at once you will have to think or experiment yourselves if you want more than 2 clients 😉

Doesn’t handle disconnections then reconnections well same again 😉

# Time to make it multiplayer!!

# Server

![](img%5CMultiplayer%20web%20games_26.png)

<span style="color:#ffffff">First we will use npm to install socket io </span>

# Now lets edit our server code

We will add a layer over the top of our express server to make the server an express and socket io server

![](img%5CMultiplayer%20web%20games_27.png)

![](img%5CMultiplayer%20web%20games_28.png)

Instead of app\.listen to start our server we can use server\.listen

![](img%5CMultiplayer%20web%20games_29.png)

![](img%5CMultiplayer%20web%20games_30.png)

If your wondering how this socket\.io\.js file actually gets to your client\. Heres how

The node package socket\.io we installed earlier \(npm\) includes both the server side and client side code\.

When we set up our server with socket io the endpoint /socket\.io/socket\.io\.js was automatically created\.

Anyone who has made a server so far has set up their own endpoints\. Looks something like

app\.get\(“Address”\, \(req\, res\) =>\{\}\); see if you can see it in your code

# Next add socket io to the client

![](img%5CMultiplayer%20web%20games_31.png)

# continued

Then when html sees our \<script> tag it makes a http get request to the src which in this case is “socket\.io/socket\.io\.js” and the server returns the client side library code

![](img%5CMultiplayer%20web%20games_32.png)

# Okay now we are ready to start using the library!

![](img%5CMultiplayer%20web%20games_33.png)

# Initialize in our script

# Add this to our server

![](img%5CMultiplayer%20web%20games_34.png)

# Test

![](img%5CMultiplayer%20web%20games_35.gif)

# The server can send messages to the client if it wants

![](img%5CMultiplayer%20web%20games_36.png)

# And we can create event handlers to react to these messages

![](img%5CMultiplayer%20web%20games_37.png)

# Test

![](img%5CMultiplayer%20web%20games_38.gif)

# We can send custom data too if we want

![](img%5CMultiplayer%20web%20games_39.gif)



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

![](img%5CMultiplayer%20web%20games_40.png)

# Skeleton Code for Server networking

---

So you can see the two messages sent to the client

And you can see a bunch of messages received from the client

![](img%5CMultiplayer%20web%20games_41.png)

# Skeleton code client

# Steps to now get multiplayer logic working

# Spawn player/client 1 and 2 in different positions (will have to keep track of number of clients)

Pseudocode

Have the server keep track of the number of clients connected

When you send the welcome message also send the number of clients connected

When the client receives the welcome message they can do a simple if else statement to check if they are the first client or not and spawn themselves in the appropriate pre set position

![](img%5CMultiplayer%20web%20games_42.png)

![](img%5CMultiplayer%20web%20games_43.png)

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


![](img%5CMultiplayer%20web%20games_44.png)

![](img%5CMultiplayer%20web%20games_45.png)

# Network the movement of both clients

Pseudocode Client

Adjust the player controller to dispatch an event when the player moves

When this event is fired send a client moved message to the server with the new player position

When the update other player message is received update the position of the other player representation using the position supplied by the message



* Pseudocode Server
* When the client moved message is received
  * Update the stored client positions variable
  * Send a update other player message to all clients except the sender


![](img%5CMultiplayer%20web%20games_46.png)

![](img%5CMultiplayer%20web%20games_47.png)

![](img%5CMultiplayer%20web%20games_48.png)

# Gracefully handle players quitting



* Pseudocode
* Server
  * Decrement the variable keeping track of the number of connected clients
  * Delete and Stop keeping track of the player who's quit position
  * Broadcast a user disconnected message to the other clients
* Client
  * Remove the other player representation from the scene
  * Set the reference to the player representation to null


![](img%5CMultiplayer%20web%20games_49.png)

![](img%5CMultiplayer%20web%20games_50.png)

![](img%5CMultiplayer%20web%20games_51.gif)

# Result

![](img%5CMultiplayer%20web%20games_52.gif)

# Thank you for watching

![](img%5CMultiplayer%20web%20games_53.png)

![](img%5CMultiplayer%20web%20games_54.png)

![](img%5CMultiplayer%20web%20games_55.png)

![](img%5CMultiplayer%20web%20games_56.png)

![](img%5CMultiplayer%20web%20games_57.png)

![](img%5CMultiplayer%20web%20games_58.png)

AverageAltoDriver

James\-Richard\-Bland

![](img%5CMultiplayer%20web%20games_59.png)

![](img%5CMultiplayer%20web%20games_60.png)

