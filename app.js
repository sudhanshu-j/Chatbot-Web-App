// Selecting elements from the DOM using querySelector
const containerElement = document.querySelector(".container"); // The main container where chat messages will be displayed
const chatContainer = document.querySelector(".chat-container"); // The container holding the chat messages
const promptForm = document.querySelector(".prompt-form"); // Form where the user inputs a message
const promptInput = promptForm.querySelector(".prompt-input"); // Input field for the user to enter their message

const fileInput = document.querySelector("#file-input"); // Input for uploading files
const fileUploadWrapper = document.querySelector(".file-upload-wrapper"); // Wrapper for the file preview

const themeToggleBtn = document.querySelector("#theme-toggle-btn"); // Button to toggle between light and dark themes

// API key and URL to interact with an external chatbot service
const API_KEY = `Your_API`; // API key for the external service
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`; // URL to send requests to

let typingInterval, controller; // Variables for controlling the typing effect and request cancellation

// Chat history to keep track of messages exchanged
const chatHistory = [];

// User's input data, including the message and any attached file
const userData = {
  message: "", // User's message content
  file: {}, // Data for any file uploaded by the user
};

// Function to create a message element to be appended to the chat container
const createMsgElement = (content, ...classes) => {
  const msgElement = document.createElement("div"); // Create a new div element for the message
  msgElement.classList.add("message", ...classes); // Add the "message" class and any additional classes
  msgElement.innerHTML = content; // Set the content of the message
  return msgElement; // Return the created message element
};

// Function to auto-scroll the chat container to the bottom
const autoScroll = () =>
  containerElement.scrollTo({
    top: containerElement.scrollHeight, // Scroll to the bottom of the container
    behavior: "smooth", // Smooth scroll effect
  });

// Function to simulate a typing effect for the bot's response
const typingEffect = (text, textEl, botMessageDiv) => {
  textEl.textContent = ""; // Clear the message element
  const wordsEl = text.split(" "); // Split the text into words
  let wordIndex = 0;

  // Set an interval to type the words one by one
  typingInterval = setInterval(() => {
    if (wordIndex < wordsEl.length) {
      textEl.textContent += (wordsEl === 0 ? "" : " ") + wordsEl[wordIndex++]; // Append each word
      autoScroll(); // Auto-scroll to the bottom
    } else {
      clearInterval(typingInterval); // Stop typing once all words are displayed
      botMessageDiv.classList.remove("loading"); // Remove the "loading" class from the bot's message
      document.body.classList.remove("bot-responding"); // Remove the "bot-responding" class from the body
    }
  }, 40); // 40ms delay between typing each word
};

// Function to send the user's message and get a bot's response
const generateBotResponse = async (botMessageDiv) => {
  const textEl = botMessageDiv.querySelector(".text-message"); // Get the text element of the bot's message

  controller = new AbortController(); // Create a controller to manage the request abort

  // Add the user's message to the chat history
  chatHistory.push({
    role: "user",
    parts: [
      {
        text: userData.message, // User's message text
      },
      ...(userData.file.data
        ? [
            {
              inline_data: (({ fileName, isImage, ...rest }) => rest)(
                userData.file
              ), // If a file is attached, add its data to the history
            },
          ]
        : []),
    ],
  });

  try {
    // Send the request to the chatbot API
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify({
        contents: chatHistory, // Send the chat history in the request body
      }),
      signal: controller.signal, // Attach the abort signal to the request
    });

    const data = await response.json(); // Parse the JSON response

    if (!response.ok) throw new Error(data.error.message); // If the response is not OK, throw an error

    // Extract the response message and clean it up
    const responseMessage = data.candidates[0].content.parts[0].text
      .replace(/\*\*([^*]+)\*\*/g, "$1") // Remove bold text formatting (if any)
      .trim();

    typingEffect(responseMessage, textEl, botMessageDiv); // Simulate typing effect for the response

    // Add the bot's response to the chat history after the typing effect
    chatHistory.push({
      role: "model", // Indicate this is a bot message
      parts: [
        {
          text: responseMessage, // Bot's response text
        },
      ],
    });

    console.log(chatHistory); // Log the chat history for debugging
  } catch (error) {
    // Handle errors
    textEl.style.color = "#d62939"; // Set the text color to red for errors
    textEl.textContent =
      error.name === "AbortError"
        ? "Response generation aborted." // If the request was aborted
        : error.message; // Show the error message

    botMessageDiv.classList.remove("loading"); // Remove the "loading" class
    document.body.classList.remove("bot-responding"); // Remove the "bot-responding" class

    autoScroll(); // Auto-scroll to the bottom
  } finally {
    userData.file = {}; // Reset the file data after the response is processed
  }
};

// Function to handle the form submission when the user sends a message
const handleFormSubmit = (e) => {
  e.preventDefault(); // Prevent the form from submitting the usual way
  const userMessage = promptInput.value.trim(); // Get and trim the user's message input

  // If the message is empty or a response is already in progress, do nothing
  if (!userMessage || document.body.classList.contains("bot-responding"))
    return;

  // Build the HTML for the user's message, including any attached file
  const userMessageHTML = `<p class="text-message"></p>
  ${
    userData.file.data
      ? userData.file.isImage
        ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="img-attachment" />`
        : `<p class="file-attachment"><span class="material-symbols-outlined">description</span>${userData.file.fileName}</p>`
      : ""
  }
  `;

  const userMessageDiv = createMsgElement(userMessageHTML, "user-messages"); // Create the user's message element

  userMessageDiv.querySelector(".text-message").textContent = userMessage; // Set the user's message content
  chatContainer.appendChild(userMessageDiv); // Add the user's message to the chat container
  autoScroll(); // Auto-scroll to the bottom

  promptInput.value = ""; // Clear the input field

  userData.message = userMessage; // Update the user's message in userData

  document.body.classList.add("bot-responding", "chat-active"); // Set the bot as responding and activate the chat

  fileUploadWrapper.classList.remove("active", "img-attached", "file-attached"); // Remove any file attachment styles

  // Set a timeout to simulate a brief delay before showing the bot's "thinking" message
  setTimeout(() => {
    const botMessageHTML = `
      <img src="/gemini-chatbot-logo.svg" alt="Logo" class="avatar" />
      <p class="text-message">Just a sec...</p>
    `;

    const botMessageDiv = createMsgElement(
      botMessageHTML,
      "bot-messages",
      "loading"
    ); // Create the bot's "thinking" message
    chatContainer.appendChild(botMessageDiv); // Add the bot's message to the chat container

    autoScroll(); // Auto-scroll to the bottom

    generateBotResponse(botMessageDiv); // Generate the bot's actual response
  }, 600); // Delay for 600ms before generating the bot's response
};

