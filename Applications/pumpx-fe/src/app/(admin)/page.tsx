import { metaObject } from "@/config/site.config";
import FileDashboard from "@/app/shared/file/dashboard";

export const metadata = {
  ...metaObject(),
};

export default function FileDashboardPage() {
  return <FileDashboard />;
}
