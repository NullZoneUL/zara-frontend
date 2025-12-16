// Default phone list request function
export const requestPhoneList = async (
  limit: number,
  offset: number,
  search?: string,
): Promise<PhoneList> => {
  const url = new URL(import.meta.env.VITE_API_URL);

  url.searchParams.set('limit', limit.toString());
  url.searchParams.set('offset', offset.toString());

  if (search) {
    url.searchParams.set('search', search);
  }

  const response = await fetch(url.toString(), {
    headers: {
      'x-api-key': import.meta.env.VITE_X_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error('Error fetching products');
  }

  return response.json();
};
