   import { createClient } from '@supabase/supabase-js';

   // 🚨 請替換成你自己的 Project URL 和 anon key
   const supabaseUrl = 'https://mhbsrmxlklgwvfggqkki.supabase.co/rest/v1/'; // 例如: 'https://xxxxx.supabase.co'
   const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oYnNybXhsa2xnd3ZmZ2dxa2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMjU0OTUsImV4cCI6MjEwNjYwMTQ5NX0.zM5fHHpaSCAi_RZXJeyOX-vehbCYCbvx2GWaXFTvoz0'; // 例如: 'eyJhbGciOi...'

   export const supabase = createClient(supabaseUrl, supabaseAnonKey);