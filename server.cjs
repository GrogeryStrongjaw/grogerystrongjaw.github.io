var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");

// src/mockData.ts
var mockWardData = {
  mutual: [
    {
      date: "Wednesday, Jul 8, 2026",
      activity: "Service Project: Garden Care",
      quorum: "Teachers",
      time: "7:00 PM",
      location: "Sister Benson's Home",
      details: "We will be helping weed, mow, and trim Sister Benson's yard. Please bring work gloves and rakes if you have them."
    },
    {
      date: "Wednesday, Jul 15, 2026",
      activity: "Ward Youth Volleyball & Pizza Social",
      quorum: "Combined",
      time: "7:00 PM",
      location: "Ward Gym",
      details: "Combined activity with Young Men and Young Women. Friendly tournament followed by custom wood-fired pizzas."
    },
    {
      date: "Wednesday, Jul 22, 2026",
      activity: "Summer Camp Prep & Knot Tying",
      quorum: "Teachers",
      time: "7:00 PM",
      location: "Primary Room",
      details: "Mastering the bowline, taut-line hitch, and square lashing in preparation for the upcoming high adventure."
    }
  ],
  bread: [
    {
      date: "Sunday, Jul 12, 2026",
      assigned: "John Miller",
      backup: "Sam Jenkins",
      status: "Completed"
    },
    {
      date: "Sunday, Jul 19, 2026",
      assigned: "Michael Brown",
      backup: "Ryan Davis",
      status: "Completed"
    },
    {
      date: "Sunday, Jul 26, 2026",
      assigned: "David Smith",
      backup: "Chris Evans",
      status: "Reminded"
    },
    {
      date: "Sunday, Aug 2, 2026",
      assigned: "William Johnson",
      backup: "Taylor Green",
      status: "Assigned"
    }
  ],
  lessons: [
    {
      date: "Sunday, Jul 12, 2026",
      topic: "Alma 32-35: Planting the Seed of Faith",
      teacher: "Brother Nelson",
      quorum: "Teachers",
      scripture: "Alma 32:28"
    },
    {
      date: "Sunday, Jul 19, 2026",
      topic: "Alma 36-38: The Joy of Repentance",
      teacher: "Brother Nelson",
      quorum: "Teachers",
      scripture: "Alma 36:18-20"
    }
  ],
  other: [
    "Ward Youth Camp starts July 28th! Make sure all registration fees are paid and permission slips turned in to Bishopric.",
    "Stake Youth Dance next Saturday, July 11th at 7:00 PM at the Stake Center. Semi-formal dress standards apply.",
    "Teachers: Please arrive by 8:45 AM on Sunday to assist with sacrament bread preparation.",
    "Youth Temple Day coming up on Saturday, August 15th. Sign-up sheet is on the bulletin board."
  ]
};

