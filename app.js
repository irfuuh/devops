const KEY = "notices";

function getNotices() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

function saveNotices(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

function addNotice() {
  const title = document.getElementById("title").value;
  const body  = document.getElementById("body").value;

  if (!title || !body) {
    showToast("⚠️ Fill all fields");
    return;
  }

  const notices = getNotices();

  notices.unshift({
    id: Date.now(),
    title,
    body,
    date: new Date().toLocaleString()
  });

  saveNotices(notices);

  document.getElementById("title").value = "";
  document.getElementById("body").value  = "";

  showToast("✅ Notice Added!");
  displayNotices();
}

function deleteNotice(id) {
  let notices = getNotices();
  notices = notices.filter(n => n.id !== id);
  saveNotices(notices);
  showToast("🗑️ Deleted");
  displayNotices();
}

function displayNotices() {
  const board = document.getElementById("board");
  const notices = getNotices();

  if (!notices.length) {
    board.innerHTML = `<p class="empty">📭 No notices yet</p>`;
    return;
  }

  board.innerHTML = notices.map(n => `
    <div class="card">
      <h3>${n.title}</h3>
      <p>${n.body}</p>
      <small>📅 ${n.date}</small>
      <button onclick="deleteNotice(${n.id})">Delete</button>
    </div>
  `).join("");
}

/* Toast Message */
function showToast(msg) {
  const t = document.createElement("div");
  t.innerText = msg;
  t.style.position = "fixed";
  t.style.bottom = "20px";
  t.style.right = "20px";
  t.style.background = "#333";
  t.style.color = "#fff";
  t.style.padding = "10px 15px";
  t.style.borderRadius = "8px";
  t.style.opacity = "0.9";
  document.body.appendChild(t);

  setTimeout(() => t.remove(), 2000);
}

/* Enter key support */
document.addEventListener("keydown", e => {
  if (e.key === "Enter") addNotice();
});

displayNotices();
