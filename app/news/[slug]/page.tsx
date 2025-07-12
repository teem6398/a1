import { NewsDetails } from '../../components/Home/News';

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  return <NewsDetails slug={params.slug} />;
}
