import React from "react";
import PageTitle from "../../../partials/PageTitle";
import PageWrapper from "../../../partials/PageWrapper";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ApiService } from "../../../../utils/service";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { useSnackbar } from "notistack";
import { Stack } from "@mui/system";

const RingkasanSahamPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [dataRingkasan, setDataRingkasan] = React.useState([]);
  const [filters, setFilters] = React.useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue1, setGlobalFilterValue1] = React.useState("");
  const [isFileSelected, setIsFileSelected] = React.useState(false);
  const [isUploding, setIsUploading] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState();
  const [startDateFilter, setStartDateFilter] = React.useState(new Date());
  const [endDateFilter, setEndDateFilter] = React.useState(new Date());

  const ColumnDef = [
    {
      field: "kode_master_saham",
      header: "Kode Saham",
      frozen: true,
      sortable: true,
    },
    {
      field: "detail_saham.nama_perusahaan",
      header: "Nama Perusahaan",
      frozen: true,
      sortable: true,
    },
    {
      field: "last_trading_date",
      header: "Last Trading Date",
      sortable: true,
    },
    { field: "remarks", header: "Remarks" },
    { field: "sebelumnya", header: "Sebelumnya", sortable: true },
    { field: "open_price", header: "Open Price", sortable: true },
    { field: "first_trade", header: "First Trade", sortable: true },
    { field: "tertinggi", header: "Tertinggi", sortable: true },
    { field: "terendah", header: "Terendah", sortable: true },
    { field: "penutupan", header: "Penutupan", sortable: true },
    { field: "selisih", header: "Selisih", sortable: true },
    { field: "volume", header: "Volume", sortable: true },
    { field: "nilai", header: "Nilai", sortable: true },
    { field: "frekuensi", header: "Frekuensi", sortable: true },
    { field: "index_individual", header: "Index Individual", sortable: true },
    { field: "listed_shared", header: "Listed Shared", sortable: true },
    { field: "offer", header: "Offer", sortable: true },
    { field: "offer_volume", header: "Offer Volume", sortable: true },
    { field: "bid", header: "Bid", sortable: true },
    { field: "bid_volume", header: "Bid Volume", sortable: true },

    { field: "tradeble_shares", header: "Tradeble Shares", sortable: true },
    { field: "foreign_sell", header: "Foreign Sell", sortable: true },
    { field: "foreign_buy", header: "Foreign Buy", sortable: true },
    {
      field: "non_regular_value",
      header: "Non Regular Value",
      sortable: true,
    },
    {
      field: "non_regular_volume",
      header: "Non Regular Volume",
      sortable: true,
    },
    {
      field: "non_regular_frequency",
      header: "Non Regular Frequency",
      sortable: true,
    },
    { field: "created_date", header: "Created Date", sortable: true },
  ];

  const clearFilter1 = () => {
    initFilters1();
  };

  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value;
    let _filters1 = { ...filters };
    _filters1["global"].value = value;

    setFilters(_filters1);
    setGlobalFilterValue1(value);
  };

  const initFilters1 = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setGlobalFilterValue1("");
  };

  const onFileInputChange = (files) => {
    if (files.length > 0) {
      setIsFileSelected(true);
      setSelectedFile(files[0]);
    }
  };

  const handleSync = async (e) => {
    await ApiService.post("/ringkasan/saham/singkron")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmission = async (e) => {
    const formData = new FormData();

    formData.append("file", selectedFile);

    await ApiService.post("ringkasan/saham", formData)
      .then((response) => {
        if (response.data.status) {
          enqueueSnackbar(response.data.message, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(response.data.message, {
            variant: "success",
          });
        }
      })
      .catch((error) => {
        enqueueSnackbar(error, {
          variant: "error",
        });
      });
    GetRingkasanSaham();
    setIsFileSelected(false);
  };

  const renderHeader1 = () => {
    return (
      <div className="flex justify-content-between">
        {/* <Button label="Import" className="p-button-primary" icon="pi pi-file" /> */}
        <Stack direction="row" spacing={2}>
          <div className="field">
            <label htmlFor="startdate" className="block">
              Filter Tanggal Dari
            </label>
            <br />
            <InputText
              value={startDateFilter}
              id="startdate"
              type={"date"}
              className="block"
            />
          </div>
          <div className="field">
            <label htmlFor="enddate" className="block">
              Filter tanggal Sampai
            </label>
            <br />
            <InputText id="enddate" type={"date"} className="block" />
          </div>
        </Stack>
        <Divider />

        <Stack direction="row" spacing={2} justifyContent="space-between">
          <div>
            <InputText
              type={"file"}
              name="file"
              onChange={(e) => onFileInputChange(e.target.files)}
              placeholder="pilih file"
              className="p-inputtext-sm block mb-2"
            />
            <Button
              disabled={!isFileSelected && true}
              label="Upload"
              onClick={handleSubmission}
              className="p-button-success"
              icon="pi pi-upload"
            />
            <Button
              className="p-button-info"
              label="singkron"
              icon="pi pi-sync"
              onClick={handleSync}
            />
          </div>

          <div>
            <Button
              type="button"
              icon="pi pi-filter-slash"
              label="Clear"
              className="p-button-outlined"
              onClick={clearFilter1}
            />
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                value={globalFilterValue1}
                onChange={onGlobalFilterChange1}
                placeholder="Keyword Search"
              />
            </span>
          </div>
        </Stack>
      </div>
    );
  };

  const header = renderHeader1();

  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );

  function GetRingkasanSaham() {
    ApiService.get("ringkasan/saham")
      .then((response) => {
        if (response.data.status) {
          setDataRingkasan(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    GetRingkasanSaham();
  }, []);

  return (
    <div>
      <PageTitle title="Ringkasan Saham" />
      <PageWrapper
        breadCrumbsItems={[
          { label: "Data Pasar" },
          { label: "Ringkasan" },
          { label: "Ringkasan Saham" },
        ]}
      >
        <DataTable
          value={dataRingkasan}
          showGridlines
          responsiveLayout="scroll"
          //   resizableColumns
          scrollable
          scrollHeight="600px"
          //   columnResizeMode="expand"
          header={header}
          paginator
          filters={filters}
          filterDisplay={"menu"}
          scrollDirection="both"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          paginatorLeft={paginatorLeft}
          paginatorRight={paginatorRight}
          rows={10}
          rowsPerPageOptions={[10, 20, 50]}
        >
          {ColumnDef.map((props, index) => (
            <Column key={index} {...props} style={{ width: "250px" }}></Column>
          ))}
        </DataTable>
      </PageWrapper>
    </div>
  );
};

export default RingkasanSahamPage;
