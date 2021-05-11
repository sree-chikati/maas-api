# Maas Database

[Include website here after done](https://www.google.com/)
> This project is aimed at creating an API which allows users to add their favorite Sarah J. Maas's book characters to the Database. It's very hard to keep track of all her characters that she includes in her book series. While there are other websites out there that do this, I wanted to try and create an API that would allow users to do the same while also being able to use this in their own projects. 

## Table of Contents
 * [Methods](#methods)
 * [Functions](#functions)
 * [Enpoints](#deployment)
 * [Examples](#examples)

## Methods
 <b>GET</b> : gets the instance of the object<br>
 <b>POST</b> : creates/posts the instance of the object<br>
 <b>PUT</b> : updates the object and its instances<br>
 <b>DELETE</b> : deltes the object and its insteances


## Functions
 <b>Character</b>: Character from one of the existing Book Series such as "Aelin"
```
{
    "_id": "Object ID",
    "book": "Title of Book",
    "name": "Name of Character",
    "age": "Age of Character",
    "species": "Species of Character",
    "powers": "If any, powers of Characters",
    "summary": "Short Description of Character",
    "author" : {
        "_id": "User.ID",
        "characters": [List of characters created],
        "username": "User's username"
    }
}
```
<b>User</b>: The user who will create the character
```
{
    "username": "User's username", 
    "password": "User's password",
    "character": [Character.ID, ref: "Character"]
}
```

## Endpoints
Character valid routes:
* <b>GET</b>```/characters``` : Gets a list of all the characters
* <b>GET</b> ```/characters/{character:id}``` : Gets info on character with specified ID
    * <b><i>NOTE:</i></b> Replace {character:id} with valid ID from the databse
* <b>POST</b>```/characters``` : Creates/posts new character in the database
* <b>PUT</b>```/characters/{character:id}``` : Updates info on chracter with specified ID and Character Object
* <b>DELETE</b>```/characters/{character:id}``` : Deleted info on chracter with specified ID and Character Object

User valid routes: 
* <b>GET</b>```/users``` : Gets a list of all the users
* <b>GET</b> ```/users/{user:id}``` : Gets info on user with specified ID
    * <b><i>NOTE:</i></b> Replace {user:id} with valid ID from the databse
* <b>POST</b>```/users``` : Creates/posts new user in the database
* <b>PUT</b>```/users/{user:id}``` : Updates info on user with specified ID and User Object
* <b>DELETE</b>```/users/{user:id}``` : Deleted info on user with specified ID and User Object


## Examples
> ```NOTE```: These are just an examples! The IDs in these example <i>WILL NOT</i> work with routes mentioned above!
Character Example: 
```
{
    "_id": "6090ee8e3d8a5072a82aafe6",
    "book": "Heir of Fire",
    "name": "Aelin",
    "age": "19",
    "species": "Fae",
    "powers": "Fire",
    "summary": "Main Character of the series Throne of Glass",
    "author": {
        "_id": "60987576de500c5f1f4a2c0a",
        "characters": [],
        "username": "usertest",
        "__v": 0
    },
    "__v": 0
}
```
User Example: 
```
{
    Add example here after getting User
}
```


