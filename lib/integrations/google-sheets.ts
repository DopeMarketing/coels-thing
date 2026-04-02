import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS!),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

interface SheetData {
  spreadsheetId: string;
  range: string;
  values: string[][];
}

interface ReadData {
  spreadsheetId: string;
  range: string;
}

export async function appendToSheet(data: SheetData): Promise<boolean> {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: data.spreadsheetId,
      range: data.range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: data.values,
      },
    });
    return true;
  } catch (error) {
    console.error('Error appending to Google Sheet:', error);
    return false;
  }
}

export async function readFromSheet(data: ReadData): Promise<string[][] | null> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: data.spreadsheetId,
      range: data.range,
    });
    return response.data.values || [];
  } catch (error) {
    console.error('Error reading from Google Sheet:', error);
    return null;
  }
}