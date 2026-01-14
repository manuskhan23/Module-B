const input = document.getElementById("input");
const resultDiv = document.getElementById("p");
const avatarImg = document.getElementById("img");

// Arrow function version
const search = async () => {
  const username = input.value.trim();
  if (!username) return;

  resultDiv.innerHTML = `<div class="loader">Loading GitHub user…</div>`;

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error("User not found");

    const data = await res.json();

    // avatar stays the same element
    avatarImg.src = data.avatar_url;

    renderEverything(data);
  } catch (err) {
    resultDiv.innerHTML = `<div class="error">${err.message}</div>`;
  }
};

// Arrow function for rendering
const renderEverything = (data) => {
  let html = `<div class="user-card scale-in">`;

  // header
  html += `
    <div class="user-header">
      <h3 class="username">${data.login}</h3>
      <p class="bio">${data.bio || "No bio provided"}</p>
    </div>
  `;

  // stats
  html += `
    <div class="stats">
      <div>
        <strong>${data.followers ?? 0}</strong>
        <span>Followers</span>
      </div>
      <div>
        <strong>${data.following ?? 0}</strong>
        <span>Following</span>
      </div>
      <div>
        <strong>${data.public_repos ?? 0}</strong>
        <span>Repos</span>
      </div>
    </div>
  `;

  // all other details
  html += `<div class="details">`;
  Object.entries(data).forEach(([key, value]) => {
    if (["avatar_url", "login", "followers", "following", "public_repos"].includes(key)) return;

    if (!value) value = "Not provided";
    if (typeof value === "boolean") value = value ? "true" : "false";
    if (key.includes("created") || key.includes("updated")) value = new Date(value).toLocaleString();
    if (typeof value === "string" && value.startsWith("http")) value = `<a href="${value}" target="_blank">Link</a>`;

    html += `<p><strong>${key}:</strong> ${value}</p>`;
  });
  html += `</div>`; // details

  html += `</div>`; // card

  resultDiv.innerHTML = html;
};
// Trigger search on Enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    search();
  }
});
