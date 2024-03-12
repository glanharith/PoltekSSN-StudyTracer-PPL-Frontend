import { ProdiModule } from '@/components/modules/ProdiModule';
import AdminHoc from "@/components/hoc/adminHoc";

const ProdiPage = () => {
  return <ProdiModule />;
};

export default AdminHoc(ProdiPage);
