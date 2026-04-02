import { Client } from '@hubspot/api-client';

const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_API_KEY });

interface Contact {
  id?: string;
  email: string;
  firstname?: string;
  lastname?: string;
}

interface Deal {
  id?: string;
  dealname: string;
  amount?: string;
  dealstage?: string;
}

export async function createContact(contactData: Contact): Promise<Contact | null> {
  try {
    const response = await hubspotClient.crm.contacts.basicApi.create({
      properties: contactData
    });
    return response.properties as Contact;
  } catch (error) {
    console.error('Error creating HubSpot contact:', error);
    return null;
  }
}

export async function createDeal(dealData: Deal): Promise<Deal | null> {
  try {
    const response = await hubspotClient.crm.deals.basicApi.create({
      properties: dealData
    });
    return response.properties as Deal;
  } catch (error) {
    console.error('Error creating HubSpot deal:', error);
    return null;
  }
}