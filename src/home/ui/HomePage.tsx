import Hero from '../../shared/ui/Hero.tsx';
import { useHomePage } from '../core/use-home-page.ts';

const HomePage = () => {
  const data = useHomePage();

  return (
    <Hero
      estYear={data.estYear}
      heroImage={data.heroImage}
      heroImageText={data.heroImageText}
      heroHeadlineLine1={data.heroHeadlineLine1}
      heroHeadlineLine2={data.heroHeadlineLine2}
      heroSubheading={data.heroSubheading}
      heroCtaPrimaryLabel={data.heroCtaPrimaryLabel}
      heroCtaSecondaryLabel={data.heroCtaSecondaryLabel}
    />
  );
};

export default HomePage;
