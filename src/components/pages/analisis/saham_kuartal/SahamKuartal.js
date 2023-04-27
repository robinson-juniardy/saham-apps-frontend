import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import PageTitle from "../../../partials/PageTitle";
import PageWrapper from "../../../partials/PageWrapper";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Stack } from "@mui/material";
import { Divider } from "primereact/divider";
import { useSnackbar } from "notistack";
import { ApiService } from "../../../../utils/service";
import { Button } from "primereact/button";

const SahamKuartal = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [filters, setFilters] = React.useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue1, setGlobalFilterValue1] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState();
  const [isFileSelected, setIsFileSelected] = React.useState(false);
  const [dataSource, setDataSource] = React.useState([]);
  const ColumnDef = [
    {
      field: "kode_saham",
      header: "Kode Saham",
      frozen: true,
      sortable: true,
    },
    {
      field: "nama_perusahaan",
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
    {
      field: "listing_date",
      header: "Listing Date",
      sortable: true,
      frozen: true,
      width: 150,
    },
    {
      field: "quarter",
      header: "Quarter",
      sortable: true,
      frozen: true,
      width: 100,
    },
    {
      field: "ipo_amount",
      header: "IPO Amount",
      sortable: true,
      frozen: true,
      width: 150,
    },
    {
      field: "ipo_price",
      header: "IPO Price",
      sortable: true,
      frozen: true,
      width: 150,
    },
    {
      field: "ipo_shares",
      header: "IPO Shares",
      sortable: true,
      frozen: true,
      width: 150,
    },
    { field: "opp", header: "OpP", sortable: true, frozen: false },
    { field: "np", header: "NP", sortable: true, frozen: false },
    { field: "ceps", header: "CEPS", sortable: true, frozen: false },
    { field: "dpr", header: "DPR", sortable: true, frozen: false },
    { field: "eps", header: "EPS", sortable: true, frozen: false },
    { field: "cepr", header: "CEPR", sortable: true, frozen: false },
    { field: "pbv", header: "P/BV", sortable: true, frozen: false },
    { field: "per", header: "PER", sortable: true, frozen: false },
    { field: "roa", header: "ROA", sortable: true, frozen: false },
    { field: "roe", header: "ROE", sortable: true, frozen: false },
    { field: "der", header: "DER", sortable: true, frozen: false },
    { field: "dar", header: "DAR", sortable: true, frozen: false },
    { field: "opm", header: "OPM", sortable: true, frozen: false },
    { field: "npm", header: "NPM", sortable: true, frozen: false },
    { field: "sales", header: "Sales(IDR)", sortable: true, frozen: false },
    { field: "assets", header: "Asset(IDR)", sortable: true, frozen: false },
    {
      field: "liability",
      header: "Liability(IDR)",
      sortable: true,
      frozen: false,
    },
    {
      field: "equity",
      header: "Equity(IDR)",
      sortable: true,
      frozen: false,
    },
    { field: "opp", header: "OPI(IDR)", sortable: true, frozen: false },
    { field: "np", header: "NP(IDR)", sortable: true, frozen: false },
    { field: "ceps", header: "CEPS(IDR)", sortable: true, frozen: false },
    { field: "eps_idr", header: "EPS(IDR)", sortable: true, frozen: false },
    {
      field: "kapitalisasi",
      header: "Kapitalisasi",
      sortable: true,
      frozen: false,
    },
    {
      field: "daytorupst",
      header: "Daytorupst",
      sortable: true,
      frozen: false,
    },
    { field: "drupst", header: "DRUPST", sortable: true, frozen: false },
    { field: "cd", header: "CD", sortable: true, frozen: false },
    { field: "porto", header: "Porto", sortable: true, frozen: false },
    { field: "group", header: "Group", sortable: true, frozen: false },
    { field: "today", header: "Today", sortable: true, frozen: false },
    { field: "dto_rupst", header: "DtoRUPST", sortable: true, frozen: false },
    { field: "holder", header: "Holder", sortable: true, frozen: false },
    {
      field: "percentage",
      header: "Percentage",
      sortable: true,
      frozen: false,
    },
    {
      field: "equity_mark",
      header: "Equity Mark",
      sortable: true,
      frozen: false,
    },
    { field: "mcap_mark", header: "Mcap Mark", sortable: true, frozen: false },
    { field: "pbv", header: "pbv", sortable: true, frozen: false },
    { field: "mcapcopy", header: "mcapcopy", sortable: true, frozen: false },
    {
      field: "potential_upside",
      header: "Potential Upside",
      sortable: true,
      frozen: false,
    },

    // { field: "created_date", header: "Created Date", sortable: true },
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

  const handleSubmission = async (e) => {
    const formData = new FormData();

    formData.append("file", selectedFile);

    await ApiService.post("master/saham/kuartal/upload", formData)
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
    GetDataSource();
    setIsFileSelected(false);
  };

  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );

  const renderHeader1 = () => {
    return (
      <div className="flex justify-content-between">
        {/* <Button label="Import" className="p-button-primary" icon="pi pi-file" /> */}
        {/* <Stack direction="row" spacing={2}>
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
        <Divider /> */}

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
              // disabled={!isFileSelected && true}
              label="Upload"
              onClick={handleSubmission}
              className="p-button-success"
              icon="pi pi-upload"
            />
            {/* <Button
              className="p-button-info"
              label="singkron"
              icon="pi pi-sync"
              onClick={handleSync}
            /> */}
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

  function GetDataSource() {
    ApiService.get("master/saham/kuartal")
      .then((response) => {
        if (response.data.status) {
          setDataSource(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    GetDataSource();
  }, []);

  return (
    <div>
      <PageTitle title="Saham Kuartal" />
      <PageWrapper
        breadCrumbsItems={[
          { label: "Data Pasar" },
          { label: "Analisa" },
          { label: "Saham Kuartal" },
        ]}
      >
        <DataTable
          size="normal"
          value={dataSource}
          selectionMode="single"
          showGridlines
          responsiveLayout="scroll"
          scrollable
          scrollHeight="600px"
          header={header}
          // resizableColumns
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
          {ColumnDef.map((props) => (
            <Column
              key={props.field}
              {...props}
              style={{ width: props.width ? props.width : "250px" }}
            ></Column>
          ))}
        </DataTable>
      </PageWrapper>
    </div>
  );
};

export default SahamKuartal;
