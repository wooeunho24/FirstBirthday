# 첫돌 초대장

정적 페이지는 GitHub Pages에 올립니다. `index.html`은 메인 초대장이고 `upload.html`은 사진·영상 업로드 서브페이지입니다. 사진과 동영상은 Google Apps Script를 통해 지정한 Google Drive 폴더에 저장합니다.

## 카카오 지도

`index.html`은 제공받은 카카오맵 지도 퍼가기 키와 타임스탬프를 사용합니다. 별도의 JavaScript API 키나 도메인 등록 없이 퍼가기 지도를 표시합니다. 지도는 화면 너비에 맞춰 최대 640px로 렌더링합니다. 길찾기 버튼에서는 네이버 지도와 카카오맵 중 선택할 수 있습니다.

## Google Drive 업로드 연결

1. Google Drive에서 업로드 전용 폴더를 만들고 폴더 URL의 `/folders/` 뒤에 있는 ID를 복사합니다.
2. [Google Apps Script](https://script.google.com/)에서 새 프로젝트를 만든 뒤 `apps-script/Code.gs` 내용을 붙여 넣습니다.
3. `DRIVE_FOLDER_ID` 값을 복사한 폴더 ID로 바꾸고 프로젝트를 저장합니다.
4. **배포 > 새 배포 > 웹 앱**에서 다음과 같이 설정합니다.
   - 실행 사용자: 나
   - 액세스 권한: 모든 사용자
5. 배포를 승인하고 표시된 웹 앱 URL을 복사합니다. URL은 보통 `https://script.google.com/macros/s/.../exec` 형식입니다.
6. `upload.html`의 `UPLOAD_ENDPOINT` 값에 웹 앱 URL을 입력합니다.
7. GitHub 저장소에 파일을 올리고 **Settings > Pages**에서 배포 브랜치와 폴더를 지정합니다.

업로드는 로그인 없이 동작하며, 한 파일당 최대 20MB의 사진 또는 동영상을 받습니다. 공개 웹 앱 URL을 아는 누구나 폴더에 파일을 추가할 수 있으므로 업로드 전용 폴더를 사용하고 Drive 저장 용량을 관리해 주세요. 현재 브라우저는 교차 출처 응답을 읽지 않으므로, 업로드 화면에는 전송 요청 완료가 표시됩니다. 저장 여부는 Drive 폴더에서 확인할 수 있습니다.

업로드는 한국 시간 기준 2026년 12월 15일까지 허용됩니다. 마감 제한을 적용하려면 변경된 `upload.html`을 정적 사이트에 반영하고 `apps-script/Code.gs`를 저장한 뒤 Apps Script 웹 앱을 새 버전으로 재배포해야 합니다.

## 행사 정보 수정

행사 연도와 시간은 `index.html`의 상단 문구에서 수정할 수 있습니다. 장소와 지도 앱 링크도 같은 파일의 `오시는 길` 섹션에 있습니다.

## 업로드 페이지 링크와 QR

GitHub Pages에 배포한 뒤 `https://<계정>.github.io/<저장소>/upload.html` 주소를 QR 코드에 사용하면 업로드 페이지가 바로 열립니다. 현재 로컬 확인 주소는 `http://localhost:8000/upload.html`이며 이 주소는 초대받은 분들의 기기에서는 열리지 않습니다. 작업 폴더가 아직 GitHub Pages에 배포되지 않아 공개 QR 주소는 배포 후 확정할 수 있습니다.