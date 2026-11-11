const navigation = document.querySelector(".toc");
const chapters = Array.from(navigation.querySelectorAll('a[href^="#"]'), link => ({
  link,
  section: document.getElementById(link.hash.slice(1))
}));

const chapterGap = 16;
let activeLink;
let updatePending = false;

function updateCurrentSection() {
  updatePending = false;
  const readingLine = navigation.getBoundingClientRect().bottom + chapterGap + 1;
  const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  let current = atPageEnd ? chapters.at(-1).link : undefined;

  if (!atPageEnd) {
    for (const { link, section } of chapters) {
      if (section.getBoundingClientRect().top > readingLine) break;
      current = link;
    }
  }

  if (current === activeLink) return;
  activeLink?.removeAttribute("aria-current");
  current?.setAttribute("aria-current", "location");
  activeLink = current;
}

function scheduleUpdate() {
  if (updatePending) return;
  updatePending = true;
  window.requestAnimationFrame(updateCurrentSection);
}

function measureNavigation() {
  const height = navigation.getBoundingClientRect().height;
  document.documentElement.style.setProperty("--guide-anchor-offset", (height + chapterGap) + "px");
  scheduleUpdate();
}

window.addEventListener("scroll", scheduleUpdate, { passive: true });
window.addEventListener("hashchange", scheduleUpdate);
window.addEventListener("resize", measureNavigation);
new ResizeObserver(measureNavigation).observe(navigation);
measureNavigation();
