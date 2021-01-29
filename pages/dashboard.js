import DashboardShell from '@/components/DashboardShell';
import Page from '@/components/Page';
import SiteEmptyState from '@/components/SiteEmptyState';
import SiteTable from '@/components/SiteTable';
import SiteTableHeader from '@/components/SiteTableHeader';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';
import useSWR from 'swr';

const Dashboard = () => {
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

const DashboardPage = () => (
  <Page name="Dashboard" path="/dashboard">
    <Dashboard />
  </Page>
);

export default DashboardPage;