// Event listener to handle file selection and preview
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0]; // Get the selected file

  if (!file) return; // If no file is selected, do nothing

  const isImage = file.type.startsWith("image/"); // Check if the file is an image
  const reader = new FileReader(); // Create a new FileReader to read the file
  reader.readAsDataURL(file); // Read the file as a data URL
  reader.onload = (e) => {
    fileInput.value = ""; // Reset the file input value

    const base64String = e.target.result.split(",")[1]; // Extract the base64 data from the result

    fileUploadWrapper.querySelector(".file-preview").src = e.target.result; // Set the file preview
    fileUploadWrapper.classList.add(
      "active",
      isImage ? "img-attached" : "file-attached"
    ); // Update the file upload wrapper style depending on the file type

    // Store file data in userData
    userData.file = {
      fileName: file.name,
      data: base64String,
      mime_type: file.type,
      isImage,
    };
  };
});

// Event listener to handle file removal
document.querySelector("#close-file-btn").addEventListener("click", () => {
  userData.file = {}; // Reset the file data
  fileUploadWrapper.classList.remove("active", "img-attached", "file-attached"); // Reset the file preview styles
});

// Event listener to stop the bot response (abort request and clear typing)
document.querySelector("#stop-response-btn").addEventListener("click", () => {
  userData.file = {}; // Reset file data
  controller?.abort(); // Abort the ongoing API request if it's still in progress
  clearInterval(typingInterval); // Stop the typing effect

  chatContainer
    .querySelector(".bot-messages.loading")
    .classList.remove("loading"); // Remove the "loading" class from the bot's message
  document.body.classList.remove("bot-responding"); // Remove the "bot-responding" class
});

// Event listener to delete the chat history
document.querySelector("#delete-chat-btn").addEventListener("click", () => {
  chatContainer.innerHTML = ""; // Clear the chat container
  chatHistory.length = 0; // Reset the chat history
  document.body.classList.remove("bot-responding", "chat-active"); // Remove the active classes
});

// Event listeners for suggestion items to quickly fill in the prompt input
document.querySelectorAll(".suggestion-item").forEach((item) => {
  item.addEventListener("click", () => {
    promptInput.value = item.querySelector(".suggestion-text").textContent; // Set the suggestion text in the input field
    promptForm.dispatchEvent(new Event("submit")); // Submit the form
  });
});

// Event listener to toggle the visibility of the prompt wrapper
document.addEventListener("click", ({ target }) => {
  const wrapper = document.querySelector(".prompt-wrapper");
  const shouldHide =
    target.classList.contains("prompt-input") ||
    (wrapper.classList.contains("hide-controls") &&
      (target.id === "add-file-btn" || target.id === "stop-response-btn"));
  wrapper.classList.toggle("hide-controls", shouldHide); // Toggle the visibility of the prompt wrapper
});

// Event listener to toggle between light and dark themes
themeToggleBtn.addEventListener("click", () => {
  const isLightTheme = document.body.classList.toggle("light-theme"); // Toggle the "light-theme" class
  localStorage.setItem("themeColor", isLightTheme ? "light-mode" : "dark-mode"); // Save the theme preference in localStorage
  themeToggleBtn.textContent = isLightTheme ? "dark_mode" : "light_mode"; // Change the button text
});

// Check the theme preference from localStorage and apply it
const isLightTheme = localStorage.getItem("themeColor") === "light-mode"; // Get the theme preference
document.body.classList.toggle("light-theme", isLightTheme); // Apply the theme

themeToggleBtn.textContent = isLightTheme ? "dark_mode" : "light_mode"; // Set the button text accordingly

// Event listener to handle form submission
promptForm.addEventListener("submit", handleFormSubmit);

// Event listener to trigger the file input when the add file button is clicked
promptForm
  .querySelector("#add-file-btn")
  .addEventListener("click", () => fileInput.click());
