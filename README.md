# SpeakQuest (Project Voice Adventure)

**SpeakQuest** is an educational 2D platformer designed to help students practice English pronunciation through an interactive adventure. Your voice is your magic!

## 🌟 Concept
In SpeakQuest, the world reacts to your voice. To open chests, activate bridges, or defeat bosses, you must pronounce English words correctly. It's designed to be fun, non-punitive, and highly visual.

## 🚀 Technologies
- **Engine:** Phaser.js (HTML5 Game Framework)
- **Voice Recognition:** Web Speech API
- **Persistence:** LocalStorage
- **Language:** JavaScript (ES6 Modules)

## 🎮 How to Play
1. **Movement:** Use Arrow Keys or `A`/`D`.
2. **Jump:** Press `Space`.
3. **Run:** Hold `Shift`.
4. **Speak:** When near an interactive object, a microphone button/prompt will appear. Click the microphone or follow the on-screen instructions to speak the required word.
5. **Goal:** Complete the worlds by practicing pronunciation and collecting coins.

## 🛠 Project Structure
- `src/main.js`: Game entry point and configuration.
- `src/game/scenes/`: Phaser scenes (Boot, Menu, World Select, Gameplay, Results).
- `src/game/objects/`: Game entities (Player, Echo the Pet, NPCs, interactive elements).
- `src/game/systems/`: Core logic (Speech recognition, Scoring, Progress).
- `src/game/data/`: Game content (Worlds, Word lists, Achievements).
- `src/game/ui/`: Reusable UI components for bilingual support.

## 📦 Installation & Execution
This is a client-side web application. To run it locally:
1. Clone the repository.
2. Open `index.html` in a modern web browser (Chrome or Edge recommended for Web Speech API support).
3. *Note:* Some browsers require a local server to handle ES6 modules. You can use an extension like "Live Server" in VSCode or run `npx serve .` in the project root.

## 🚧 Future Improvements
- **Teacher Panel:** Allow teachers to upload custom word lists for their classes.
- **Advanced Phonetics:** Integrate more advanced AI for detailed pronunciation feedback.
- **Class Ranking:** Social features for schools.
- **Character Customization:** Unlockable outfits and evolutions for Echo.

## 🎓 Credits
- **Programming Professor**
- **English Professor**

---
*Created as an MVP for educational innovation.*
