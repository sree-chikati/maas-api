# Maas Database
✨Sarah J. Mass Character Database🌙

> This project is aimed at creating an API which allows users to add their favorite Sarah J. Maas's book characters to the Database. It's very hard to keep track of all her characters that she includes in her book series. While there are other websites out there that do this, I wanted to try and create an API that would allow users to do the same while also being able to use this in their own projects. 

## Table of Contents
 * [Methods](#methods)
 * [Objects](#objects)
 * [Enpoints](#endpoints)
 * [How to get started](#how-to-get-started)
 * [Results](#results)


## Methods
 <b>GET</b> : gets the instance of the object<br>
 <b>POST</b> : creates/posts the instance of the object<br>
 <b>PUT</b> : updates the object and its instances<br>
 <b>DELETE</b> : deltes the object and its insteances


## Objects
<b>User</b>: The user who will create the character
```
{   
    "username": "User's username", 
    "password": "User's password",
}
```
 <b>Character</b>: Character from one of the existing Book Series such as "Aelin"
```
{
    "book": "Title of Book",
    "name": "Name of Character",
    "age": "Age of Character",
    "species": "Species of Character",
    "powers": "If any, powers of Characters",
    "summary": "Short Description of Character",
    "author" : "User.ID'
}
```

## Endpoints
User valid routes: 
* <b>GET ```/users```</b> : Gets a list of all the users
* <b>GET ```/users/{user:id}```</b> : Gets info on user with specified ID
    * <b><i>NOTE:</i></b> Replace {user:id} with valid ID from the databse
* <b>POST ```/users```</b> : Creates/posts new user in the database
* <b>PUT ```/users/{user:id}```</b> : Updates info on user with specified ID and User Object
* <b>DELETE </b>```/users/{user:id}```</b> : Deleted info on user with specified ID and User Object

Character valid routes:
* <b>GET ```/characters```</b> : Gets a list of all the characters
* <b>GET ```/characters/{character:id}```</b> : Gets info on character with specified ID
    * <b><i>NOTE:</i></b> Replace {character:id} with valid ID from the databse
* <b>POST ```/characters```</b> : Creates/posts new character in the database
* <b>PUT ```/characters/{character:id}```</b> : Updates info on chracter with specified ID and Character Object
* <b>DELETE ```/characters/{character:id}```</b> : Deleted info on chracter with specified ID and Character Object

## How to get started
> This will all be done through using ```Postman```
1. Create 2 users using <b>POST ```/users```</b> :
```
{
    "username": "user1",
    "password": "user1Password"
}
```
```
{
    "username": "user2",
    "password": "user2Password"
}
```
    * Go to <b>GET ```/users```</b> to make sure users are created
> Copy user1's user.Id from and save somewhere

2. Create a character using <b>POST ```/characters``` :</b>
```
{
    "book": "Heir of Fire",
    "name": "Aelin",
    "age": "19",
    "species": "Fae",
    "powers": "Fire",
    "summary": "Main Character of the series Throne of Glass",
    "author": "Copy-Paste user1's saved User.Id",
}
```
    * Go to <b>GET ```/characters```</b> to make sure character is created
3. Change the the username of ```user2``` using <b>PUT ```/users/{user2.ID}```</b>
```
{
    "username": "testName"
}
```
    * Go to <b>GET ```/users/{user2.ID}```</b> to make sure username is updated

4. Let's Delete ```testName``` since we are not using it using <b>DELETE ```/users/{testName.ID}```</b>
    * Go to <b>GET ```/users```</b> to make sure it's deleted

<br>
You can now experiment by creating, reading, updating, and deleting other users and characters too!

## Results
In the end of the guide you followed above^^ your results should look similar to the ones below.
> These are just an examples from the above mini tutorial! The IDs in these example <i>```WILL```</i> be <i>```DIFFERENT```</i> on your end. 

<br>

1. Create 2 users
    * <b>GET ```/users```</b>

```
{
    "users": [
        {
            "characters": [],
            "_id": "609a071b336e17a3edce9005",
            "username": "user1",
            "__v": 3
        },
        {
            "characters": [],
            "_id": "609a15ce589cb2a611765776",
            "username": "user2",
            "__v": 0
        }
    ]
}
```

2. Create a character
    * <b>GET ```/characters```</b>
```
{
        "characters": [
            {
                "_id": "609a07c1336e17a3edce9007",
                "book": "Heir of Fire",
                "name": "Aelin",
                "age": "19",
                "species": "Fae",
                "powers": "Fire",
                "summary": "Main Character of the series Throne of Glass",
                "author": "609a071b336e17a3edce9005",
                "__v": 0
            }
        ]
}
```

By here you're <b>```/users```</b> route should look like this: 
```
{
    "users": [
        {
            "characters": [
                {
                    "_id": "609a07c1336e17a3edce9007",
                    "book": "Heir of Fire",
                    "name": "Aelin",
                    "age": "19",
                    "species": "Fae",
                    "powers": "Fire",
                    "summary": "Main Character of the series Throne of Glass",
                    "author": "609a071b336e17a3edce9005",
                    "__v": 0
                }
            ],
            "_id": "609a071b336e17a3edce9005",
            "username": "user1",
            "__v": 3
        },
        {
            "characters": [],
            "_id": "609a15ce589cb2a611765776",
            "username": "user2",
            "__v": 0
        }
    ]
}
```
<br>

3. Change the the username of ```user2```
    * <b>GET ```/users/609a071b336e17a3edce9005```</b>
```
{
        "characters": [],
        "_id": "609a15ce589cb2a611765776",
        "username": "testName",
        "__v": 0
}
```

4. Delete ```testName``` since we are not using it using
    * <b>GET```/users```</b>
```
{
        "users": [
            {
                "characters": [
                    {
                        "_id": "609a07c1336e17a3edce9007",
                        "book": "Heir of Fire",
                        "name": "Aelin",
                        "age": "19",
                        "species": "Fae",
                        "powers": "Fire",
                        "summary": "Main Character of the series Throne of Glass",
                        "author": "609a071b336e17a3edce9005",
                        "__v": 0
                    }
                ],
                "_id": "609a071b336e17a3edce9005",
                "username": "user1",
                "__v": 3
            }
        ]
}
```
## 🎉Done!
You're done! Be sure to explore the character routes as well!


