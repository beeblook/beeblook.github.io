export interface Fakultet {
  name: string;
  link: string;
  kafedry: [
    {
      name: string;
      link: string;
      kursy: [
        {
          name: string;
          grupy: [
            {
              name: string;
            }
          ];
        }
      ];
    }
  ];
}
