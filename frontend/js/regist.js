const registInputContainer = document.querySelector("#regist-input-container");
const listRegistInput = registInputContainer.children;
for (let i = 0; i < listRegistInput.length; i++) {
  const element = listRegistInput[i];
  if (i != 0) element.toggleAttribute("hidden");
  element.firstElementChild.setAttribute(
    "style",
    "font-size: 32px; text-align: center; margin-bottom: 16px;"
  );
  element.lastElementChild.setAttribute(
    "style",
    "font-size: 24px; padding: 16px 20px; margin-bottom: 12px;"
  );
}

let currentIndex = 0;
const registBtnPrev = document.querySelector("#regist-btn-prev");
const registBtnNext = document.querySelector("#regist-btn-next");
const registBtnSubmit = document.querySelector("#regist-btn-submit");
const showCurrentIndex = document.querySelector("#show-current-index");
const showTotalIndex = document.querySelector("#show-total-index");
const toHide = () => {
  if (currentIndex === 0) {
    registBtnPrev.setAttribute("disabled", true);
    registBtnPrev.setAttribute("style", "background-color: #fff;");
  } else {
    registBtnPrev.removeAttribute("disabled");
    registBtnPrev.setAttribute("style", "background-color: #888;");
  }

  if (currentIndex == listRegistInput.length - 1) {
    registBtnNext.setAttribute("hidden", true);
    registBtnSubmit.removeAttribute("hidden");
  } else {
    registBtnNext.removeAttribute("hidden");
    registBtnSubmit.setAttribute("hidden", true);
  }
};
const toPrev = () => {
  listRegistInput[currentIndex].toggleAttribute("hidden");
  listRegistInput[currentIndex - 1].toggleAttribute("hidden");
  currentIndex--;
  showCurrentIndex.innerHTML = currentIndex + 1;
  toHide();
};
const toNext = () => {
  if (listRegistInput[currentIndex].lastElementChild.value) {
    listRegistInput[currentIndex].toggleAttribute("hidden");
    listRegistInput[currentIndex + 1].toggleAttribute("hidden");
    currentIndex++;
    showCurrentIndex.innerHTML = currentIndex + 1;
    toHide();
  }
};
toHide();
registBtnPrev.addEventListener("click", toPrev);
registBtnNext.addEventListener("click", toNext);
showTotalIndex.innerHTML = listRegistInput.length;
