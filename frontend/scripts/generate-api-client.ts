import { generate } from "openapi-typescript-codegen";

async function generateApiClient() {
  try {
    await generate({
      input: "http://localhost:3001/api-json",
      output: "./src/api/generated",
      useUnionTypes: false,
      exportSchemas: true,
      indent: "2",
      clientName: "ApiClient",
      httpClient: "fetch",
    });
    console.log("✅ Successfully generated API client");
  } catch (error) {
    console.error("❌ Failed to generate API client:", error);
    process.exit(1);
  }
}

generateApiClient();
