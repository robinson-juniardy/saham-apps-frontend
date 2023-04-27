import React from "react";
import { MegaMenu } from "primereact/megamenu";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const MenuItems = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => {
        navigate("/");
      },
    },
    {
      label: "Data Master",
      icon: "pi pi-fw pi-database",
      items: [
        [
          {
            label: "Master",
            items: [
              {
                label: "Master Saham",
                icon: "pi pi-fw pi-building",
              },
              {
                label: "Master Indeks",
                icon: "pi pi-fw pi-sitemap",
              },
            ],
          },
        ],
      ],
    },
    {
      label: "Data Pasar",
      icon: "pi pi-fw pi-briefcase",
      items: [
        [
          {
            label: "Ringkasan",
            icon: "pi pi-fw pi-book",
            items: [
              {
                label: "Ringkasan Saham",
                icon: "pi pi-fw pi-calendar-plus",
                command: () => {
                  navigate("/data-pasar/ringkasan/ringkasan-saham");
                },
              },
              {
                label: "Ringkasan Indeks",
                icon: "pi pi-fw pi-calendar-plus",
                command: () => {
                  navigate("/data-pasar/ringkasan/ringkasan-indeks");
                },
              },
            ],
          },
        ],
        [
          // {
          //   label: "Analisis",
          //   items: [
          //     {
          //       label: "Saham Kuartal",
          //       icon: "pi pi-fw pi-chart-bar",
          //       command: () => {
          //         navigate("/data-pasar/analisis/saham-kuartal");
          //       },
          //     },
          //   ],
          // },
          {
            label: "Reports",
            items: [
              {
                label: "Financial Report",
                icon: "pi pi-fw pi-chart-bar",
                command: () => {
                  navigate("/data-pasar/reports/financial-report");
                },
              },
            ],
          },
        ],
      ],
    },
  ];
  return <MegaMenu model={MenuItems} orientation="horizontal" />;
};

const MainNavigation = () => {
  return (
    <div>
      <NavBar />
    </div>
  );
};

export default MainNavigation;
