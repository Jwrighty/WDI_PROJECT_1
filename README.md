# WDI - PROJECT - 1 - Kickback KungFu 

# Intro & Brief
This was my first project on week 3 of the web development immersive course at General Assembly. The brief was to make a game using what HTML, CSS and Javascript we had learnt in the first two weeks of the course. I defined 4 potential game ideas (the others being; a clicker/idle game, connect4 or a piano memory game) and was recommended to tackle the most complex.

# The Game
The idea for the chosen game came from an old Amiga game that i used to play as a child called 'IK+'. Within that there was a mini game where a character in the middle of the screen had to deflect bouncing balls that came in from either side of the screen. The bounce height and movement speed are randomised with the number entering the screen increasing over time. I set out to replicate this, minus the bouncing animations.

# Steps
* Pseudo code to think about necessary steps
* Layout using divs and borders the character and game area
* Began with character on the left of the screen and worked on animating a single html object from the right, triggered by a button click.
* Stepped up to 3 objects at different heights again triggered on button click.
* Split the character into three divs. Researched on how to map keyboard keys in javascript and created functions that on key press moved a class of 'selected' between each div.
* This enabled the collision detection through assessing whether the corresponding character div had the class of selected at the end of the animation.
* Randomised the speed of travel for each object.
* Realised that in order to randomise the firing i would need to take a different approach creating an object in javascript and inserting. I did this by creating a empty html element which i would then pull, clone and assign a class. This would then be inserted at random into one of the 3 divs for high/middle/low.
* Removed the on click button to trigger each object and used set interval to execute the create and animate functions. 
* Created a gameover state for when the collision failed. 
* Created a reset function
* 


# Challenges

CSS

# Key Learnings
* tried to take a functional approach which really helped

# Potential next steps

