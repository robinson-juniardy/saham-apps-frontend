import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { BreadCrumb } from "primereact/breadcrumb";

export default function PageWrapper({ children, breadCrumbsItems }) {
  return (
    <div>
      <Divider />
      <BreadCrumb
        home={{ icon: "pi pi-home", url: "/" }}
        model={breadCrumbsItems}
      />
      <Card style={{ marginTop: 10 }}>{children}</Card>
    </div>
  );
}
