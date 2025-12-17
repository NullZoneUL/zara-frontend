const getRequest = async (url: URL) => {
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

// Default phone list request function
export const requestPhoneList = async (
  limit?: number,
  offset?: number,
  search?: string,
): Promise<PhoneList> => {
  const url = new URL(import.meta.env.VITE_API_URL);

  limit && url.searchParams.set('limit', limit.toString());
  offset && url.searchParams.set('offset', offset.toString());
  search && url.searchParams.set('search', search);

  return getRequest(url);
};

// Phone info request
export const requestPhoneInfo = async (id: number): Promise<PhoneItem> => {
  const url = new URL(`${import.meta.env.VITE_API_URL}/${id}`);

  return getRequest(url);
};
