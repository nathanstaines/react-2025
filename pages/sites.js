import DashboardShell from '@/components/DashboardShell';
import Page from '@/components/Page';
import SiteEmptyState from '@/components/SiteEmptyState';
import SiteTable from '@/components/SiteTable';
import SiteTableHeader from '@/components/SiteTableHeader';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';
import useSWR from 'swr';

const MySites = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SiteTableHeader />
      {data.sites.length ? (
        <SiteTable sites={data.sites} />
      ) : (
        <SiteEmptyState />
      )}
    </DashboardShell>
  );
};

const MySitesPage = () => (
  <Page name="My sites" path="/sites">
    <MySites />
  </Page>
);

export default MySitesPage;
