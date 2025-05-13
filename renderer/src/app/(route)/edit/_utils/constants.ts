// components/constants.ts
export const fileStructure: Record<
  string,
  { type: "file" | "folder"; parent: string | null }
> = {
  "README.md": { type: "file", parent: null },
  "package.json": { type: "file", parent: null },
  docs: { type: "folder", parent: null },
  src: { type: "folder", parent: null },
  "docs/api.md": { type: "file", parent: "docs" },
  "docs/guide.md": { type: "file", parent: "docs" },
  "src/components": { type: "folder", parent: "src" },
  "src/pages": { type: "folder", parent: "src" },
  "src/components/Button.tsx": { type: "file", parent: "src/components" },
  "src/components/Sidebar.tsx": { type: "file", parent: "src/components" },
  "src/pages/index.tsx": { type: "file", parent: "src/pages" },
  "project.md": { type: "file", parent: null },
  "tasks.md": { type: "file", parent: null },
};

export const initialUsers = [
  {
    id: 1,
    name: "김민수",
    color: "#FF5733",
    avatar:
      "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20Asian%20man%20with%20short%20black%20hair%2C%20clean%20cut%20appearance%2C%20neutral%20background%2C%20high%20quality%20professional%20headshot&width=40&height=40&seq=user1&orientation=squarish",
  },
  {
    id: 2,
    name: "이지연",
    color: "#33A1FF",
    avatar:
      "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20Asian%20woman%20with%20medium%20length%20black%20hair%2C%20clean%20appearance%2C%20neutral%20background%2C%20high%20quality%20professional%20headshot&width=40&height=40&seq=user2&orientation=squarish",
  },
  {
    id: 3,
    name: "박준호",
    color: "#33FF57",
    avatar:
      "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20middle-aged%20Asian%20man%20with%20glasses%2C%20short%20black%20hair%2C%20neutral%20background%2C%20high%20quality%20professional%20headshot&width=40&height=40&seq=user3&orientation=squarish",
  },
];

export const sampleMarkdown = `# 텍스트 에디터 소개
## 개요
이 텍스트 에디터는 실시간 협업 기능을 갖춘 강력한 편집 도구입니다. 팀원들과 함께 문서를 실시간으로 편집하고 공유할 수 있습니다.
## 주요 기능
- 실시간 협업 편집
- 마크다운 문법 지원
- 파일 트리 구조
- 다크/라이트 모드
## 설치 방법
\
\
\`\`\`bash
npm install
npm start
\`\`\`
## 사용 방법
1. 계정 생성 또는 로그인
2. 프로젝트 생성 또는 참여
3. 파일 편집 시작
![예시 이미지](https://example.com/image.jpg)
## 담당자
- 프론트엔드: 김민수
- 백엔드: 이지연
- 디자인: 박준호
`;
