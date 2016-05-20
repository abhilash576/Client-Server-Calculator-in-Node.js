//Author : Abhilash Malla 
//server : calcserver.js
//client : calcclient.js

Calcserver.js code requires hashmap package to be installed before executing.
(example, $npm install hashmap)

client socket program that can be invoked on command line: “node calcclient.js <client> <cmd> <val>” where
a.	<client> is a string client identifier
b.	<cmd> is one of the following:
i.	“a” – add <val> to the running total for that client
ii.	“m” – subtract (minus) <val> from the running total for that client
iii.	“s” – set (assign) the running total for that client to <val>
iv.	“q” – cause the server program to exit
c.	<val> is any integer value

In the case of “q” the server close all open connections to clients immediately, dump the client ids and running totals to the screen, and exit. 
