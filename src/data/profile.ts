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
