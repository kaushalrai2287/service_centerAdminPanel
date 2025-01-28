import React from 'react';

const DownloadSampleFile = () => {
  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = '/SampleExcelCustomerList/Customer_Data.xlsx';  // Adjusted path based on public folder
    link.download = 'Customer_Data.xlsx'; // You can specify a custom download name
    link.click();
  };

  return (
    <div>
      <div className="download_sample_pdf" onClick={downloadFile}>
        Download Sample Excel File 
      </div>
    </div>
  );
};

export default DownloadSampleFile;
