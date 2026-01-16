import fs from 'node:fs';
import path from 'node:path';
import { deepMerge } from './deep-merge';

export interface SiteConfig {
  meta: {
    title: string;
    description: string;
    url: string;
    favicon: string;
  };
  i18n: {
    enabled: boolean;
    defaultLanguage: string;
    languages: Array<{ code: string; name: string }>;
  };
  build?: {
    output?: 'export' | 'standalone' | undefined;
  };
  branding: {
    logo: {
      light?: string;
      dark?: string;
      text?: string;
    };
    theme: {
      accentColor: string;
      radius: string;
    };
  };
  layout: {
    navbar: {
      enabled: boolean;
      transparentMode?: 'none' | 'top' | 'always';
      links: Array<{ 
        text: string; 
        url: string; 
        active?: 'url' | 'nested-url';
        external?: boolean; 
      }>;
      socials: Array<{ platform: string; url: string }>;
    };
    sidebar: {
      enabled?: boolean;
      defaultOpenLevel: number;
      collapsible: boolean;
      prefetch?: boolean;
      banner?: {
        text: string;
        url: string;
      };
      footer?: {
         text?: string;
         html?: string;
      };
      tabs?: Array<{
        title: string;
        url: string;
        description?: string;
      }>;
    };
    toc: {
      enabled: boolean;
      depth: number;
    };
    footer: {
      copyright: string;
    };
  };
  page: {
    showLastUpdate: boolean;
    showEditLink: boolean;
    repoBaseUrl: string;
  };
  content: {
    math: boolean;
    imageZoom: boolean;
    codeBlock: {
      theme: string;
      showLineNumbers: boolean;
    };
  };
}

const defaultConfig: SiteConfig = {
  meta: {
    title: 'ObjectStack ',
    description: 'Documentation',
    url: 'https://objectstack.com',
    favicon: '/favicon.ico',
  },
  i18n: {
    enabled: true,
    defaultLanguage: 'en',
    languages: [
      { code: 'en', name: 'English' },
      { code: 'zh-CN', name: '简体中文' }
    ],
  },
  branding: {
    logo: {
      text: 'ObjectStack',
    },
    theme: {
      accentColor: 'blue',
      radius: '0.5rem',
    },
  },
  layout: {
    navbar: {
      enabled: true,
      transparentMode: 'top',
      links: [],
      socials: [],
    },
    sidebar: {
      enabled: true,
      defaultOpenLevel: 1,
      collapsible: true,
      prefetch: true,
    },
    toc: {
      enabled: true,
      depth: 3,
    },
    footer: {
      copyright: '© 2026',
    },
  },
  page: {
    showLastUpdate: true,
    showEditLink: true,
    repoBaseUrl: '',
  },
  content: {
    math: false,
    imageZoom: true,
    codeBlock: {
      theme: 'vesper',
      showLineNumbers: true,
    },
  },
};

export function getSiteConfig(): SiteConfig {
  try {
    // Determine path to objectdocs.json. 
    // Assuming process.cwd() is packages/site during build, or root during dev?
    // Let's look for objectdocs.json in a few places.
    
    // 1. Check relative to current working directory (if run from root)
    let configPath = path.resolve(process.cwd(), 'objectdocs.json');
    if (fs.existsSync(configPath)) {
      const content = fs.readFileSync(configPath, 'utf-8');
      console.log('Loaded objectdocs.json from:', configPath);
      return deepMerge(defaultConfig, JSON.parse(content));
    }

    // 2. Check relative to package root (../../objectdocs.json) if run from packages/site
    configPath = path.resolve(process.cwd(), '../../objectdocs.json');
    if (fs.existsSync(configPath)) {
      const content = fs.readFileSync(configPath, 'utf-8');
      console.log('Loaded objectdocs.json from:', configPath);
      return deepMerge(defaultConfig, JSON.parse(content));
    }
    
    console.warn('objectdocs.json not found at:', configPath, 'using default config');
  } catch (error) {
    console.error('Error loading objectdocs.json:', error);
  }
  
  return defaultConfig;
}

export const siteConfig = getSiteConfig();
