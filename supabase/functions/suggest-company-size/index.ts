
import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { location } = await req.json()
    
    // Simple logic to suggest company size based on location
    // This could be enhanced with real AI/ML models or external APIs
    let suggestion = '1-50 people'
    
    const majorCities = ['new york', 'london', 'tokyo', 'paris', 'singapore']
    if (majorCities.some(city => location.toLowerCase().includes(city))) {
      suggestion = '51-200 people'
    }

    return new Response(
      JSON.stringify({ suggestion }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
