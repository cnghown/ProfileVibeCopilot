const DEBUG_MODE = true;

class Logger {
  constructor(moduleName = "App") {
    this.moduleName = moduleName;
    this.startTime = performance.now();
  }

  log(message, data = null) {
    if (DEBUG_MODE) {
      const timestamp = new Date().toLocaleTimeString();
      const style = "color: #00ff00; font-weight: bold;";
      console.log(
        `%c[${timestamp}] [${this.moduleName}] ✓ ${message}`,
        style,
        data || "",
      );
    }
  }

  warn(message, data = null) {
    const timestamp = new Date().toLocaleTimeString();
    const style = "color: #ffaa00; font-weight: bold;";
    console.warn(
      `%c[${timestamp}] [${this.moduleName}] ⚠ WARNING: ${message}`,
      style,
      data || "",
    );
  }

  error(message, data = null) {
    const timestamp = new Date().toLocaleTimeString();
    const style = "color: #ff0000; font-weight: bold;";
    console.error(
      `%c[${timestamp}] [${this.moduleName}] ✗ ERROR: ${message}`,
      style,
      data || "",
    );
  }

  info(message, data = null) {
    if (DEBUG_MODE) {
      const timestamp = new Date().toLocaleTimeString();
      const style = "color: #00aaff; font-weight: bold;";
      console.info(
        `%c[${timestamp}] [${this.moduleName}] ℹ ${message}`,
        style,
        data || "",
      );
    }
  }

  perf(label) {
    const elapsed = (performance.now() - this.startTime).toFixed(2);
    console.log(
      `%c⏱ [${label}] Execution time: ${elapsed}ms`,
      "color: #ff00ff; font-weight: bold;",
    );
  }

  table(data) {
    console.table(data);
  }
}

