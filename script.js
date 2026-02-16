// DOM refs
const templateCards = [...document.querySelectorAll(".template-card")];
const formPanel = document.getElementById("formPanel");
const resultPanel = document.getElementById("resultPanel");
const wishForm = document.getElementById("wishForm");

const senderInput = document.getElementById("sender");
const receiverInput = document.getElementById("receiver");
const messageInput = document.getElementById("message");
const mediaFileInput = document.getElementById("mediaFile");
const mediaUrlInput = document.getElementById("mediaUrl");
const imgbbApiKeyInput = document.getElementById("imgbbApiKey");
const rememberImgBbKeyInput = document.getElementById("rememberImgBbKey");
const rememberImgBbKeyText = document.getElementById("rememberImgBbKeyText");
const uploadToImgBbBtn = document.getElementById("uploadToImgBbBtn");
const generateLinkBtn = document.getElementById("generateLinkBtn");
const imgbbHint = document.getElementById("imgbbHint");

const shareLinkInput = document.getElementById("shareLink");
const copyBtn = document.getElementById("copyBtn");
const giftButton = document.getElementById("giftButton");

const previewCard = document.getElementById("previewCard");
const previewMedia = document.getElementById("previewMedia");
const mediaStatus = document.getElementById("mediaStatus");
const copyStatus = document.getElementById("copyStatus");

const langToggle = document.getElementById("langToggle");
const heroKicker = document.querySelector(".hero-kicker");
const heroTitle = document.querySelector(".hero h1");
const heroDesc = document.querySelector(".hero p:last-of-type");

const sectionTitle1 = document.querySelector("#templatePanel h2");
const sectionTitle2 = document.querySelector("#formPanel h2");
const sectionTitle3 = document.querySelector("#resultPanel h2");
const resultText = document.querySelector("#resultPanel .result-text");
const mediaFileHint = document.getElementById("mediaFileHint");

const labels = [...wishForm.querySelectorAll("label")];

// State
let selectedTemplate = "";
let selectedMediaData = "";
let currentLang = localStorage.getItem("app_lang") || "id";

const giftThemeClasses = ["gift--classic", "gift--playful", "gift--night"];
const MAX_MEDIA_FILE_BYTES = 1_500_000;
const MAX_SHARE_URL_LENGTH = 1800;
const IMG_BB_API_KEY_STORAGE = "imgbb_api_key";
const IMG_BB_API_KEY_REMEMBER_STORAGE = "imgbb_api_key_remember";

