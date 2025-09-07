// Tab switching
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const createForm = document.getElementById("createRoomForm");
  const joinForm = document.getElementById("joinRoomForm");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const target = btn.dataset.target;
      if (target === "createRoomForm") {
        createForm.style.display = "block";
        joinForm.style.display = "none";
      } else {
        createForm.style.display = "none";
        joinForm.style.display = "block";
      }
    });
  });
});