const logger = new Logger("UI");
function test(testName, callback) {
  try {
    callback();
    logger.log(`✓ Test PASSED: ${testName}`);
  } catch (error) {
    logger.error(`Test FAILED: ${testName}`, error.message);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}
function showTab(id) {
  const functionNames = {
    about: "about()",
    skills: "skills()",
    projects: "projects()",
    myjob: "myJob()",
    contact: "contact()",
  };

  logger.info(`Switching to tab: ${id}`);
  logger.log(`✓ Function called: ${functionNames[id] || id}`);

  try {
    assert(id, "Tab ID cannot be empty");

    document.querySelectorAll(".section").forEach((e) => {
      e.classList.remove("active");
    });
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    const section = document.getElementById(id);
    if (!section) {
      logger.warn(`Section with ID '${id}' not found`);
      return;
    }

    section.classList.add("active");
    event.target.classList.add("active");
    logger.log(`Tab '${id}' activated successfully`);

    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  } catch (error) {
    logger.error(`Failed to switch tab`, error);
  }
}

async function loadProjects() {
  logger.info("Starting project loading...");
  const startTime = performance.now();

  const username = "cnghown";
  const list = document.getElementById("projectList");

  if (!list) {
    logger.error("Project list container not found in DOM");
    return;
  }

  logger.info(`Fetching projects for username: ${username}`);

  try {
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`;
    logger.log(`Calling API: ${apiUrl}`);

    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error(`API responded with status ${res.status}`);
    }

    const data = await res.json();
    logger.info(`API Response received`, { statusCode: res.status });

    if (data.message === "Not Found") {
      logger.warn(`GitHub user '${username}' not found`);
      list.innerHTML = `
        <div class="code-block">
          <div class="code-header">
            <div class="dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <span class="filename">error.ts</span>
          </div>
          <pre><code class="language-typescript">// User not found. Please update the username in script.js</code></pre>
        </div>
      `;
      return;
    }

    logger.info(`Successfully fetched ${data.length} repositories`);
    logger.table(
      data.slice(0, 6).map((r) => ({
        name: r.name,
        stars: r.stargazers_count,
        language: r.language,
      })),
    );

    data.slice(0, 6).forEach((repo, index) => {
      const div = document.createElement("div");
      div.className = "code-block";
      const description = repo.description || "No description available";
      const language = repo.language || "JavaScript";
      const stars = repo.stargazers_count;

      logger.log(`Rendering project [${index + 1}]: ${repo.name}`);

      div.innerHTML = `
        <div class="code-header">
          <div class="dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <span class="filename">${repo.name}</span>
        </div>
        <pre><code class="language-plaintext">
📦 ${repo.name}
📝 ${description}
⭐ Stars: ${stars}
📌 Language: ${language}
🔗 ${repo.html_url}
        </code></pre>
      `;
      list.appendChild(div);
    });

    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });

    const elapsed = (performance.now() - startTime).toFixed(2);
    logger.log(`✓ Projects loaded successfully in ${elapsed}ms`);
  } catch (error) {
    logger.error("Failed to load projects from GitHub", error);

    list.innerHTML = `
      <div class="code-block">
        <div class="code-header">
          <div class="dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <span class="filename">error.ts</span>
        </div>
        <pre><code class="language-typescript">// Error: ${error.message}</code></pre>
      </div>
    `;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  logger.log("====== PAGE INITIALIZATION START ======");
  try {
    const statusCode = document.querySelector(".status-code");
    const titleCode = document.querySelector(".title-code");
    const subtitleCode = document.querySelector(".subtitle-code");

    if (statusCode) {
      logger.log(`✓ User Status: ${statusCode.textContent.trim()}`);
    }
    if (titleCode) {
      logger.log(`✓ Profile Name: ${titleCode.textContent.trim()}`);
    }
    if (subtitleCode) {
      logger.log(`✓ Profile Info: ${subtitleCode.textContent.trim()}`);
    }

    loadProjects();
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
    const firstBtn = document.querySelector(".nav-btn");
    if (firstBtn) {
      firstBtn.classList.add("active");
      logger.log("Active nav button set");
    }
    createFallingPetals();
    logger.log("Falling petals effect initialized");
    initializeCursorTrail();
    logger.log("Cursor trail effect initialized");
    setTimeout(showMusicNotification, 2000);
    logger.log("====== PAGE INITIALIZATION COMPLETE ======\n");
  } catch (error) {
    logger.error("Failed during page initialization", error);
  }
});
function createFallingPetals() {
  const petalsContainer = document.querySelector(".petals-container");
  if (!petalsContainer) {
    logger.warn("Petals container not found in DOM");
    return;
  }
  const petals = ["🌸", "🌺", "🌼", "🌻", "🌷", "🌹"];
  let petalCount = 0;
  function createPetal() {
    try {
      const petal = document.createElement("div");
      petal.className = "petal";
      petal.textContent = petals[Math.floor(Math.random() * petals.length)];
      petal.style.left = Math.random() * window.innerWidth + "px";
      petal.style.animationDuration = Math.random() * 4 + 6 + "s";
      petalsContainer.appendChild(petal);
      petalCount++;

      setTimeout(() => {
        petal.remove();
        petalCount--;
      }, 10000);
    } catch (error) {
      logger.error("Error creating petal", error);
    }
  }

  const petalInterval = setInterval(() => {
    if (petalCount < 20) {
      createPetal();
    }
  }, 400);

  logger.log("Petal creation interval started", { interval: 400 });
  window.addEventListener("beforeunload", () => {
    clearInterval(petalInterval);
  });
}
function initializeCursorTrail() {
  try {
    const trail = document.querySelector(".cursor-trail");
    if (!trail) {
      logger.warn("Cursor trail element not found");
      return;
    }

    let x = 0,
      y = 0;
    let mouseX = 0,
      mouseY = 0;
    let isMoving = false;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMoving = true;
      trail.style.display = "block";
    });

    document.addEventListener("mouseleave", () => {
      trail.style.display = "none";
      isMoving = false;
    });

    function animateTrail() {
      if (isMoving) {
        x += (mouseX - x) * 0.25;
        y += (mouseY - y) * 0.25;

        trail.style.left = x + "px";
        trail.style.top = y + "px";
      }

      requestAnimationFrame(animateTrail);
    }

    animateTrail();
    logger.log("Cursor trail animation started");
    document.addEventListener("click", (e) => {
      createClickParticles(e.clientX, e.clientY);
    });
  } catch (error) {
    logger.error("Error initializing cursor trail", error);
  }
}

function createClickParticles(x, y) {
  logger.info(`Click particles created at: (${x}, ${y})`);

  for (let i = 0; i < 6; i++) {
    try {
      const particle = document.createElement("div");
      particle.style.position = "fixed";
      particle.style.left = x + "px";
      particle.style.top = y + "px";
      particle.style.width = "6px";
      particle.style.height = "6px";
      particle.style.background = "var(--accent-purple)";
      particle.style.borderRadius = "50%";
      particle.style.pointerEvents = "none";
      particle.style.zIndex = "9999";
      particle.style.boxShadow = "0 0 8px var(--accent-purple)";

      document.body.appendChild(particle);

      const angle = (Math.PI * 2 * i) / 6;
      const velocity = 4;
      let px = x;
      let py = y;
      let vx = Math.cos(angle) * velocity;
      let vy = Math.sin(angle) * velocity;
      let life = 1;

      function animateParticle() {
        life -= 0.03;
        px += vx;
        py += vy;
        vy += 0.15;

        particle.style.left = px + "px";
        particle.style.top = py + "px";
        particle.style.opacity = life;

        if (life > 0) {
          requestAnimationFrame(animateParticle);
        } else {
          particle.remove();
        }
      }

      animateParticle();
    } catch (error) {
      logger.error("Error creating click particle", error);
    }
  }
}
function showMusicNotification() {
  try {
    const notif = document.getElementById("musicNotification");
    if (!notif) {
      logger.warn("Music notification element not found");
      return;
    }

    notif.classList.add("active");
    logger.log("Music notification displayed");
    setTimeout(() => {
      if (notif.classList.contains("active")) {
        notif.classList.remove("active");
        logger.log("Music notification auto-hidden");
      }
    }, 10000);
  } catch (error) {
    logger.error("Error showing music notification", error);
  }
}

function acceptMusic() {
  logger.log("User accepted music playback");
  const notif = document.getElementById("musicNotification");
  notif.classList.remove("active");
  playRandomMusic();
}

function rejectMusic() {
  logger.log("User rejected music playback");
  const notif = document.getElementById("musicNotification");
  notif.classList.remove("active");
}

function closeMusicPlayer() {
  logger.log("Music player closed");
  const player = document.getElementById("musicPlayer");
  player.classList.remove("active");
  const audio = document.getElementById("audioPlayer");
  audio.pause();
}
const musicTracks = [
  {
    url: "/assets/nhac/Cẩm Tú Cầu Remix - QTrung Remix  Chờ Người Từ Lúc Nắng Dần Buông Remix TikTok - Val Remix.mp3",
    title: "Cẩm Tú Cầu Remix - QTrung Remix",
  },
  {
    url: "/assets/nhac/KHÔNG BUÔNG  x NẮNG CÓ MANG EM VỀ REMIX - AM REMIX - EM CŨNG CÓ NỖI NIỀM CỦA RIÊNG MÌNH REMIX TIKTOK - DJ AM OFFICIAL.mp3",
    title: "KHÔNG BUÔNG x NẮNG CÓ MANG EM VỀ REMIX",
  },
  {
    url: "/assets/nhac/Người Đầu Tiên - Juky San  Em Xinh Say Hi - VilnowZ.mp3",
    title: "Người Đầu Tiên - Juky San",
  },
  {
    url: "/assets/nhac/Dangrangto - 'thế giới của anh' (Prod. DONAL, Lespace) [Official M_V] - Dangrangto.mp3",
    title: "Thế Giới Của Anh - Dangrangto",
  },
];

logger.log("Music tracks loaded", { count: musicTracks.length });

function toggleMusicPlayer() {
  try {
    const player = document.getElementById("musicPlayer");
    const isActive = player.classList.toggle("active");
    logger.log(`Music player toggled`, { isNowActive: isActive });
  } catch (error) {
    logger.error("Error toggling music player", error);
  }
}

function playMusic(url, title) {
  try {
    assert(url, "Music URL cannot be empty");
    assert(title, "Music title cannot be empty");

    const audio = document.getElementById("audioPlayer");
    const titleEl = document.getElementById("musicTitle");

    if (!audio || !titleEl) {
      throw new Error("Audio or title element not found");
    }

    audio.src = url;
    titleEl.textContent = "🎵 " + title;
    audio.play();

    logger.log("Playing music", { title, url: url.substring(0, 50) + "..." });
    audio.onended = function () {
      logger.log("Current track ended, loading next...");
      playRandomMusic();
    };
  } catch (error) {
    logger.error("Error playing music", error);
  }
}

function playRandomMusic() {
  try {
    const randomTrack =
      musicTracks[Math.floor(Math.random() * musicTracks.length)];
    logger.info("Random track selected", { title: randomTrack.title });
    playMusic(randomTrack.url, randomTrack.title);
  } catch (error) {
    logger.error("Error playing random music", error);
  }
}
window.addEventListener("load", () => {
  if (DEBUG_MODE) {
    console.log("%c🧪 RUNNING TESTS...", "color: #00ff00; font-size: 14px;");

    test("Logger system exists", () => {
      assert(logger !== undefined, "Logger should exist");
      assert(
        typeof logger.log === "function",
        "Logger.log should be a function",
      );
    });

    test("Tab switching function exists", () => {
      assert(typeof showTab === "function", "showTab should be a function");
    });

    test("Music functions exist", () => {
      assert(
        typeof playRandomMusic === "function",
        "playRandomMusic should be a function",
      );
      assert(musicTracks.length > 0, "Music tracks should not be empty");
    });

    console.log(
      "%c✓ ALL TESTS COMPLETED",
      "color: #00ff00; font-size: 14px; font-weight: bold;",
    );
    console.log(
      "%c💡 TIP: Set DEBUG_MODE = false to disable debug logging",
      "color: #ffaa00;",
    );
  }
});
