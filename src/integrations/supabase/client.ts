
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://pfkjhyhxtvwtdijhoaxj.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBma2poeWh4dHZ3dGRpamhvYXhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MTQ0NDksImV4cCI6MjA0ODE5MDQ0OX0._HeY4NIrYErFHes9k9-O3Y-j2LyI3JAcy2-8wDGnjOk"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
