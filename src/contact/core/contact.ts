export type ContactData = {
  name: string;
  email: string;
  message: string;
};

const FLOW_URL = '/directus/flows/trigger/2dba2ee5-6e53-4a21-b263-559b6d6abe9c';

export async function submitContactForm(data: ContactData): Promise<void> {
  const response = await fetch(FLOW_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Erreur ${response.status}`);
  }
}
