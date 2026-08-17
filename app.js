document.addEventListener("DOMContentLoaded", () => {

  const pages = ["home", "learn", "practice", "progress", "profile"];

  const titles = {
    home: "Good morning, Trader 👋",
    learn: "Trading Academy",
    practice: "Practice Mode",
    progress: "Your Progress",
    profile: "Your Profile"
  };

  const courses = {
    "Technical Analysis": {
      level: "BEGINNER → INTERMEDIATE",
      icon: "◒",
      progress: 68,
      duration: "18 lessons · 4h 20m",
      description:
        "Learn charts, trends, support and resistance and build a structured technical-analysis process.",
      lessons: [
        "Reading Candlesticks",
        "Market Structure",
        "Support & Resistance",
        "Trendlines",
        "Moving Averages",
        "Volume Basics",
        "Chart Patterns",
        "Technical Confluence"
      ]
    },

    "Technical Analysis Masterclass": {
      level: "BEGINNER → INTERMEDIATE",
      icon: "◒",
      progress: 68,
      duration: "18 lessons · 4h 20m",
      description:
        "Learn charts, trends, support and resistance and build a structured technical-analysis process.",
      lessons: [
        "Reading Candlesticks",
        "Market Structure",
        "Support & Resistance",
        "Trendlines",
        "Moving Averages",
        "Volume Basics",
        "Chart Patterns",
        "Technical Confluence"
      ]
    },

    "Risk Management": {
      level: "BEGINNER",
      icon: "◈",
      progress: 42,
      duration: "8 lessons · 1h 35m",
      description:
        "Learn position sizing, stop loss, risk/reward and disciplined trade planning.",
      lessons: [
        "Why Risk Comes First",
        "Position Sizing",
        "Stop Loss",
        "Risk / Reward",
        "Maximum Daily Risk",
        "Trade Planning"
      ]
    },

    "Trading Psychology": {
      level: "ALL LEVELS",
      icon: "◎",
      progress: 15,
      duration: "10 lessons · 1h 55m",
      description:
        "Build discipline, patience and emotional control for consistent decision making.",
      lessons: [
        "Trading Mindset",
        "Fear & Greed",
        "FOMO",
        "Revenge Trading",
        "Patience",
        "Building Discipline"
      ]
    },

    "Market Fundamentals": {
      level: "INTERMEDIATE",
      icon: "◫",
      progress: 0,
      duration: "14 lessons · 3h 05m",
      description:
        "Understand economic news, market drivers and the fundamental context behind markets.",
      lessons: [
        "Economic Calendar",
        "Interest Rates",
        "Inflation",
        "Employment Data",
        "Market Sentiment",
        "News Risk"
      ]
    }
  };

  let currentCourse = null;
  let currentLesson = 0;
  let virtualBalance = 10000;
  let demoTrades = 47;


  /* =========================
     PAGE NAVIGATION
  ========================= */

  function showPage(name, updateUrl = true) {

    if (!pages.includes(name)) {
      name = "home";
    }

    pages.forEach(page => {

      const section = document.getElementById("page-" + page);

      if (section) {
        section.classList.toggle(
          "active",
          page === name
        );
      }

    });

    document.querySelectorAll("[data-page]").forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.page === name
      );

    });

    const title = document.getElementById("pageTitle");

    if (title) {
      title.textContent = titles[name];
    }

    if (updateUrl) {
      history.pushState(
        { page: name },
        "",
        "#" + name
      );
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }


  /* =========================
     MAIN NAVIGATION
  ========================= */

  document.addEventListener("click", event => {

    const nav = event.target.closest("[data-page]");

    if (nav) {

      event.preventDefault();

      showPage(nav.dataset.page);

      return;
    }


    /* HOME → LEARN */

    const continueButton =
      event.target.closest(".primary");

    if (
      continueButton &&
      continueButton.textContent
        .toLowerCase()
        .includes("continue learning")
    ) {

      showPage("learn");

      return;
    }


    /* VIEW ALL */

    const textButton =
      event.target.closest(".text-btn");

    if (
      textButton &&
      textButton.textContent
        .toLowerCase()
        .includes("view all")
    ) {

      showPage("learn");

      return;
    }


    /* COURSE CARD */

    const card =
      event.target.closest(".course-card");

    if (card) {

      const heading =
        card.querySelector("h3");

      if (heading) {

        const name =
          heading.textContent.trim();

        if (courses[name]) {

          openCourse(name);

          return;
        }
      }
    }


    /* OPEN COURSE BUTTON */

    const secondary =
      event.target.closest(".secondary");

    if (
      secondary &&
      secondary.textContent
        .toLowerCase()
        .includes("course")
    ) {

      const card =
        secondary.closest(".course-card");

      if (card) {

        const heading =
          card.querySelector("h3");

        if (heading) {

          const name =
            heading.textContent.trim();

          if (courses[name]) {

            openCourse(name);

            return;
          }
        }
      }
    }


    /* LESSON */

    const lessonButton =
      event.target.closest("[data-lesson]");

    if (lessonButton) {

      currentLesson =
        Number(lessonButton.dataset.lesson);

      openLesson();

      return;
    }


    /* BACK TO COURSE */

    if (
      event.target.closest("[data-course-back]")
    ) {

      openCourse(currentCourse);

      return;
    }


    /* BACK TO ACADEMY */

    if (
      event.target.closest("[data-academy-back]")
    ) {

      restoreLearn();

      showPage("learn");

      return;
    }


    /* NEXT LESSON */

    if (
      event.target.closest("[data-next]")
    ) {

      currentLesson++;

      openLesson();

      return;
    }


    /* PREVIOUS LESSON */

    if (
      event.target.closest("[data-prev]")
    ) {

      currentLesson--;

      if (currentLesson < 0) {
        currentLesson = 0;
      }

      openLesson();

      return;
    }


    /* QUIZ */

    if (
      event.target.closest("[data-quiz]")
    ) {

      openQuiz();

      return;
    }


    /* QUIZ ANSWER */

    const answer =
      event.target.closest("[data-answer]");

    if (answer) {

      checkAnswer(answer);

      return;
    }


    /* BUY DEMO */

    if (
      event.target.closest(".buy")
    ) {

      executeDemoTrade("BUY");

      return;
    }


    /* SELL DEMO */

    if (
      event.target.closest(".sell")
    ) {

      executeDemoTrade("SELL");

      return;
    }


    /* PROFILE SETTINGS */

    const setting =
      event.target.closest(".settings-list button");

    if (setting) {

      const text =
        setting.textContent.toLowerCase();

      if (text.includes("my courses")) {
        showPage("learn");
        return;
      }

      if (text.includes("trading journal")) {
        showJournal();
        return;
      }

      if (text.includes("notifications")) {
        showMessage(
          "Notifications",
          "Your TradeNova learning notifications are enabled."
        );
        return;
      }

      if (text.includes("settings")) {
        showMessage(
          "Settings",
          "Profile and learning settings will be available here."
        );
        return;
      }

      if (text.includes("help")) {
        showMessage(
          "Help & Support",
          "TradeNova support interface is ready for future connection."
        );
      }
    }

  });


  /* =========================
     LEARN PAGE
  ========================= */

  const learnPage =
    document.getElementById("page-learn");

  const originalLearn =
    learnPage
      ? learnPage.innerHTML
      : "";


  function restoreLearn() {

    if (learnPage) {
      learnPage.innerHTML =
        originalLearn;
    }

  }


  function openCourse(name) {

    const course =
      courses[name];

    if (!course) {
      return;
    }

    currentCourse = name;

    currentLesson = 0;

    learnPage.innerHTML = `

      <div class="page-banner">

        <button
          class="text-btn"
          data-academy-back
        >
          ← Back to Academy
        </button>

        <br><br>

        <span class="pill">
          ${course.level}
        </span>

        <h2>
          ${course.icon}
          ${name}
        </h2>

        <p>
          ${course.description}
        </p>

      </div>


      <div class="stats-grid">

        <div class="stat-card">
          <small>Course Progress</small>
          <strong>${course.progress}%</strong>

          <div class="progress">
            <i style="width:${course.progress}%"></i>
          </div>
        </div>

        <div class="stat-card">
          <small>Course Length</small>
          <strong>${course.lessons.length}</strong>
          <span class="stat-meta">
            lessons
          </span>
        </div>

        <div class="stat-card">
          <small>Estimated Time</small>
          <strong>${course.duration.split("·")[1] || "Self paced"}</strong>
        </div>

      </div>


      <div class="section-head">

        <div>
          <h3>
            Course Curriculum
          </h3>

          <p>
            Complete each lesson in order.
          </p>
        </div>

      </div>


      <div class="course-grid">

        ${course.lessons.map((lesson, index) => `

          <article
            class="course-card"
            data-lesson="${index}"
            style="cursor:pointer"
          >

            <div class="course-icon">
              ${index + 1}
            </div>

            <span class="level">
              LESSON ${index + 1}
            </span>

            <h3>
              ${lesson}
            </h3>

            <p>
              Learn the concept and test your understanding.
            </p>

            <div class="card-bottom">

              <span>
                ${index < Math.ceil(course.progress / 100 * course.lessons.length)
                  ? "Completed"
                  : "15 min lesson"}
              </span>

              <b>
                →
              </b>

            </div>

          </article>

        `).join("")}

      </div>

    `;

    showPage("learn");

  }


  /* =========================
     LESSON INTERFACE
  ========================= */

  function openLesson() {

    const course =
      courses[currentCourse];

    if (!course) {
      return;
    }

    const lesson =
      course.lessons[currentLesson];

    const total =
      course.lessons.length;

    learnPage.innerHTML = `

      <div class="page-banner">

        <button
          class="text-btn"
          data-course-back
        >
          ← ${currentCourse}
        </button>

        <br><br>

        <span class="pill">
          LESSON ${currentLesson + 1} OF ${total}
        </span>

        <h2>
          ${lesson}
        </h2>

        <p>
          Build this concept into your trading process.
        </p>

      </div>


      <article class="course-card">

        <span class="level">
          CORE CONCEPT
        </span>

        <h3>
          What you will learn
        </h3>

        <p>
          ${lesson} is an important part of becoming a
          disciplined trader. Understand the concept before
          attempting to use it in demo practice.
        </p>

        <br>

        <h3>
          Key points
        </h3>

        <p>
          • Understand the concept clearly.<br>
          • Identify it on a chart.<br>
          • Know when the idea is invalid.<br>
          • Combine the idea with proper risk management.
        </p>

        <br>

        <div class="demo-warning">
          ⓘ
          <strong>Education first:</strong>
          This lesson is for educational purposes and
          does not guarantee trading results.
        </div>

      </article>


      <div class="trade-actions">

        <button
          class="secondary"
          data-prev
          ${currentLesson === 0 ? "disabled" : ""}
        >
          ← Previous
        </button>

        <button
          class="primary"
          data-quiz
        >
          Quick Quiz →
        </button>

        ${
          currentLesson < total - 1
          ? `
            <button
              class="primary"
              data-next
            >
              Next Lesson →
            </button>
          `
          : `
            <button
              class="primary"
              data-academy-back
            >
              Complete Course ✓
            </button>
          `
        }

      </div>

    `;

    showPage("learn");

  }


  /* =========================
     QUIZ INTERFACE
  ========================= */

  function openQuiz() {

    const course =
      courses[currentCourse];

    const lesson =
      course.lessons[currentLesson];

    learnPage.innerHTML = `

      <div class="page-banner">

        <button
          class="text-btn"
          data-course-back
        >
          ← Back to Course
        </button>

        <br><br>

        <span class="pill">
          KNOWLEDGE CHECK
        </span>

        <h2>
          ${lesson}
        </h2>

        <p>
          Test what you just learned.
        </p>

      </div>


      <article class="course-card">

        <h3>
          What should a trader do before
          applying a new strategy?
        </h3>

        <br>

        <button
          class="secondary quiz-option"
          data-answer="wrong"
        >
          Increase position size immediately.
        </button>

        <br><br>

        <button
          class="secondary quiz-option"
          data-answer="correct"
        >
          Test it with virtual funds and define risk first.
        </button>

        <br><br>

        <button
          class="secondary quiz-option"
          data-answer="wrong"
        >
          Ignore risk controls until it becomes profitable.
        </button>

        <div
          id="quiz-result"
          style="margin-top:20px"
        ></div>

      </article>

    `;

    showPage("learn");

  }


  function checkAnswer(button) {

    const result =
      document.getElementById("quiz-result");

    if (!result) {
      return;
    }

    document
      .querySelectorAll(".quiz-option")
      .forEach(option => {
        option.disabled = true;
      });

    if (
      button.dataset.answer === "correct"
    ) {

      result.innerHTML = `
        <div class="demo-warning">
          ✓ <strong>Correct!</strong>
          Great job. You understand the core principle.
          <br><br>
          <button
            class="primary"
            data-next
          >
            Continue → 
          </button>
        </div>
      `;

    } else {

      result.innerHTML = `
        <div class="demo-warning">
          ✕ <strong>Not quite.</strong>
          Risk should always be defined before increasing exposure.
          <br><br>
          <button
            class="secondary"
            data-course-back
          >
            Review Lesson
          </button>
        </div>
      `;

    }

  }


  /* =========================
     DEMO PRACTICE
  ========================= */
