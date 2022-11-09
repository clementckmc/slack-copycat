const batch = 1017; // change to your own batch id
const baseUrl = "https://wagon-chat.herokuapp.com/";
const chatboard = document.querySelector(".conversations");
const refreshBtn = document.querySelector("#refresh");

// Your turn to code!
const getMessage = () => {
  fetch(`${baseUrl}${batch}/messages`)
    .then(response => response.json())
    .then((data) => {
      chatboard.innerHTML = "";
      data.messages.forEach((msg) => {
        const dateObj = new Date(msg.updated_at);
        // const diff = Date.now().valueOf() - dateObj.valueOf(); // time
        const msgItem = `<div class="message-container">
        <img src="images/user.png" alt="user">
        <div class="message">
        <div class="message-user">
        <strong>${msg.author}</strong>
        </div>
        <div class="message-content">
        ${msg.content}
        </div>
        </div>
        </div>
        `;
        chatboard.insertAdjacentHTML("beforeend", msgItem);
      });
    });
};

setInterval(getMessage, 5000);

// post messages
const sendBtn = document.querySelector("#submit");

sendBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const yourContent = document.querySelector("#your-message").value;
  // const yourName = document.querySelector("#your-name").value;
  const yourName = "username"
  const message = { author: yourName, content: yourContent };
  fetch(`${baseUrl}${batch}/messages`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector("#your-message").value = "";
      // document.querySelector("#your-name").value = "";
    });
});