// src/utils.ts
function formatNormalizedDate(dateStr, options) {
  if (!dateStr) return "";
  const trimmed = dateStr.trim();
  if (/^[A-Za-z]+,\s+[A-Za-z]+\s+\d+,\s+\d{4}$/.test(trimmed)) {
    return trimmed;
  }
  try {
    const d = new Date(trimmed);
    if (!isNaN(d.getTime())) {
      const isoDateMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
      let targetDate = d;
      if (isoDateMatch) {
        const year = parseInt(isoDateMatch[1], 10);
        const month = parseInt(isoDateMatch[2], 10) - 1;
        const day = parseInt(isoDateMatch[3], 10);
        targetDate = new Date(year, month, day);
      }
      return targetDate.toLocaleDateString("en-US", options || {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    }
  } catch (e) {
  }
  return dateStr;
}
function formatNormalizedTime(timeVal) {
  if (!timeVal) return "7:00 PM";
  const timeStr = String(timeVal).trim();
  if (!timeStr) return "7:00 PM";
  if (/^\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)$/i.test(timeStr)) {
    return timeStr.toUpperCase();
  }
  console.log(timeStr);
  try {
    if (timeStr.includes("-") || timeStr.includes("T") || timeStr.includes(":")) {
      const d = new Date(timeStr);
      if (!isNaN(d.getTime())) {
        let hours = d.getHours();
        const minutes = String(d.getMinutes()).padStart(2, "0");
        let ampm = "AM";
        if (hours >= 12) {
          ampm = "PM";
          hours = hours % 12;
        } else {
          if (hours >= 1 && hours <= 8) {
            ampm = "PM";
          }
        }
        if (hours === 0) hours = 12;
        return `${hours}:${minutes} ${ampm}`;
      }
    }
  } catch (e) {
  }
  const isoMatch = timeStr.match(/T(\d{1,2}):(\d{2})/);
  if (isoMatch) {
    let hours = parseInt(isoMatch[1], 10);
    const minutes = isoMatch[2];
    let ampm = "AM";
    if (hours >= 12) {
      ampm = "PM";
      hours = hours % 12;
    } else {
      if (hours >= 1 && hours <= 8) {
        ampm = "PM";
      } else {
        ampm = "AM";
      }
    }
    if (hours === 0) hours = 12;
    return `${hours}:${minutes} ${ampm}`;
  }
  const hhmmMatch = timeStr.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (hhmmMatch) {
    let hours = parseInt(hhmmMatch[1], 10);
    const minutes = hhmmMatch[2];
    let ampm = "AM";
    if (hours >= 12) {
      ampm = "PM";
      hours = hours % 12;
    } else {
      if (hours >= 1 && hours <= 8) {
        ampm = "PM";
      }
    }
    if (hours === 0) hours = 12;
    return `${hours}:${minutes} ${ampm}`;
  }
  return timeStr;
}
function normalizeWardData(raw) {
  if (!raw || typeof raw !== "object") {
    return mockWardData;
  }
  const result = {
    mutual: [],
    bread: [],
    lessons: [],
    other: []
  };
  const mutualKey = Object.keys(raw).find(
    (k) => /mutual/i.test(k) || /activity/i.test(k) || /activities/i.test(k)
  );
  if (mutualKey && Array.isArray(raw[mutualKey])) {
    result.mutual = raw[mutualKey].map((item) => ({
      date: formatNormalizedDate(item.date || item.Date || item.time || "", { weekday: "long", month: "short", day: "numeric", year: "numeric" }),
      activity: item.activity || item.Activity || item.description || item.Description || "",
      quorum: (() => {
        const val = item.quorum !== void 0 ? item.quorum : item.Quorum !== void 0 ? item.Quorum : item.group !== void 0 ? item.group : item.Group !== void 0 ? item.Group : "Combined";
        return typeof val === "boolean" ? val ? "true" : "false" : String(val);
      })(),
      time: formatNormalizedTime(item.time || item.Time),
      location: item.location || item.Location || "Church",
      details: item.details || item.Details || item.notes || item.Notes || ""
    }));
  }
  const breadKey = Object.keys(raw).find(
    (k) => /bread/i.test(k) || /sacrament/i.test(k)
  );
  if (breadKey && Array.isArray(raw[breadKey])) {
    result.bread = raw[breadKey].map((item) => ({
      date: formatNormalizedDate(item.date || item.Date || "", { month: "short", day: "numeric", year: "numeric" }),
      assigned: item.assigned || item.Assigned || item.name || item.Name || "",
      backup: item.backup || item.Backup || item.assistant || item.Assistant || "",
      quorum: item.quorum || item.Quorum || "Teachers",
      status: item.status || item.Status || "Assigned"
    }));
  }
  const lessonKey = Object.keys(raw).find(
    (k) => /lesson/i.test(k) || /class/i.test(k) || /instruction/i.test(k)
  );
  if (lessonKey && Array.isArray(raw[lessonKey])) {
    result.lessons = raw[lessonKey].map((item) => ({
      date: formatNormalizedDate(item.date || item.Date || "", { month: "short", day: "numeric", year: "numeric" }),
      topic: item.topic || item.Topic || item.lesson || item.Lesson || "Sunday Lesson",
      teacher: item.teacher || item.Teacher || item.leader || item.Leader || item.person || item.Person || "",
      quorum: item.quorum || item.Quorum || item.class || item.Class || "Teachers",
      scripture: item.scripture || item.Scripture || item.reference || item.Reference || ""
    }));
  }
  const otherKey = Object.keys(raw).find(
    (k) => /other/i.test(k) || /note/i.test(k) || /announcement/i.test(k) || /additional/i.test(k)
  );
  if (otherKey) {
    const val = raw[otherKey];
    if (Array.isArray(val)) {
      result.other = val.map((item) => {
        if (typeof item === "string") return item;
        return item.announcements || item.announcement || item.note || item.text || item.message || (typeof item === "object" ? Object.values(item)[0] : JSON.stringify(item));
      });
    } else if (typeof val === "object") {
      result.other = Object.values(val).map((item) => {
        if (typeof item === "string") return item;
        return item.announcements || item.announcement || item.note || item.text || item.message || (typeof item === "object" ? Object.values(item)[0] : JSON.stringify(item));
      });
    }
  }
  if (result.mutual.length === 0) result.mutual = mockWardData.mutual;
  if (result.bread.length === 0) result.bread = mockWardData.bread;
  if (result.lessons.length === 0) result.lessons = mockWardData.lessons;
  if (result.other.length === 0) result.other = mockWardData.other;
  return result;
}

// server.ts
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.get("/api/ward-data", async (req, res) => {
    const appsScriptUrl = "https://script.google.com/macros/s/AKfycbwqfYmrOlWgkWNU2a5_xkCqTqVIlrhywf_nGHtA0wGNsyhvrhnYP0WwMlbVn22lfawk/exec";
    try {
      console.log("Fetching ward data from Google Apps Script:", appsScriptUrl);
      const response = await fetch(appsScriptUrl, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        },
        redirect: "follow"
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get("content-type") || "";
      const text = await response.text();
      if (contentType.includes("text/html") || text.trim().startsWith("<!doctype") || text.trim().startsWith("<html")) {
        console.log("Google Apps Script returned an HTML login page. Serving high-quality mock fallback data.");
        return res.json({
          isMock: true,
          data: mockWardData,
          authRequired: true,
          error: "The Google Apps Script is private or requires sign-in. To fix this, open the Google Sheet > Extensions > Apps Script > Deploy > New deployment > Web App > Set 'Execute as' to 'Me' and 'Who has access' to 'Anyone'."
        });
      }
      try {
        const jsonData = JSON.parse(text);
        console.log("Successfully fetched and parsed Google Apps Script JSON.");
        const normalized = normalizeWardData(jsonData);
        return res.json({
          isMock: false,
          data: normalized
        });
      } catch (parseError) {
        console.error("Failed to parse response text as JSON:", parseError);
        console.log("Serving mock fallback data due to JSON parsing failure.");
        return res.json({
          isMock: true,
          data: mockWardData,
          error: "Failed to parse Google Apps Script response. Displaying sample ward data."
        });
      }
    } catch (err) {
      console.error("Error fetching ward data from Apps Script:", err.message);
      return res.json({
        isMock: true,
        data: mockWardData,
        error: `Could not fetch live data (${err.message}). Displaying sample ward data.`
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