function executeDemoTrade(side) {

  const price = 67250.50;

  const quantityInput =
    document.querySelector("#positionSize");

  const quantity =
    quantityInput
      ? Number(quantityInput.value) || 0.01
      : 0.01;

  const stopInput =
    document.querySelector("#stopLoss");

  const takeInput =
    document.querySelector("#takeProfit");

  const stopLoss =
    stopInput
      ? Number(stopInput.value) || 0
      : 0;

  const takeProfit =
    takeInput
      ? Number(takeInput.value) || 0
      : 0;

  const positionValue =
    price * quantity;

  const risk =
    stopLoss > 0
      ? Math.abs(price - stopLoss) * quantity
      : 0;

  const reward =
    takeProfit > 0
      ? Math.abs(takeProfit - price) * quantity
      : 0;

  demoTrades++;

  const trade = {
    id: Date.now(),
    side: side,
    asset: "BTC/USD",
    price: price,
    quantity: quantity,
    stopLoss: stopLoss,
    takeProfit: takeProfit,
    value: positionValue,
    risk: risk,
    reward: reward,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
  };

  virtualBalance -=
    side === "BUY"
      ? 0
      : 0;

  const balance =
    document.querySelector(
      "#page-practice .balance strong"
    );

  if (balance) {

    balance.textContent =
      "$" +
      virtualBalance.toLocaleString(
        "en-US",
        {
          minimumFractionDigits: 2
        }
      );

  }

  const warning =
    document.querySelector(
      "#page-practice .demo-warning"
    );

  if (warning) {

    warning.innerHTML = `
      ✓ <strong>${side} DEMO ORDER EXECUTED</strong><br>
      BTC/USD · ${quantity} BTC @ $${price.toLocaleString()}<br>
      <small>
        Risk: $${risk.toFixed(2)}
        · Target: $${reward.toFixed(2)}
      </small>
      <br><br>
      <span>
        Virtual funds only — no real money was used.
      </span>
    `;

  }

  const history =
    document.querySelector(
      "#page-practice .trade-history"
    );

  if (history) {

    const row =
      document.createElement("div");

    row.className =
      "trade-history-row";

    row.innerHTML = `
      <strong>${side}</strong>
      <span>BTC/USD</span>
      <span>${quantity} BTC</span>
      <span>$${price.toLocaleString()}</span>
      <span>${trade.time}</span>
    `;

    history.prepend(row);

  }

}
  

    demoTrades++;

    const change =
      side === "BUY"
        ? 125
        : -80;

    virtualBalance += change;

    const balance =
      document.querySelector(
        "#page-practice .balance strong"
      );

    if (balance) {

      balance.textContent =
        "$" +
        virtualBalance.toLocaleString(
          "en-US",
          {
            minimumFractionDigits: 2
          }
        );

    }

    const trades =
      document.querySelector(
        "#page-practice .stats-grid .stat-card:first-child strong"
      );

    if (trades) {
      trades.textContent = "1";
    }

    const warning =
      document.querySelector(
        "#page-practice .demo-warning"
      );

    if (warning) {

      warning.innerHTML = `
        ✓ <strong>${side} DEMO order recorded.</strong>
        Virtual funds only. No real money was used.
      `;

    }

  }


  /* =========================
     PROFILE / JOURNAL
  ========================= */

  function showJournal() {

    const profile =
      document.getElementById("page-profile");

    profile.innerHTML = `

      <div class="page-banner">

        <button
          class="text-btn"
          data-page="profile"
        >
          ← Profile
        </button>

        <br><br>

        <span class="pill">
          TRADING JOURNAL
        </span>

        <h2>
          Your Demo Journal
        </h2>

        <p>
          Record what you learned from each practice session.
        </p>

      </div>


      <article class="course-card">

        <h3>
          Today's reflection
        </h3>

        <p>
          What did you learn from today's practice?
        </p>

        <textarea
          placeholder="Write your trading notes here..."
          style="
            width:100%;
            min-height:160px;
            margin-top:15px;
            padding:15px;
            border-radius:12px;
            background:rgba(255,255,255,.04);
            color:inherit;
            border:1px solid rgba(255,255,255,.1);
            font:inherit;
          "
        ></textarea>

        <br><br>

        <button
          class="primary"
          onclick="alert('Journal note saved for this session.')"
        >
          Save Journal Entry
        </button>

      </article>

    `;

    showPage("profile");

  }


  /* =========================
     MESSAGE
  ========================= */

  function showMessage(title, message) {

    const old =
      document.querySelector(".tn-modal");

    if (old) {
      old.remove();
    }

    const modal =
      document.createElement("div");

    modal.className =
      "tn-modal";

    modal.innerHTML = `

      <div
        style="
          position:fixed;
          inset:0;
          background:rgba(0,0,0,.7);
          display:flex;
          align-items:center;
          justify-content:center;
          padding:20px;
          z-index:9999;
        "
      >

        <div
          class="course-card"
          style="max-width:420px;width:100%"
        >

          <span class="pill">
            TRADENOVA
          </span>

          <h2>
            ${title}
          </h2>

          <p>
            ${message}
          </p>

          <br>

          <button
            class="primary"
            onclick="this.closest('.tn-modal').remove()"
          >
            Got it
          </button>

        </div>

      </div>

    `;

    document.body.appendChild(modal);

  }


/* =========================
   REAL BACK / FORWARD NAVIGATION
========================= */

window.addEventListener("popstate", () => {

  const page =
    location.hash.replace("#", "") || "home";

  showPage(page, false);

});


  /* =========================
     INITIAL LOAD
  ========================= */

  const initialPage =
    location.hash
      .replace("#", "") ||
    "home";

  showPage(
    initialPage,
    false
  );

});
