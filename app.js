const KEY = "notices";

// Load notices
function getNotices() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

// Save notices
function saveNotices(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

// Add notice
function addNotice() {
  const title = document.getElementById("title").value;
  const body  = document.getElementById("body").value;

  if (!title || !body) {
    alert("Enter title and message");
    return;
  }

  const notices = getNotices();

  notices.unshift({
    id: Date.now(),
    title,
    body
  });

  saveNotices(notices);

  document.getElementById("title").value = "";
  document.getElementById("body").value  = "";

  displayNotices();
}

// Delete notice
function deleteNotice(id) {
  let notices = getNotices();
  notices = notices.filter(n => n.id !== id);
  saveNotices(notices);
  displayNotices();
}

// Show notices
function displayNotices() {
  const board = document.getElementById("board");
  const notices = getNotices();

  board.innerHTML = notices.map(n => `
    <div class="card">
      <h3>${n.title}</h3>
      <p>${n.body}</p>
      <button onclick="deleteNotice(${n.id})">Delete</button>
    </div>
  `).join("");
}

// Load on start
displayNotices();
