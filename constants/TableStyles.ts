export const myTheme = {
Table: `
  border-collapse: collapse;
  width: 100%;
  border-radius:6px 6px 0 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0); /* Adjust values as needed */
`,
Header: `
  font-size: 12px;
  font-weight: normal;
  color: #f3f3f3;
  background-color: #ffffff;
  padding: 10px;
`,
Footer: `
  font-size: 14px;
  color: #666;
  background-color: #ffffff;
  padding: 10px;
`,
Body: `
  font-size: 14px;
  color: #333;
`,
BaseRow: `
  padding: 10px;
`,
HeaderRow: `
  background-color: #f4f4f4;
  padding:20px;

`,
FooterRow: `
  background-color: #ffffff;
`,
Row: `
  &:nth-child(odd) {
    background-color: #ffffff;
  }

  &:nth-child(even) {
    background-color: #ffffff;
  }
`,
BaseCell: `
  padding: 10px;
  border-bottom: 1px solid #f3f3f3;
`,
HeaderCell: `
  font-weight: medium;
  color: #333;
  padding:20px;

`,
FooterCell: `
  color: #666;
`,
Cell: `
  /* Additional styling for regular cells can be added here */
  padding:20px;
`,
};
