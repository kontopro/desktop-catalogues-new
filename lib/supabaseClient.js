import { createClient } from '@supabase/supabase-js'

// export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
export const supabase = createClient('https://ciabgxviqupfpohvtnml.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpYWJneHZpcXVwZnBvaHZ0bm1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkyMjM2NTIsImV4cCI6MTk5NDc5OTY1Mn0.aB-PdjkgPUywqMWrqHFu7ntXzozR6_hPM49O4qCxm6U')