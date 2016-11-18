# Avalanche Game

[Avalanche][avalanche]
[avalanche]: https://vsangk.github.io/

Avalanche is a simple 2-d game of avoiding falling icicles. The objective is to the last as long as possible without getting hit by an icicle. The icicles will drop from the ceiling and as the round progresses, the number of falling icicles will increase.

![alttag](https://res.cloudinary.com/openbistro/image/upload/c_scale,q_61,w_369/v1479495250/avalanche/how-to-play.png)

Avalanche is a very lightweight game built only with the following:
- Vanilla JavaScript for game logic, DOM manipulation, and overall structure
- HTML5 Canvas for animation and rendering
- Webpack to bundle and serve up the various scripts.

## Features & Implementation

The game increases in difficulty over time. The speed of the icicles increase and the time interval between falls decrease by each level. This was achieved by tracking the frame rate refreshes and incrementing the level based on set intervals. Below you can see a side by side comparison between levels 1 and 5.

![alttag](https://res.cloudinary.com/openbistro/image/upload/c_scale,w_400/v1479495251/avalanche/level1.png)![alttag](http://res.cloudinary.com/openbistro/image/upload/c_scale,w_403/v1479495251/avalanche/level5.png)

The game includes a simple pause menu that also serves as a settings menu. Users can pause at any time during the game by hitting the enter key and has the option to restart the game and change which difficulty to start at.

![alttag](https://res.cloudinary.com/openbistro/image/upload/c_scale,q_61,w_401/v1479495249/avalanche/settings.png)

## Future Features

##### Restaurant Search
- [ ] Add a leaderboard that displays high scores after each attempt
- [ ] Add power-ups and power-downs that can either speed up or slow down the player
- [ ] Have different types of icicles that fall at varying speeds
