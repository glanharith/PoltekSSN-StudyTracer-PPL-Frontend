import { KaprodiModule } from "@/components";
import AdminHoc from "@/components/hoc/adminHoc";

const KepalaProgramStudi = () => {
  return <KaprodiModule />;
};

export default AdminHoc(KepalaProgramStudi);