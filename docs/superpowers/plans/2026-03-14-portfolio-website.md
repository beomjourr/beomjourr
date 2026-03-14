# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 풀스택 개발자를 위한 세련된 다크 테마 포트폴리오 웹사이트를 Astro로 구축하고 Vercel에 배포한다.

**Architecture:** Astro 5 기반 싱글 페이지 포트폴리오. 모든 개인 데이터는 `src/data/profile.ts`에 중앙 관리하여 콘텐츠 수정이 쉽도록 한다. Tailwind CSS v4로 다크 테마 디자인을 구현하고, CSS 애니메이션으로 세련된 인터랙션을 추가한다.

**Tech Stack:** Astro 5, TypeScript, Tailwind CSS v4, Vercel

---

## File Structure

```
src/
  layouts/
    Layout.astro              # 기본 레이아웃 (다크 테마, meta tags, font)
  components/
    Header.astro              # 네비게이션 바 (스크롤 시 고정)
    Hero.astro                # 히어로 섹션 (이름, 직함, 한줄 소개)
    About.astro               # 자기소개 섹션
    Experience.astro          # 경력사항 타임라인
    TechStack.astro           # 기술 스택 그리드
    Projects.astro            # 프로젝트 카드 그리드
    Contact.astro             # 연락처 섹션
    Footer.astro              # 푸터
  pages/
    index.astro               # 메인 페이지 (모든 섹션 조합)
  data/
    profile.ts                # 모든 개인 데이터 (경력, 프로젝트, 스킬 등)
  styles/
    global.css                # Tailwind 설정 + 글로벌 스타일 + 애니메이션
public/
  favicon.svg                 # 파비콘
astro.config.mjs              # Astro 설정
tailwind.config.mjs           # Tailwind 설정 (다크 테마 커스텀 컬러)
tsconfig.json                 # TypeScript 설정
package.json                  # 의존성
```

---

## Chunk 1: Project Setup & Base Layout

### Task 1: Astro 프로젝트 초기화

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`

- [ ] **Step 1: Astro 프로젝트 생성**

```bash
cd /Users/beomjourr/workspace/beomjourr
npm create astro@latest . -- --template minimal --typescript strict --install --no-git
```

- [ ] **Step 2: Tailwind CSS 설치**

```bash
npx astro add tailwind -y
```

- [ ] **Step 3: 빌드 확인**

Run: `npm run build`
Expected: 빌드 성공, `dist/` 폴더 생성

- [ ] **Step 4: Commit**

```bash
git init
git add -A
git commit -m "chore: init astro project with tailwind"
```

---

### Task 2: 글로벌 스타일 및 다크 테마 설정

**Files:**
- Create: `src/styles/global.css`
- Modify: `tailwind.config.mjs`

- [ ] **Step 1: Tailwind 커스텀 컬러 팔레트 설정**

`tailwind.config.mjs`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0a0a0f',
          card: '#12121a',
          border: '#1e1e2e',
          muted: '#888899',
        },
        accent: {
          DEFAULT: '#6366f1',
          hover: '#818cf8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Pretendard', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: 글로벌 스타일 작성**

`src/styles/global.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-dark text-gray-200 font-sans antialiased;
  }

  ::selection {
    @apply bg-accent/30 text-white;
  }

  ::-webkit-scrollbar {
    @apply w-1.5;
  }

  ::-webkit-scrollbar-track {
    @apply bg-dark;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-dark-border rounded-full;
  }
}

@layer components {
  .section-container {
    @apply max-w-5xl mx-auto px-6 py-24;
  }

  .section-title {
    @apply text-3xl font-bold text-white mb-2;
  }

  .section-subtitle {
    @apply text-dark-muted mb-12;
  }

  .glass-card {
    @apply bg-dark-card/50 backdrop-blur-sm border border-dark-border rounded-2xl p-6
           transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5;
  }
}

@layer utilities {
  .fade-in {
    animation: fadeIn 0.6s ease-out forwards;
    opacity: 0;
  }

  .slide-up {
    animation: slideUp 0.6s ease-out forwards;
    opacity: 0;
    transform: translateY(20px);
  }
}

@keyframes fadeIn {
  to { opacity: 1; }
}

