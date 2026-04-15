function openTab(tab) {
  document.querySelectorAll(".tab").forEach(t => t.style.display = "none");
  document.getElementById(tab).style.display = "block";
}

async function send() {
  const msg = document.getElementById("msg").value;

  const res = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ message: msg })
  });

  const data = await res.json();

  document.getElementById("output").innerHTML +=
    "<p><b>Tu:</b> " + msg + "</p>" +
    "<p><b>Bot:</b> " + data.reply + "</p>";
}

async function searchGif() {
  const q = document.getElementById("gifSearch").value;

  const res = await fetch("http://localhost:3000/gif?q=" + q);
  const data = await res.json();

  document.getElementById("gifResult").innerHTML =
    `<img src="${data.url}" width="200">`;
}