// I18N
const i18n = {
  id: {
    heroKicker: "Birthday Card",
    heroTitle: "Buat Kado Ucapan Ulang Tahun",
    heroDesc: "Pilih gaya kartu, isi surat, lalu bagikan lewat link spesial berbentuk kado.",
    s1: "1. Pilih Tema Ucapan",
    s2: "2. Isi Data Ucapan",
    s3: "3. Bagikan Ucapan",
    resultText: "Link ucapanmu sudah siap. Klik kado untuk menyalin link.",
    labelSender: "Nama Pengirim",
    labelReceiver: "Nama Penerima",
    labelMessage: "Isi Surat",
    labelMediaFile: "Upload Foto/GIF (opsional)",
    labelMedia: "Link Foto/GIF (opsional)",
    labelImgBbKey: "ImgBB API Key (opsional)",
    rememberImgBbKey: "Simpan API key di perangkat ini",
    imgbbHint: "Isi jika ingin upload otomatis file lokal ke URL publik.",
    uploadToImgBb: "Upload File ke ImgBB",
    uploadNeedFile: "Pilih file gambar dulu sebelum upload.",
    uploadNeedKey: "Isi ImgBB API Key dulu.",
    uploadStart: "Mengupload gambar ke ImgBB...",
    uploadSuccess: "Upload berhasil. URL publik sudah diisi otomatis.",
    uploadFail: "Upload gagal. Cek API key/koneksi lalu coba lagi.",
    mediaFileHint: "Ukuran file harus kurang dari 1.5MB (hanya preview, bukan untuk link share).",
    placeholderSender: "Contoh: Andi",
    placeholderReceiver: "Contoh: Cinta",
    placeholderMessage: "Tulis doa dan harapan terbaikmu...",
    placeholderMedia: "https://contoh.com/foto-atau-gif.gif",
    submit: "Buat Link Ucapan",
    copy: "Salin",
    gift: "Klik Kado",
    copied: "Link berhasil disalin.",
    copiedFallback: "Link disalin dengan mode cadangan.",
    mediaInvalid: "Media gagal dimuat. Gunakan link langsung ke file gambar/GIF.",
    mediaTooLarge: "File terlalu besar. Maksimal sekitar 1.5MB.",
    mediaReadFail: "File tidak bisa dibaca. Coba pilih file lain.",
    localFileNotShareable:
      "File lokal hanya untuk preview. Agar penerima bisa melihat, upload gambar ke layanan publik lalu isi Link Foto/GIF.",
    urlTooLong:
      "Link terlalu panjang untuk dibagikan. Gunakan Link Foto/GIF publik, jangan file lokal.",
    previewTo: "Untuk",
    previewFrom: "Dari",
    cards: {
      classic: ["Classic Gold", "Elegan & Formal", "Untuk sahabat, keluarga, rekan kerja"],
      playful: ["Playful Pop", "Ceria & Hangat", "Untuk teman dekat dan pasangan"],
      night: ["Midnight Glow", "Manis & Intim", "Untuk pesan personal spesial"],
    },
  },
  en: {
    heroKicker: "Birthday Card",
    heroTitle: "Create a Birthday Gift Message",
    heroDesc: "Pick a card style, write your letter, then share it with a gift-shaped link.",
    s1: "1. Choose Greeting Theme",
    s2: "2. Fill Message Details",
    s3: "3. Share Your Greeting",
    resultText: "Your greeting link is ready. Click the gift to copy the link.",
    labelSender: "Sender Name",
    labelReceiver: "Receiver Name",
    labelMessage: "Letter Message",
    labelMediaFile: "Upload Photo/GIF (optional)",
    labelMedia: "Photo/GIF Link (optional)",
    labelImgBbKey: "ImgBB API Key (optional)",
    rememberImgBbKey: "Remember API key on this device",
    imgbbHint: "Fill this to auto-upload local files to a public URL.",
    uploadToImgBb: "Upload File to ImgBB",
    uploadNeedFile: "Pick an image file before uploading.",
    uploadNeedKey: "Fill ImgBB API Key first.",
    uploadStart: "Uploading image to ImgBB...",
    uploadSuccess: "Upload successful. Public URL has been filled automatically.",
    uploadFail: "Upload failed. Check API key/network and try again.",
    mediaFileHint: "File must be under 1.5MB (preview only, not embedded in share link).",
    placeholderSender: "Example: Andi",
    placeholderReceiver: "Example: Cinta",
    placeholderMessage: "Write your best wishes here...",
    placeholderMedia: "https://example.com/photo-or-gif.gif",
    submit: "Generate Greeting Link",
    copy: "Copy",
    gift: "Click Gift",
    copied: "Link copied successfully.",
    copiedFallback: "Link copied using fallback mode.",
    mediaInvalid: "Media failed to load. Use a direct image/GIF file URL.",
    mediaTooLarge: "File is too large. Maximum around 1.5MB.",
    mediaReadFail: "File cannot be read. Try another file.",
    localFileNotShareable:
      "Local files are preview-only. For sharing, upload the image to a public host and fill Photo/GIF Link.",
    urlTooLong:
      "The generated link is too long to share. Use a public Photo/GIF URL, not a local file.",
    previewTo: "To",
    previewFrom: "From",
    cards: {
      classic: ["Classic Gold", "Elegant & Formal", "For friends, family, and colleagues"],
      playful: ["Playful Pop", "Cheerful & Warm", "For close friends and partners"],
      night: ["Midnight Glow", "Sweet & Intimate", "For personal special messages"],
    },
  },
};

// Helpers
function safeBase64Encode(text) {
  const base64 = btoa(unescape(encodeURIComponent(text)));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("read_failed"));
    reader.readAsDataURL(file);
  });
}

function normalizeMediaUrl(url) {
  const value = (url || "").trim();
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  if (/^www\./i.test(value)) return `https://${value}`;
  return value;
}

function isLikelyDirectImageUrl(url) {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    if (!/^https?:$/i.test(parsed.protocol)) return false;
  } catch {
    return false;
  }
  return true;
}

function dataUrlToBase64(dataUrl) {
  const parts = String(dataUrl || "").split(",");
  return parts[1] || "";
}

async function uploadImageToImgBB(file, apiKey) {
  const dataUrl = await readFileAsDataUrl(file);
  const imageBase64 = dataUrlToBase64(dataUrl);
  if (!imageBase64) {
    throw new Error("invalid_image_data");
  }

  const body = new URLSearchParams();
  body.set("image", imageBase64);
  body.set("name", file.name.replace(/\.[^.]+$/, "").slice(0, 80));

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error("upload_http_error");
  }

  const payload = await response.json();
  const finalUrl = payload?.data?.url || payload?.data?.display_url || "";
  if (!finalUrl) {
    throw new Error("upload_response_invalid");
  }

  return finalUrl;
}

