
const buttons = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

// show default tab first
document.getElementById("slot-machine").style.display = "flex";

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const tab = btn.dataset.tab;

    // Hide all content
    contents.forEach(c => c.style.display = "none");

    // Show the clicked one
    document.getElementById(tab).style.display = "flex";
  });
});
