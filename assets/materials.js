const controls = document.querySelector(".material-controls");
const editButton = controls.querySelector("[data-edit]");
const status = document.querySelector("[data-status]");
const editableFields = document.querySelectorAll("[data-copy]");
const copy = document.documentElement.lang === "mn"
  ? {
      edit: "Бичвэр засах",
      done: "Засаж дуусгах",
      editing: "Хүрээтэй бичвэрийг сонгож засна уу. Өөрчлөлтөө хадгалахын тулд хэвлэх эсвэл PDF болгож авна.",
      edited: "Өөрчлөлт энэ цонхонд байна. Хадгалах бол хэвлэх эсвэл PDF болгож авна."
    }
  : {
      edit: "Edit copy",
      done: "Done editing",
      editing: "Select outlined text to edit it. Print or save a PDF to keep your changes.",
      edited: "Changes are in this tab. Print or save a PDF to keep them."
    };

controls.hidden = false;

editButton.addEventListener("click", () => {
  const editing = editButton.getAttribute("aria-pressed") !== "true";
  for (const field of editableFields) {
    if (editing) field.setAttribute("contenteditable", "plaintext-only");
    else field.removeAttribute("contenteditable");
  }
  editButton.setAttribute("aria-pressed", String(editing));
  editButton.textContent = editing ? copy.done : copy.edit;
  status.textContent = editing ? copy.editing : copy.edited;
});

controls.querySelector("[data-print]").addEventListener("click", () => window.print());
