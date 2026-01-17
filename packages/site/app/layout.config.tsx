import { type BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { siteConfig } from '@/lib/site-config';
import Image from 'next/image';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className="flex items-center gap-2">
        {siteConfig.branding.logo.light && (
          <Image
            src={siteConfig.branding.logo.light}
            alt={siteConfig.branding.logo.text || 'Logo'}
            width={30}
            height={30}
            className={siteConfig.branding.logo.dark ? 'dark:hidden' : ''}
          />
        )}
        {siteConfig.branding.logo.dark && (
          <Image
            src={siteConfig.branding.logo.dark}
            alt={siteConfig.branding.logo.text || 'Logo'}
            width={30}
            height={30}
            className="hidden dark:block"
          />
        )}
        <span className="font-bold">{siteConfig.branding.logo.text || 'ObjectStack'}</span>
      </div>
    ),
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

