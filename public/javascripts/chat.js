document.addEventListener("DOMContentLoaded", () => {
  const socket = io(); // connect to socket.io server

  const messagesContainer = document.getElementById("messages");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("messageInput");

  const CURRENT_USER = window.CURRENT_USER || "Guest";

  // Listen for messages from server
  socket.on("message", ({ user, text }) => {
    addMessage(user, text);
  });

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent page refresh

    const text = input.value.trim();
    if (!text) return;

    // Emit message to server
    socket.emit("chatMessage", { username: CURRENT_USER, message: text });

    input.value = "";
    input.focus();
  });

  // Add message to chat
  function addMessage(user, text) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", user === CURRENT_USER ? "user" : "other");

    // Message HTML
    msgDiv.innerHTML = `
      <span class="username">${user}</span>
      <span class="bubble">${text}</span>
    `;

    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
});
