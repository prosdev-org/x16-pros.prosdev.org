function startTypingLoop(element, words, typingSpeed, deletingSpeed, pauseMs) {
  if (!element || !Array.isArray(words) || words.length === 0) {
    return;
  }

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function step() {
    const word = words[wordIndex];
    element.textContent = word.slice(0, charIndex);

    if (!isDeleting) {
      charIndex += 1;
      if (charIndex > word.length) {
        isDeleting = true;
        setTimeout(step, pauseMs);
        return;
      }
      setTimeout(step, typingSpeed);
      return;
    }

    charIndex -= 1;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(step, deletingSpeed);
  }

  step();
}

function initTypingAnimations() {
  startTypingLoop(
    document.getElementById("typed"),
    ["free", "fast", "customizable", "lightweight", "easy to use", "multifunctional", "not demanding"],
    120,
    50,
    1000
  );

  startTypingLoop(
    document.getElementById("emuTyped"),
    ["QEMU", "Bosh", "VMware", "VirtualBox"],
    100,
    40,
    1200
  );
}

window.initTypingAnimations = initTypingAnimations;
