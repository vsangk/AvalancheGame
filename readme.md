## Avalanche Game

### Background
Avalanche is a simple 2-d game of avoiding falling icicles. The objective is to the last as long as possible without getting hit by an icicle. The icicles will drop from the ceiling and as the round progresses, the number of falling icicles will increase.

### Functionality & MVP
In the Avalanche Game, users will be able to:
- Start, pause, and reset the game
- Responds to keyboard inputs for movement
- The game ends when an icicle hits the player
- An option to the set the difficulty

In addition, this project will include:
- A How To Play section describing the rules of the game
- A score counter
- A production Readme

### Wireframes
- This app will consist of a single screen with the game board, instructions, and controls. The game board will have the mute option and setting option. The score counter will be on the top right of the screen.

![wireframe](http://res.cloudinary.com/openbistro/image/upload/v1479082608/Avalanche_utxefi.png)

### Architecture and Technologies
The project will be implemented with the following technologies:
- Vanilla JavaScript for overall structure and game logic
- HTML5 Canvas for animation and rendering
- Webpack to bundle and serve up the various scripts.

board.js: this script will handle the logic for creating and updating necessary EaselJS elements and rendering them to the DOM

game.js: this script will handle the game logic of whether the player has lost and also incrementing the score

player.js: this script will handle the player object and movement

icicle.js: this script will handle the animation of falling icicles and the amount that will fall

### Implementation Timeline

#### Day 1: Set up all necessary Node modules and have a simple representation of the player.
- Setup node modules.
- Setup a canvas and stage.
- Have a block representing a player that renders on the screen.

#### Day 2: Have a representation of the icicles and have player be responsive to input.
- Have animated triangles representing icicles that are created and fall from the top of the stage to the bottom.
- Have player respond to keyboard movements.
- Have a scoreboard that increases with survival time.

#### Day 3: Implement game logic and sprites.
- Have the game end when an icicle hits the player.
- Get sprites implemented in place of the canvas shapes.

#### Day 4: Add finishing touches.
- Add a background to the stage.
- Add a mute option for the sounds affects.
- Add a settings button that changes the difficulty.

### Bonus features
- [ ] Add power-ups and power-downs that can either speed up or slow down the player
- [ ] Have different types of icicles that fall at varying speeds
