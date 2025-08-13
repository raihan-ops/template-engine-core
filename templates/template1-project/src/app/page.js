import CompoundCard from '../features/sampleFeature/components/CompoundCard';
import { fetchSampleData } from '../features/sampleFeature/services/sampleApi';
import { getT } from '../i18n/server';

export default async function Page() {
  const t = await getT();
  const data = await fetchSampleData();

  return (
    <main>
      <h1>{t('welcome')}</h1>
      <CompoundCard title={data.title} description={data.body} />
    </main>
  );
}