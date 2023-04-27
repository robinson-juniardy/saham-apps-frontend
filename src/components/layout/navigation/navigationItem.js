export const MenuItems = [
  {
    label: "Home",
    icon: "pi pi-fw pi-home",
    command: () => {
      window.location.href = "/";
    },
  },
  {
    label: "Pages",
    icon: "pi pi-fw pi-file",
    items: [
      [
        {
          label: "Common Page",
          items: [
            {
              label: "About",
              command: () => {
                window.location.href = "/about";
              },
            },
            {
              label: "Contacts",
            },
          ],
        },
      ],
      [
        {
          label: "Master 2",
          items: [
            {
              label: "Master 2.1",
            },
            {
              label: "Master 2.2",
            },
          ],
        },
      ],
    ],
  },
];
