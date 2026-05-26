var lastTimestamp = 0;
const messages = document.querySelector("#messages");;
function logIntoChat(username){
  document.getElementById("account").classList.add("hidden");
  document.getElementById("chat").classList.remove("hidden");
  document.getElementById("entry").classList.remove("hidden");
  document.querySelector("header .signedin").style.display = "";
  document.querySelector("header .username").innerText = username;
  sessionStorage.setItem("username", username);
  window.stopRefreshingMessages = refreshMessages();
}

document.querySelector("#entry button").addEventListener("click", () => {
  var message = document.querySelector("#entry textarea").value;
  if (message == "") return
  API.message.send(sessionStorage.getItem("username"), message);
  document.querySelector("#entry textarea").value = "";
});

function clearMessages(){
  messages.innerHTML = "";
}

function addMessage(username, message){
  const message_div = document.createElement("div");
  const user = document.createElement("span");
  user.classList.add("user");
  message_div.appendChild(user);
  message_div.appendChild(document.createElement("br"));
  const message_span = document.createElement("span");
  message_span.classList.add("message");
  message_div.appendChild(message_span);

  if (sessionStorage.getItem("username") == username){
    message_div.setAttribute("me", "");
    user.innerText = "Moi";
  } else {
    message_div.setAttribute("other", "");
    user.innerText = username;
  }

  message_span.innerText = message;

  messages.appendChild(message_div);
}

async function loadMessagesSince(timestamp){
  var messages = await API.message.sentSince(timestamp);
  var new_message = false;
  for (var message of messages){
    if (message.timestamp > lastTimestamp){
      addMessage(message.username, message.message);
      new_message = true;
    }
    lastTimestamp = message.timestamp;
  }

  if (messages.length == 0 && lastTimestamp == 0){
    lastTimestamp = Date.now();
  }

  if (new_message){
    if (messages.scrollHeight - messages.scrollTop - messages.clientHeight > 100){
      scrolldownbtn.classList.remove("new");
    } else {
      scrolldownbtn.classList.add("new");
    }
  }
}

async function refreshMessages(){
  clearMessages()
  await loadMessagesSince(0);
  const loadMessages = () => {
    loadMessagesSince(lastTimestamp);
  }
  var id = setInterval(loadMessages, 500);
  return () => {
    clearInterval(id);
  }
}

const scrolldownbtn = document.getElementById("scrolldown");

scrolldownbtn.addEventListener("click", () => {
  messages.scrollTo(0, messages.scrollHeight);
  scrolldownbtn.classList.remove("new");
});

messages.addEventListener("scroll", () => {
  if (messages.scrollHeight - messages.scrollTop - messages.clientHeight > 100){
    scrolldownbtn.classList.remove("hidden");
  } else {
    scrolldownbtn.classList.add("hidden");
  }
});
