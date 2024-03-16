import axios from 'axios';

const generateQRCode = async (accountNo: string, accountName: string, acqId: number, amount: number, addInfo: string) => {
  try {
    const response = await axios.post(
      'https://api.vietqr.io/v2/generate',
      {
        accountNo,
        accountName,
        acqId,
        amount,
        addInfo,
        format: 'text',
        template: 'compact2',
      },
      {
        headers: {
          'x-client-id': '838965fd-4de5-4c7f-9ff7-c0fef3ef4936',
          'x-api-key': 'ea7d3017-a0d0-4a13-a152-bc3c85e42c2e',
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.data.qrDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    return null;
  }
};

export default generateQRCode;