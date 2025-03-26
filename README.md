# ⏳ Countdown Timer and Promise Generator

This project was created using Vite. To learn more and configure additional
features [see the documentation](https://vitejs.dev/).

This project contains two separate tasks:

## 1️⃣ Countdown Timer

– a tool that allows you to select a future date and count down the time to it.

      📌 Functionality
      ✔ The user selects a date via the flatpickr calendar.
      ✔ If the date is in the past, an error message is displayed.
      ✔ The "Start" button is only activated when a future date is selected.
      ✔ After starting, the "Start" button and the input field are locked.
      ✔ A notification about the speed of time appears
      ✔ The timer counts down days, hours, minutes, and seconds.
      ✔ When the timer reaches 00:00:00:00, the countdown stops.

## 2️⃣ Promise Generator

– creates a promise with a given delay and a specified state.

      📌 Functionality
      ✔ Promise generator
      ✔ User enters a delay in milliseconds.
      ✔ Chooses whether the promise should be fulfilled or rejected.
      ✔ After clicking the "Create notification" button after a specified time:
      If successful (fulfilled), a message about successful execution is displayed.
      If an error (rejected), a message about rejection is displayed.

## 🔧 Technologies

      ✅ JavaScript – the main development language
      ✅ HTML/CSS – structure and styling
      ✅ [flatpickr](https://flatpickr.js.org/) – date selection
      ✅ [iziToast](https://marcelodolza.github.io/iziToast/) – message output

## 📂 Project structure

       |──📁.github/workflows     # Files for GitHub Actions
       |──📁assets                # Additional resources such as fonts, icons, etc.
       │───📁src                  # Project folder
       |   │──📁css               # Project Styles
       |   │──📁img               # Image Folder
       |   │──📁js                # Logic Folder
       |   |  |──📄 1-timer.js    # Timer Logic
       |   |  |──📄 2-snackbar.js # Promise generator logic
       │   │──📄 1-timer.html     # Timer interface
       │   │──📄 2-snackbar.html  # Promise generator interface
       │   │──📄 index.html       # Website home page
       │──📄 .editorconfig        # Editor settings
       │──📄 .gitignore           # Git ignore file
       │──📄 .prettierrc.json     # Code formatting configuration
       │──📄 README.md            # Project description
       │──📄 package-lock.json    # Dependency tree description
       │──📄 package.json         # Dependency information
       │──📄 vite.config.js       # Vite settings

       🎯 Possible improvements
       🔹 Add animation when changing timer values
       🔹 Add the ability to pause and resume the countdown
       🔹 Use localStorage to save the timer state

👨‍💻 Author: [Ded-goIT] 📅Date: [20.03.2025]

✅ The project was created to practice working with promises and asynchronous
JavaScript.
