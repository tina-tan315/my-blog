// connection.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://rbsnomrnrwhihkfbmdye.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJic25vbXJucndoaWhrZmJtZHllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyOTM4MDgsImV4cCI6MjA2NTg2OTgwOH0.56I3rZapkynA_tvLC0Hl2mOcNKVfak1v7vY7A8DBJB0'

export const supabase = createClient(supabaseUrl, supabaseKey)