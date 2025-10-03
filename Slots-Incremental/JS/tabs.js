document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".tab-content");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;

      // Hide all content
      contents.forEach(c => c.style.display = "none");

      // Show the clicked one
      document.getElementById(tab).style.display = "block";
    });
  });

  // Show default tab
  document.getElementById("upgrades").style.display = "block";});