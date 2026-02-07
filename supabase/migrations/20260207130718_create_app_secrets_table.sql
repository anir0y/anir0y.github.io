/*
  # Create app_secrets table

  1. New Tables
    - `app_secrets`
      - `id` (uuid, primary key)
      - `key` (text, unique) - identifier for the secret
      - `value` (text) - the secret value (JSON or plain text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `app_secrets` table
    - NO public policies - only accessible via service role key
    - This table stores sensitive configuration like API credentials

  3. Notes
    - Only the Supabase service role can read/write this table
    - Used by edge functions to retrieve credentials at runtime
*/

CREATE TABLE IF NOT EXISTS app_secrets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE app_secrets ENABLE ROW LEVEL SECURITY;
