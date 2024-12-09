# Electron 실행 방법

- (1) yarn build
- (2) dist 폴더 > index.html > js, css 파일 경로 앞 부분에 ./ 붙이기
- (3) yarn run electron

# Electron 문제 해결 방안

- 파일 경로 찾지 못하는 오류 => ./ 붙이기
- broswerRouter 지원x => hashRouter로 수정