@keyframes slideUp {
  to { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 3: 빌드 확인**

Run: `npm run build`
Expected: 빌드 성공

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css tailwind.config.mjs
git commit -m "style: add dark theme and global styles"
```

---

### Task 3: 기본 Layout 컴포넌트

**Files:**
- Create: `src/layouts/Layout.astro`
- Create: `public/favicon.svg`

- [ ] **Step 1: 파비콘 생성**

`public/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#6366f1"/>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="monospace" font-size="18" font-weight="bold">B</text>
</svg>
```

- [ ] **Step 2: Layout 컴포넌트 작성**

`src/layouts/Layout.astro`:
```astro
---
interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta name="theme-color" content="#0a0a0f" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>

<style is:global>
  @import '../styles/global.css';
</style>
```

- [ ] **Step 3: 빌드 확인**

Run: `npm run build`
Expected: 빌드 성공

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Layout.astro public/favicon.svg
git commit -m "feat: add base layout with meta tags and favicon"
```

---

## Chunk 2: Data Layer & Navigation

### Task 4: 프로필 데이터 구조 정의

**Files:**
- Create: `src/data/profile.ts`

- [ ] **Step 1: 타입 정의 및 데이터 작성**

`src/data/profile.ts`:
```typescript
export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  techStack: string[];
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  links: {
    github?: string;
    live?: string;
  };
  image?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Profile {
  name: string;
  nameEn: string;
  role: string;
  email: string;
  github: string;
  linkedin?: string;
  bio: string;
  about: string[];
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
}

const profile: Profile = {
  name: '홍길동',
  nameEn: 'Gildong Hong',
  role: 'Full-Stack Developer',
  email: 'hello@example.com',
  github: 'https://github.com/username',
  linkedin: 'https://linkedin.com/in/username',
  bio: '사용자 경험과 시스템 설계를 모두 고려하는 풀스택 개발자입니다.',
  about: [
    '안녕하세요! 저는 프론트엔드부터 백엔드, 인프라까지 폭넓은 경험을 가진 풀스택 개발자입니다.',
    '복잡한 문제를 단순하고 우아한 코드로 풀어내는 것을 좋아합니다.',
    '현재는 확장 가능한 웹 애플리케이션 아키텍처와 개발자 경험(DX) 개선에 관심을 두고 있습니다.',
  ],
  experiences: [
    {
      company: 'Company A',
      role: 'Senior Full-Stack Developer',
      period: '2023.03 - 현재',
      description: '대규모 SaaS 플랫폼의 설계 및 개발을 담당했습니다.',
      techStack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    },
    {
      company: 'Company B',
      role: 'Backend Developer',
      period: '2021.01 - 2023.02',
      description: 'RESTful API 설계 및 마이크로서비스 아키텍처 구축을 담당했습니다.',
      techStack: ['Java', 'Spring Boot', 'MySQL', 'Redis'],
    },
  ],
  skills: [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'Spring Boot', 'PostgreSQL', 'Redis'] },
    { category: 'DevOps', items: ['Docker', 'AWS', 'GitHub Actions', 'Terraform'] },
    { category: 'Tools', items: ['Git', 'Figma', 'Jira', 'Notion'] },
  ],
  projects: [
    {
      title: 'Project Alpha',
      description: '실시간 협업 도구로, WebSocket 기반의 동시 편집 기능을 구현했습니다.',
      techStack: ['React', 'Node.js', 'WebSocket', 'MongoDB'],
      links: {
        github: 'https://github.com/username/project-alpha',
        live: 'https://project-alpha.vercel.app',
      },
    },
    {
      title: 'Project Beta',
      description: 'CI/CD 파이프라인 자동화 플랫폼을 설계하고 구축했습니다.',
      techStack: ['Go', 'Docker', 'Kubernetes', 'React'],
      links: {
        github: 'https://github.com/username/project-beta',
      },
    },
  ],
};

export default profile;
```

- [ ] **Step 2: 타입 체크 확인**

Run: `npx astro check`
Expected: 에러 없음

- [ ] **Step 3: Commit**

```bash
git add src/data/profile.ts
git commit -m "feat: add profile data structure with placeholder content"
```

---

### Task 5: Header/Navigation 컴포넌트

**Files:**
- Create: `src/components/Header.astro`

- [ ] **Step 1: Header 컴포넌트 작성**

`src/components/Header.astro`:
```astro
---
const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];
---

<header id="header" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
  <nav class="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
    <a href="#" class="text-white font-mono font-bold text-lg hover:text-accent transition-colors">
      B<span class="text-accent">.</span>
    </a>

    <!-- Desktop Nav -->
    <ul class="hidden md:flex items-center gap-8">
      {navItems.map((item) => (
        <li>
          <a
            href={item.href}
            class="text-sm text-dark-muted hover:text-white transition-colors duration-200"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>

    <!-- Mobile Menu Button -->
    <button
      id="mobile-menu-btn"
      class="md:hidden text-dark-muted hover:text-white transition-colors"
      aria-label="메뉴 열기"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </nav>

  <!-- Mobile Menu -->
  <div id="mobile-menu" class="hidden md:hidden bg-dark-card/95 backdrop-blur-md border-t border-dark-border">
    <ul class="px-6 py-4 space-y-4">
      {navItems.map((item) => (
        <li>
          <a
            href={item.href}
            class="block text-dark-muted hover:text-white transition-colors"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
</header>

<script>
  // Scroll-based header background
  const header = document.getElementById('header')!;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('bg-dark/80', 'backdrop-blur-md', 'border-b', 'border-dark-border');
    } else {
      header.classList.remove('bg-dark/80', 'backdrop-blur-md', 'border-b', 'border-dark-border');
    }
  });

  // Mobile menu toggle
  const btn = document.getElementById('mobile-menu-btn')!;
  const menu = document.getElementById('mobile-menu')!;
  btn.addEventListener('click', () => menu.classList.toggle('hidden'));
  menu.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => menu.classList.add('hidden'))
  );
</script>
```

- [ ] **Step 2: 빌드 확인**

Run: `npm run build`
Expected: 빌드 성공

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat: add sticky header with mobile menu"
```

---

## Chunk 3: Main Sections (Hero, About, Experience)

### Task 6: Hero 섹션

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Hero 컴포넌트 작성**

`src/components/Hero.astro`:
```astro
---
import profile from '../data/profile';
---

<section class="min-h-screen flex items-center relative overflow-hidden">
  <!-- Background gradient -->
  <div class="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
  <div class="absolute top-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

  <div class="section-container relative">
    <p class="text-accent font-mono text-sm mb-4 slide-up" style="animation-delay: 0.1s;">
      안녕하세요, 저는
    </p>
    <h1 class="text-5xl md:text-7xl font-bold text-white mb-4 slide-up" style="animation-delay: 0.2s;">
      {profile.name}<span class="text-accent">.</span>
    </h1>
    <h2 class="text-2xl md:text-4xl font-semibold text-dark-muted mb-6 slide-up" style="animation-delay: 0.3s;">
      {profile.role}
    </h2>
    <p class="text-lg text-dark-muted max-w-xl mb-10 slide-up" style="animation-delay: 0.4s;">
      {profile.bio}
    </p>
    <div class="flex gap-4 slide-up" style="animation-delay: 0.5s;">
      <a
        href="#projects"
        class="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-xl font-medium transition-colors duration-200"
      >
        프로젝트 보기
      </a>
      <a
        href="#contact"
        class="px-6 py-3 border border-dark-border hover:border-accent/50 text-white rounded-xl font-medium transition-colors duration-200"
      >
        연락하기
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: 빌드 확인**

Run: `npm run build`
Expected: 빌드 성공

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: add hero section with animations"
```

---

### Task 7: About 섹션

**Files:**
- Create: `src/components/About.astro`

- [ ] **Step 1: About 컴포넌트 작성**

`src/components/About.astro`:
```astro
---
import profile from '../data/profile';
---

<section id="about" class="section-container">
  <p class="text-accent font-mono text-sm mb-1">01.</p>
  <h2 class="section-title">About Me</h2>
  <p class="section-subtitle">저에 대해 소개합니다</p>

  <div class="grid md:grid-cols-3 gap-8">
    <div class="md:col-span-2 space-y-4">
      {profile.about.map((paragraph) => (
        <p class="text-gray-300 leading-relaxed">{paragraph}</p>
      ))}
    </div>

    <div class="glass-card flex flex-col items-center justify-center text-center">
      <div class="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-3xl font-bold text-white mb-4">
        {profile.name.charAt(0)}
      </div>
      <h3 class="text-white font-semibold text-lg">{profile.name}</h3>
      <p class="text-dark-muted text-sm">{profile.role}</p>
      <div class="flex gap-3 mt-4">
        <a href={profile.github} target="_blank" rel="noopener" class="text-dark-muted hover:text-accent transition-colors" aria-label="GitHub">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
        {profile.linkedin && (
          <a href={profile.linkedin} target="_blank" rel="noopener" class="text-dark-muted hover:text-accent transition-colors" aria-label="LinkedIn">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        )}
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: 빌드 확인**

Run: `npm run build`
Expected: 빌드 성공

- [ ] **Step 3: Commit**

```bash
git add src/components/About.astro
git commit -m "feat: add about section with profile card"
```

---

### Task 8: Experience 섹션 (타임라인)

**Files:**
- Create: `src/components/Experience.astro`

- [ ] **Step 1: Experience 컴포넌트 작성**

`src/components/Experience.astro`:
```astro
---
import profile from '../data/profile';
---

<section id="experience" class="section-container">
  <p class="text-accent font-mono text-sm mb-1">02.</p>
  <h2 class="section-title">Experience</h2>
  <p class="section-subtitle">경력사항</p>

  <div class="relative">
    <!-- Timeline line -->
    <div class="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-dark-border" />

    <div class="space-y-8">
      {profile.experiences.map((exp, i) => (
        <div class="relative pl-8 md:pl-20">
          <!-- Timeline dot -->
          <div class="absolute left-0 md:left-8 top-1 w-2 h-2 -translate-x-1/2 rounded-full bg-accent shadow-lg shadow-accent/30" />

          <div class="glass-card">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h3 class="text-white font-semibold text-lg">{exp.role}</h3>
              <span class="text-dark-muted text-sm font-mono">{exp.period}</span>
            </div>
            <p class="text-accent text-sm mb-3">{exp.company}</p>
            <p class="text-gray-300 text-sm leading-relaxed mb-4">{exp.description}</p>
            <div class="flex flex-wrap gap-2">
              {exp.techStack.map((tech) => (
                <span class="px-2.5 py-1 text-xs font-mono text-accent bg-accent/10 rounded-md">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: 빌드 확인**

Run: `npm run build`
Expected: 빌드 성공

- [ ] **Step 3: Commit**

```bash
git add src/components/Experience.astro
git commit -m "feat: add experience timeline section"
```

---

## Chunk 4: Skills, Projects, Contact, Footer

### Task 9: TechStack 섹션

**Files:**
- Create: `src/components/TechStack.astro`

- [ ] **Step 1: TechStack 컴포넌트 작성**

`src/components/TechStack.astro`:
```astro
---
import profile from '../data/profile';
---

<section id="skills" class="section-container">
  <p class="text-accent font-mono text-sm mb-1">03.</p>
  <h2 class="section-title">Skills</h2>
  <p class="section-subtitle">기술 스택</p>

  <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {profile.skills.map((skillGroup) => (
      <div class="glass-card">
        <h3 class="text-accent font-mono text-sm font-semibold mb-4 uppercase tracking-wider">
          {skillGroup.category}
        </h3>
        <ul class="space-y-2">
          {skillGroup.items.map((item) => (
            <li class="flex items-center gap-2 text-gray-300 text-sm">
              <span class="w-1.5 h-1.5 rounded-full bg-accent/60" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 2: 빌드 확인**

Run: `npm run build`
Expected: 빌드 성공

- [ ] **Step 3: Commit**

```bash
git add src/components/TechStack.astro
git commit -m "feat: add tech stack grid section"
```

---

### Task 10: Projects 섹션

**Files:**
- Create: `src/components/Projects.astro`

- [ ] **Step 1: Projects 컴포넌트 작성**

`src/components/Projects.astro`:
```astro
---
import profile from '../data/profile';
---

<section id="projects" class="section-container">
  <p class="text-accent font-mono text-sm mb-1">04.</p>
  <h2 class="section-title">Projects</h2>
  <p class="section-subtitle">프로젝트</p>

  <div class="grid md:grid-cols-2 gap-6">
    {profile.projects.map((project) => (
      <div class="glass-card group">
        <div class="flex items-start justify-between mb-4">
          <svg class="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <div class="flex gap-3">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener" class="text-dark-muted hover:text-accent transition-colors" aria-label="GitHub">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
            )}
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noopener" class="text-dark-muted hover:text-accent transition-colors" aria-label="Live Demo">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
        <h3 class="text-white font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p class="text-gray-400 text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        <div class="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span class="text-xs font-mono text-dark-muted">{tech}</span>
          ))}
        </div>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 2: 빌드 확인**

Run: `npm run build`
Expected: 빌드 성공

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects.astro
git commit -m "feat: add projects card grid section"
```

---

### Task 11: Contact 섹션

**Files:**
- Create: `src/components/Contact.astro`

- [ ] **Step 1: Contact 컴포넌트 작성**

`src/components/Contact.astro`:
```astro
---
import profile from '../data/profile';
---

<section id="contact" class="section-container text-center">
  <p class="text-accent font-mono text-sm mb-1">05.</p>
  <h2 class="section-title mx-auto">Get In Touch</h2>
  <p class="section-subtitle">연락처</p>

  <p class="text-gray-300 max-w-lg mx-auto mb-8 leading-relaxed">
    새로운 기회나 협업에 대해 이야기하고 싶으시다면 편하게 연락해주세요.
    항상 열려 있습니다.
  </p>

  <a
    href={`mailto:${profile.email}`}
    class="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-xl font-medium transition-colors duration-200"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
    이메일 보내기
  </a>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Contact.astro
git commit -m "feat: add contact section"
```

---

### Task 12: Footer 컴포넌트

**Files:**
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Footer 컴포넌트 작성**

`src/components/Footer.astro`:
```astro
---
import profile from '../data/profile';
const year = new Date().getFullYear();
---

<footer class="border-t border-dark-border py-8">
  <div class="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
    <p class="text-dark-muted text-sm">
      &copy; {year} {profile.name}. All rights reserved.
    </p>
    <div class="flex items-center gap-4">
      <a href={profile.github} target="_blank" rel="noopener" class="text-dark-muted hover:text-accent transition-colors text-sm">
        GitHub
      </a>
      {profile.linkedin && (
        <a href={profile.linkedin} target="_blank" rel="noopener" class="text-dark-muted hover:text-accent transition-colors text-sm">
          LinkedIn
        </a>
      )}
      <a href={`mailto:${profile.email}`} class="text-dark-muted hover:text-accent transition-colors text-sm">
        Email
      </a>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: add footer component"
```

---

## Chunk 5: Page Assembly & Deployment

### Task 13: 메인 페이지 조합

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: 메인 페이지에서 모든 컴포넌트 조합**

`src/pages/index.astro`:
```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Experience from '../components/Experience.astro';
import TechStack from '../components/TechStack.astro';
import Projects from '../components/Projects.astro';
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
import profile from '../data/profile';
---

<Layout
  title={`${profile.name} | ${profile.role}`}
  description={profile.bio}
>
  <Header />
  <main>
    <Hero />
    <About />
    <Experience />
    <TechStack />
    <Projects />
    <Contact />
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 2: 로컬 개발 서버에서 확인**

Run: `npm run dev`
Expected: `localhost:4321`에서 모든 섹션이 정상적으로 렌더링

- [ ] **Step 3: 빌드 확인**

Run: `npm run build && npm run preview`
Expected: 프로덕션 빌드 성공, 프리뷰에서 정상 확인

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: assemble all sections into main page"
```

---

### Task 14: Scroll 애니메이션 (Intersection Observer)

**Files:**
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Intersection Observer 스크립트 추가**

`src/layouts/Layout.astro`의 `</body>` 바로 위에 추가:

```html
<script>
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-up');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('section[id]').forEach((section) => {
    section.style.opacity = '0';
    observer.observe(section);
  });
</script>
```

- [ ] **Step 2: 로컬에서 스크롤 애니메이션 확인**

Run: `npm run dev`
Expected: 각 섹션이 스크롤 시 fade-in + slide-up 애니메이션

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: add scroll-triggered animations"
```

---

### Task 15: Vercel 배포 설정

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Vercel 어댑터 설치**

```bash
npx astro add vercel -y
```

- [ ] **Step 2: astro.config.mjs 확인**

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  adapter: vercel(),
});
```

- [ ] **Step 3: 빌드 확인**

Run: `npm run build`
Expected: 빌드 성공

- [ ] **Step 4: Commit**

```bash
git add astro.config.mjs package.json package-lock.json
git commit -m "chore: add vercel adapter for deployment"
```

---

### Task 16: Vercel 배포

- [ ] **Step 1: GitHub 레포지토리 생성 및 push**

```bash
gh repo create beomjourr --public --source=. --push
```

- [ ] **Step 2: Vercel에 프로젝트 연결 및 배포**

```bash
npx vercel --yes
```

또는 [vercel.com](https://vercel.com)에서 GitHub 레포를 import하여 배포.

- [ ] **Step 3: 배포된 URL 확인**

Expected: `https://beomjourr.vercel.app` 또는 유사한 URL에서 사이트 정상 작동

- [ ] **Step 4: Commit (vercel 설정 파일)**

```bash
git add .vercel
git commit -m "chore: add vercel project config"
```

---

## Summary

| Chunk | Tasks | 설명 |
|-------|-------|------|
| 1 | Task 1-3 | 프로젝트 초기화, 스타일, 레이아웃 |
| 2 | Task 4-5 | 데이터 구조, 네비게이션 |
| 3 | Task 6-8 | Hero, About, Experience 섹션 |
| 4 | Task 9-12 | Skills, Projects, Contact, Footer |
| 5 | Task 13-16 | 페이지 조합, 애니메이션, 배포 |
