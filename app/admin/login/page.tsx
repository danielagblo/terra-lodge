import { AdminLoginView } from "@/components/admin/admin-login-view";

type SearchParams = {
  next?: string | string[];
  logged_out?: string | string[];
};

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const nextPath = Array.isArray(searchParams?.next)
    ? searchParams?.next[0]
    : searchParams?.next;
  const loggedOut = Array.isArray(searchParams?.logged_out)
    ? searchParams?.logged_out[0] === "1"
    : searchParams?.logged_out === "1";

  return <AdminLoginView nextPath={nextPath} loggedOut={loggedOut} />;
}
