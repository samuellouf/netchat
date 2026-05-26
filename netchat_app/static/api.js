const API = {
  server: window.location.hostname,
  port: window.location.port,
  user: {
    exists: (username) => fetch(`http://${API.server}:${API.port}/user/${username}`).then((r) => r.json()),
    create: (username, password) => fetch(`http://${API.server}:${API.port}/user/${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      }).then((r) => r.json()),
    delete: (username, password) => fetch(`http://${API.server}:${API.port}/user/${username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      }).then((r) => r.json()),
    password: {
      check: (username, password) => fetch(`http://${API.server}:${API.port}/user/password/${username}?password=${password}`),
      edit: (username, old_password, new_password) => fetch(`http://${API.server}:${API.port}/user/password/${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ old_password, new_password })
      }).then((r) => r.json()),
    }
  },
  message: {
    send: (username, message) => fetch(`http://${API.server}:${API.port}/msg/sendText`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "message": message, "username": username, "timestamp": Date.now() })
      }).then((r) => r.json()),
    sentSince: (timestamp) => fetch(`http://${API.server}:${API.port}/msg/getTextsSentSince/${timestamp}`).then((r) => r.json())
  },
  getIP : () => fetch(`http://${API.server}:${API.port}/getIP/`).then((r) => r.text()),
  getVersion : () => fetch(`http://${API.server}:${API.port}/getVersion/`).then((r) => r.text()),
  isLive: async () => {
    try {
      await fetch(`http://${API.server}:${API.port}/isLive/`);
    } catch (error){
      return false;
    }
    return true
  }
}
