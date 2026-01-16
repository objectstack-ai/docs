import { type BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { siteConfig } from '@/lib/site-config';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: siteConfig.branding.logo.text || 'ObjectStack',
    transparentMode: siteConfig.layout.navbar.transparentMode,
  },
  links: siteConfig.layout.navbar.links.map(link => ({
    text: link.text,
    url: link.url,
    active: link.active || 'nested-url',
    external: link.external,
  })),
  githubUrl: siteConfig.layout.navbar.socials.find(s => s.platform === 'github')?.url,
  i18n: siteConfig.i18n.enabled,
};

