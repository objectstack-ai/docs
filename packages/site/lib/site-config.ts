import { deepMerge } from './deep-merge';
import objectDocsConfig from '@/objectdocs.json';

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
    languages: Array<string>;
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
    languages: ["en", "cn"
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
  return deepMerge(defaultConfig, objectDocsConfig);
}

export const siteConfig = getSiteConfig();
