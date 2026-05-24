// netlify/functions/claude.js
// Proxy seguro para la API de Anthropic
// La API key vive aquí en el servidor, nunca en el navegador

exports.handler = async (event) => {
  // Solo aceptar POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Cabeceras CORS para que la web pueda llamar a esta función
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body = JSON.parse(event.body);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY, // Variable de entorno en Netlify
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: body.model || 'claude-sonnet-4-20250514',
        max_tokens: body.max_tokens || 800,
        system: body.system,
        messages: body.messages,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: data.error.message }),
      };
    }

    // Devuelve el texto directamente para simplificar
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ text: data.content[0].text }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