function applyGiftTheme(el, template) {
  if (!el) return;

  el.classList.remove(...giftThemeClasses);
  if (template === "classic") el.classList.add("gift--classic");
  if (template === "playful") el.classList.add("gift--playful");
  if (template === "night") el.classList.add("gift--night");
}

function applyPageTheme(template) {
  document.body.classList.remove("theme-classic", "theme-playful", "theme-night");
  if (!template) return;
  document.body.classList.add(`theme-${template}`);
}

function formatPreview(data) {
  const t = i18n[currentLang];
  return `${t.previewTo}: ${data.receiver}\n\n${data.message}\n\n${t.previewFrom},\n${data.sender}`;
}

function setPreviewMedia(source) {
  const mediaUrl = normalizeMediaUrl(source);
  mediaStatus.textContent = "";

  if (!mediaUrl) {
    previewMedia.removeAttribute("src");
    previewMedia.classList.add("hidden");
    return "";
  }

  previewMedia.src = mediaUrl;
  previewMedia.classList.remove("hidden");

  previewMedia.onload = () => {
    mediaStatus.textContent = "";
  };

  previewMedia.onerror = () => {
    previewMedia.classList.add("hidden");
    previewMedia.removeAttribute("src");
    mediaStatus.textContent = i18n[currentLang].mediaInvalid;
  };

  return mediaUrl;
}

function setTemplate(template) {
  selectedTemplate = template;

  templateCards.forEach((card) => {
    card.classList.toggle("active", card.dataset.template === template);
  });

  formPanel.classList.remove("hidden");
  resultPanel.classList.add("hidden");
  applyPageTheme(template);
}

function restoreRememberedImgBbApiKey() {
  const remember = localStorage.getItem(IMG_BB_API_KEY_REMEMBER_STORAGE) === "1";
  rememberImgBbKeyInput.checked = remember;
  if (!remember) return;
  imgbbApiKeyInput.value = localStorage.getItem(IMG_BB_API_KEY_STORAGE) || "";
}

function syncImgBbApiKeyStorage() {
  if (rememberImgBbKeyInput.checked) {
    localStorage.setItem(IMG_BB_API_KEY_REMEMBER_STORAGE, "1");
    localStorage.setItem(IMG_BB_API_KEY_STORAGE, imgbbApiKeyInput.value.trim());
    return;
  }

  localStorage.removeItem(IMG_BB_API_KEY_REMEMBER_STORAGE);
  localStorage.removeItem(IMG_BB_API_KEY_STORAGE);
}

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("app_lang", lang);

  const t = i18n[lang];
  document.documentElement.lang = lang;
  langToggle.textContent = lang === "id" ? "EN" : "ID";

  heroKicker.textContent = t.heroKicker;
  heroTitle.textContent = t.heroTitle;
  heroDesc.textContent = t.heroDesc;

  sectionTitle1.textContent = t.s1;
  sectionTitle2.textContent = t.s2;
  sectionTitle3.textContent = t.s3;
  resultText.textContent = t.resultText;

  labels[0].childNodes[0].nodeValue = t.labelSender;
  labels[1].childNodes[0].nodeValue = t.labelReceiver;
  labels[2].childNodes[0].nodeValue = t.labelMessage;
  labels[3].childNodes[0].nodeValue = t.labelMediaFile;
  labels[4].childNodes[0].nodeValue = t.labelMedia;
  labels[5].childNodes[0].nodeValue = t.labelImgBbKey;
  rememberImgBbKeyText.textContent = t.rememberImgBbKey;
  mediaFileHint.textContent = t.mediaFileHint;
  imgbbHint.textContent = t.imgbbHint;

  senderInput.placeholder = t.placeholderSender;
  receiverInput.placeholder = t.placeholderReceiver;
  messageInput.placeholder = t.placeholderMessage;
  mediaUrlInput.placeholder = t.placeholderMedia;
  imgbbApiKeyInput.placeholder = "API key...";

  generateLinkBtn.textContent = t.submit;
  uploadToImgBbBtn.textContent = t.uploadToImgBb;
  copyBtn.textContent = t.copy;
  giftButton.querySelector(".gift-label").textContent = t.gift;

  templateCards.forEach((card) => {
    const theme = card.dataset.template;
    const [badge, title, desc] = t.cards[theme];

    card.querySelector(".badge").textContent = badge;
    card.querySelector("strong").textContent = title;
    card.querySelector("small").textContent = desc;
  });

  if (previewCard.textContent.trim() && senderInput.value && receiverInput.value) {
    previewCard.textContent = formatPreview({
      sender: senderInput.value.trim(),
      receiver: receiverInput.value.trim(),
      message: messageInput.value.trim(),
    });
  }
}

