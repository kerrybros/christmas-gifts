# 🎄 Christmas Gift Raffle 🎁

A festive, animated Christmas gift raffle display for your holiday party!

## Features
- ❄️ Beautiful falling snow animation
- 🎅 Christmas-themed design with glowing effects
- 🎰 Animated slot machine reveal effect
- 🎉 Confetti celebration when results are shown
- 📱 Responsive design (works on any screen size)
- 🎮 Hidden Easter eggs for fun!

## How to Use

### 1. Prepare Your Data
Edit the `gifts.csv` file with your employee names and predetermined gifts:

```csv
Name,Gift
John Smith,Wireless Headphones
Sarah Johnson,Gift Card $50
...
```

**Important:** The results are predetermined based on your CSV order. The animation is just for show!

### 2. Run the Raffle
1. Open `index.html` in any web browser
2. Project it on a screen at your party
3. Click anywhere on the screen to start the animation
4. Watch the slot machine effect, then results appear with confetti!
5. Click "🔄 Shuffle Again" to restart (it will show the same predetermined results)

## Easter Eggs 🥚

1. **Konami Code**: Press ↑ ↑ ↓ ↓ ← → ← → B A for a surprise!
2. **Snowflake Click**: Click on snowflakes rapidly (5 clicks) for confetti burst
3. More hidden surprises to discover...

## Customization

### Change Colors
Edit `style.css` - look for color codes like:
- `#ffd700` (gold)
- `#ff6b6b` (red)
- `#1a472a` (green background)

### Add Sound Effects
Uncomment the sound code in `script.js` and add MP3 files like:
- `jingle.mp3` - plays on start
- `win.mp3` - plays on results reveal

### Adjust Animation Speed
In `script.js`, find:
- `counter > 30` - Change 30 to make animation longer/shorter
- Animation timing in CSS - adjust `animation-duration` values

## Technical Details
- Pure HTML/CSS/JavaScript (no build process needed)
- Uses [canvas-confetti](https://www.kirilv.com/canvas-confetti/) library from CDN
- Works offline (except for confetti library)
- No backend required

## Troubleshooting

**CSV not loading?**
- Make sure `gifts.csv` is in the same folder as `index.html`
- Check the browser console (F12) for errors
- If issues persist, the app will fall back to sample data

**Animation too fast/slow?**
- Edit the `counter > 30` value in `script.js` (line ~98)
- Adjust `setTimeout` delays for result reveals (line ~160)

## Credits
Built with ❤️ for your Christmas party celebration!

Merry Christmas! 🎅🎄

