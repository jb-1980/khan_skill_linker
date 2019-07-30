# Khan Skill Linker
A simple app to build the html for a lesson page that links out to a Khan Academy Skill.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## The problem
You need to create a content page that will create a link to a Khan Academy skill.
You might not want to write all the html and code. Takes to much time, especially
when it is repetitive.

## This solution
This will fetch a list of all exercises from Khan Academy, and store them in
the browser with `localStorage`. While the initial load is long, afterward it 
should be really fast. You can then search this list for a skill. Once a skill
is chosen the html will be generated that you can copy with the click of a
button.