// Events
templateCards.forEach((card) => {
  card.addEventListener("click", () => setTemplate(card.dataset.template));
});

wishForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!selectedTemplate) return;

  const t = i18n[currentLang];
  const file = mediaFileInput.files?.[0] || null;
  const mediaUrl = normalizeMediaUrl(mediaUrlInput.value);

  if (file && !mediaUrl) {
    mediaStatus.textContent = t.localFileNotShareable;
    return;
  }

  if (mediaUrl && !isLikelyDirectImageUrl(mediaUrl)) {
    mediaStatus.textContent = t.mediaInvalid;
    return;
  }

  const payload = {
    t: selectedTemplate,
    sender: senderInput.value.trim(),
    receiver: receiverInput.value.trim(),
    message: messageInput.value.trim(),
    mediaUrl,
  };

  const encoded = safeBase64Encode(JSON.stringify(payload));
  const basePath = location.pathname.replace(/[^/]*$/, "");
  const url = `${location.origin}${basePath}receiver.html?gift=${encoded}`;

  if (url.length > MAX_SHARE_URL_LENGTH) {
    mediaStatus.textContent = t.urlTooLong;
    return;
  }

  shareLinkInput.value = url;
  previewCard.textContent = formatPreview(payload);

  setPreviewMedia(selectedMediaData || payload.mediaUrl);

  applyGiftTheme(giftButton, selectedTemplate);
  resultPanel.classList.remove("hidden");
  copyStatus.textContent = "";
});

mediaFileInput.addEventListener("change", async () => {
  const t = i18n[currentLang];
  const file = mediaFileInput.files?.[0] || null;

  selectedMediaData = "";
  if (!file) {
    if (!mediaUrlInput.value.trim()) {
      previewMedia.classList.add("hidden");
      previewMedia.removeAttribute("src");
    }
    mediaStatus.textContent = "";
    return;
  }

  if (file.size > MAX_MEDIA_FILE_BYTES) {
    mediaStatus.textContent = t.mediaTooLarge;
    mediaFileInput.value = "";
    return;
  }

  try {
    selectedMediaData = await readFileAsDataUrl(file);
    setPreviewMedia(selectedMediaData);
  } catch {
    mediaStatus.textContent = t.mediaReadFail;
    mediaFileInput.value = "";
  }
});

uploadToImgBbBtn.addEventListener("click", async () => {
  const t = i18n[currentLang];
  const file = mediaFileInput.files?.[0] || null;
  const apiKey = imgbbApiKeyInput.value.trim();

  if (!file) {
    mediaStatus.textContent = t.uploadNeedFile;
    return;
  }

  if (!apiKey) {
    mediaStatus.textContent = t.uploadNeedKey;
    return;
  }

  if (file.size > MAX_MEDIA_FILE_BYTES) {
    mediaStatus.textContent = t.mediaTooLarge;
    return;
  }

  uploadToImgBbBtn.disabled = true;
  mediaStatus.textContent = t.uploadStart;

  try {
    const uploadedUrl = await uploadImageToImgBB(file, apiKey);
    mediaUrlInput.value = uploadedUrl;
    setPreviewMedia(uploadedUrl);
    mediaStatus.textContent = t.uploadSuccess;
  } catch {
    mediaStatus.textContent = t.uploadFail;
  } finally {
    uploadToImgBbBtn.disabled = false;
  }
});

rememberImgBbKeyInput.addEventListener("change", () => {
  syncImgBbApiKeyStorage();
});

imgbbApiKeyInput.addEventListener("input", () => {
  if (!rememberImgBbKeyInput.checked) return;
  localStorage.setItem(IMG_BB_API_KEY_STORAGE, imgbbApiKeyInput.value.trim());
});

async function copyShareLink() {
  if (!shareLinkInput.value) return;

  const t = i18n[currentLang];
  try {
    await navigator.clipboard.writeText(shareLinkInput.value);
    copyStatus.textContent = t.copied;
  } catch {
    shareLinkInput.select();
    document.execCommand("copy");
    copyStatus.textContent = t.copiedFallback;
  }
}

langToggle.addEventListener("click", () => {
  applyLanguage(currentLang === "id" ? "en" : "id");
});

copyBtn.addEventListener("click", copyShareLink);
giftButton.addEventListener("click", copyShareLink);

// Init
restoreRememberedImgBbApiKey();
applyLanguage(currentLang);
