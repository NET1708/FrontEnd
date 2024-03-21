const generateQRCode = async (accountNo: string, accountName: string, acqId: number, amount: number, addInfo: string) => {
  try {
    const response = await fetch('https://api.vietqr.io/v2/generate', {
      method: 'POST',
      headers: {
        'x-client-id': '838965fd-4de5-4c7f-9ff7-c0fef3ef4936',
        'x-api-key': 'ea7d3017-a0d0-4a13-a152-bc3c85e42c2e',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountNo,
        accountName,
        acqId,
        amount,
        addInfo,
        format: 'text',
        template: 'compact2',
      }),
    });

    const responseData = await response.json();
    return responseData.data.qrDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    return null;
  }
};

export default generateQRCode;