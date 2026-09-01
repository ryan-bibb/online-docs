-- Enable Row Level Security on every table in the public schema.
-- No policies are defined, which is a default-deny: it blocks access via
-- Supabase's auto-generated PostgREST API (which connects as anon/authenticated),
-- while leaving this app's own Prisma connection (the postgres role, which
-- bypasses RLS as the table owner) completely unaffected.
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Document" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Invite" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "_prisma_migrations" ENABLE ROW LEVEL SECURITY;
