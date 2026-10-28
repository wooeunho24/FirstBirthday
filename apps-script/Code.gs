const DRIVE_FOLDER_ID = "1muVdYqtyijGhHhPSpgd2JvMwZJW5Avz7";
const MAX_FILE_BYTES = 100 * 1024 * 1024;
const UPLOAD_DEADLINE = "2026-12-15";

function doPost(event) {
  try {
    const todayInSeoul = Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd");
    if (todayInSeoul > UPLOAD_DEADLINE) {
      return respond({ ok: false, error: "업로드 기간이 종료되었습니다." });
    }

    const payload = JSON.parse(event.postData.contents);
    const name = String(payload.name || "").replace(/[\\/:*?"<>|]/g, "_").slice(0, 150);
    const mimeType = String(payload.mimeType || "");
    const encoded = String(payload.data || "");

    if (!name || !/^(image\/|video\/)/.test(mimeType) || !encoded) {
      return respond({ ok: false, error: "지원하지 않는 파일입니다." });
    }
    if (DRIVE_FOLDER_ID === "PASTE_GOOGLE_DRIVE_FOLDER_ID_HERE") {
      return respond({ ok: false, error: "Drive 폴더 ID를 설정해 주세요." });
    }

    const bytes = Utilities.base64Decode(encoded);
    if (bytes.length > MAX_FILE_BYTES) {
      return respond({ ok: false, error: "파일은 100MB 이하여야 합니다." });
    }

    const blob = Utilities.newBlob(bytes, mimeType, name);
    DriveApp.getFolderById(DRIVE_FOLDER_ID).createFile(blob);
    return respond({ ok: true });
  } catch (error) {
    return respond({ ok: false, error: "업로드 처리 중 오류가 발생했습니다." });
  }
}

function respond(result) {
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}