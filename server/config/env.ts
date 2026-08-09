require("dotenv").config();
import { z } from "zod";

const envSchema = z.object({
  SUPABASE_URL: z.url(),
  SUPABASE_SECRET_KEY: z.string().min(1),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const names = result.error.issues.map((issue) => issue.path.join("."));
  const uniqueNames = [...new Set(names)];
  console.error(
    `Missing or invalid environment variables: ${uniqueNames.join(", ")}`,
  );
  process.exit(1);
}

export default result.data;
