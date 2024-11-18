const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos da API');
    }
    return response.json();
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};
