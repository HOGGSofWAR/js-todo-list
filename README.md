# js-todo-list
a vanilla js todo list

This project is based upon another developer's to do list which exists as a tutorial on YouTube. Upon looking at their work, I first of all noticed that the code used for the project was out of date and I wanted to rewrite this project using modern styling such as SCSS and BEM, as well as more modern Javascript. I also discovered some bugs with the project, for example it wasn't responsive, had other styling bugs and some functionality bugs too.

Below is a list of bugs I resolved alongside modernising the code:

Responsive styling for mobile/tablet
Stop text overflowing in the li checklist if long words are entered into field
Prevent the user from submitting an empty field
Modernised the code as it was using out of date styling and javascript.

Rewrote some functions to use arrow functions
Refactored the code to move reused sections into their own functions
Adapted local storage code to store the completed / uncompleted state of each todo item
Assigned each item and ID to help keep track of each item to apply the completed / uncompleted state and delete from local storage (especially important when multiple todo items contain the same text as the previous code just checked for matching text and deleted the first instance)

Links to the original developers tutorial and github project can be found here for comparison on how I improved and fixed it:

https://www.youtube.com/watch?v=Ttf3CEsEwMQ&list=PLUpInSwE-10ne6uQJUXpwVZvYeWk4ZFWg&index=1

https://github.com/developedbyed/vanilla-todo
