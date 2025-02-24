# Chatbot Web App 🤖💬

Welcome to the **Chatbot Web App**! This is a modern and interactive chatbot web application that utilizes the **Gemini language model API** to simulate real-time conversations with a user. It supports dynamic message exchange, file uploads, light/dark theme toggling, and more, all wrapped up in a sleek and responsive user interface built using **HTML**, **CSS**, and **JavaScript**. ✨

---

## Features ✨

- **Real-time Chat** 💬: Engage in dynamic conversations with the chatbot using a sophisticated typing effect that simulates human-like responses. ⏳

- **File Uploads** 📂: Upload and preview images or documents within the chat. The app supports multiple file types, enhancing user interaction. 📸📑

- **Light/Dark Theme Toggle** 🌞🌜: Switch between light and dark modes to customize the appearance of the chat interface. 🌗

- **Message History** 📝: The entire conversation is saved, and new messages are appended dynamically. 🖋️

- **Responsive UI** 📱💻: Fully responsive and optimized for both mobile and desktop usage, providing an intuitive experience across devices. 📱🖥️

- **Abort Response** ❌: You can cancel an ongoing bot response if you change your mind or need to stop the chatbot. ✋

- **Quick Suggestions** 💡: Use predefined suggestions to quickly fill in the input field and make interactions more efficient. ⚡

- **Smooth Scroll** 📜: Auto-scrolls the chat window to the bottom as new messages are added, ensuring that the latest messages are always visible. 👀

---

## Table of Contents 📚

1. [Installation](#installation) 🛠️

2. [Usage](#usage) 💻

3. [File Structure](#file-structure) 🗂️

4. [Technology Stack](#technology-stack) 💻

5. [Contributing](#contributing) 🤝

6. [Live Demo](#live-demo) 🌐

7. [Acknowledgements](#acknowledgements) 👏

8. [Contact](#contact) 📬

---

## Installation 🛠️

Follow the steps below to get the chatbot up and running locally on your machine:

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/yourusername/chatbot-web-app.git
cd chatbot-web-app
```

### 2. Open the Project in Your Browser 🌐

Since this is a static web application, you don't need any server-side setup. Simply open the `index.html` file in your web browser:

```bash
open index.html # For macOS 🍏
start index.html # For Windows 💻
```

Alternatively, you can just double-click the `index.html` file to open it directly in your default browser.

### 3. Edit the Code (Optional)

Feel free to modify the source code to match your preferences. You can customize the chatbot behavior, UI appearance, or even tweak the API to interact with a different service.

---

## Usage 🖥️

Once the app is up and running, explore the following features:

### Chat with the Bot 💬

- Type your message in the input field at the bottom of the screen.

- Press **Enter** or click the **Send** button to send your message.

- The bot will reply with a simulated typing effect, making the conversation feel more interactive. 🖋️

### Upload Files 📂

- Click the **Add File** button to open the file selection dialog.

- Choose an image or document from your computer.

- The file will be displayed as a preview in the chat, and the bot will be notified of the file. 📸

- Supported file types include:

  - **Image**: `.jpg`, `.png`, `.gif` 📷

  - **Document**: `.pdf`, `.txt` 📄

### Toggle Themes 🌞🌜

- Click the **Theme Toggle** button to switch between the **Light** and **Dark** themes.

- The theme is persisted in **localStorage**, so the app will remember your preference even after a page reload. 🌗

### Abort a Response ❌

- If the bot is in the middle of typing, click the **Stop Response** button to cancel the ongoing response. ✋

### Clear Chat History 🧹

- Click the **Clear Chat** button to reset the chat container and start fresh. This will delete the chat history for that session. 🔄

### Quick Suggestions 💡

- Click on the suggested phrases provided by the bot to fill in the input field with predefined responses, helping speed up the conversation. ⚡

---

## File Structure 🗂️

Here’s an overview of the file structure of the project:

```bash
/chatbot-web-app
│
├── index.html          # The main HTML file with the chatbot structure 🌐
├── style.css           # Styling for the chat interface (Light/Dark mode support) 🎨
├── app.js              # JavaScript for handling the chatbot logic, file upload, and API requests 🧑‍💻
├── gemini-chatbot-logo.svg  # The chatbot logo used in the chat interface 🤖
└── README.md           # This README file, providing documentation and project details 📑
```

---

## Technology Stack 💻

The project is built using the following technologies:

- **HTML5 🖥️**: For structuring the web page and displaying content.

- **CSS3 🎨**: For styling the chat interface and ensuring responsiveness.

- **JavaScript (ES6+) 🧑‍💻**: To manage dynamic interactions, API calls, and frontend logic.

- **Gemini API 🤖**: The external API used to generate bot responses based on user input.

- **FileReader API 📚**: For reading and previewing files directly in the browser. 📂

- **localStorage 💾**: To persist theme preferences between user sessions.

---

## Contributing 🤝

We welcome contributions from everyone! Here's how you can contribute:

### Steps to Contribute:

1. **Fork the repository**: Click on the “Fork” button on the top right of the repository page to create your own copy of the project. 🍴

2. **Create a new branch**: Create a feature branch to work on your changes. (e.g., `git checkout -b feature-name`)

3. **Make your changes**: Edit the files as required. ✍️

4. **Commit your changes**: Use clear and descriptive commit messages. (e.g., `git commit -m 'Added file upload feature'`) 📝

5. **Push to your fork**: Push your changes to your forked repository (`git push origin feature-name`) 🚀

6. **Create a pull request**: Go to the original repository and create a pull request from your fork. 🔄

### Code Style:

- Follow the existing code style for consistency.

- Write descriptive commit messages.

---

## Live Demo 🌐

Check out the live version of the chatbot web app hosted online! Click the link below to start interacting with the bot in real-time:

[Live Demo 🚀](https://botconnect.netlify.app/)

Feel free to test out the chat features, upload files, and switch between light/dark themes! 🌗✨

---

## Acknowledgements 👏

- **Gemini API 🤖**: A big thank you to the developers of Gemini, who made it possible to integrate advanced AI language models into this chatbot. 🙌

- **Material Icons 🎨**: For the icon library that makes the interface look great. 🌟

- **Prettier Code Formatter 💅**: For maintaining consistent code formatting across the project. ✨

---

## Contact 📬

If you have any questions, suggestions, or feedback, feel free to reach out! You can either:

- Open an issue in the GitHub repository 📍

- Email me at [Sudhanshu Jha](mailto:sudhanshujha164@gmail.com) 📧

Happy chatting! 🗨️✨
