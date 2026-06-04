const encoder = new TextEncoder();

function base64url(arr: Uint8Array): string {
  // Convert Uint8Array to binary string
  let bin = "";
  for (let i = 0; i < arr.byteLength; i++) {
    bin += String.fromCharCode(arr[i]);
  }
  return btoa(bin)
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64urlDecode(str: string): Uint8Array {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  const raw = atob(str);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    arr[i] = raw.charCodeAt(i);
  }
  return arr;
}

const secret = process.env.JWT_SECRET || "college_compass_jwt_secret_signing_key_default";

async function getCryptoKey() {
  const secretKeyData = encoder.encode(secret);
  return crypto.subtle.importKey(
    "raw",
    secretKeyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signJWT(payload: any, expiresInSeconds: number = 86400): Promise<string> {
  const key = await getCryptoKey();
  
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + expiresInSeconds;
  
  const tokenPayload = {
    ...payload,
    iat,
    exp,
  };
  
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = base64url(encoder.encode(JSON.stringify(header)));
  const encodedPayload = base64url(encoder.encode(JSON.stringify(tokenPayload)));
  
  const tokenData = `${encodedHeader}.${encodedPayload}`;
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(tokenData)
  );
  const encodedSignature = base64url(new Uint8Array(signature));
  
  return `${tokenData}.${encodedSignature}`;
}

export async function verifyJWT(token: string): Promise<any | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    
    const [headerStr, payloadStr, signatureStr] = parts;
    const key = await getCryptoKey();
    const tokenData = `${headerStr}.${payloadStr}`;
    const sigBytes = base64urlDecode(signatureStr);
    
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes as any,
      encoder.encode(tokenData)
    );
    
    if (!isValid) return null;
    
    const decodedPayload = new TextDecoder().decode(base64urlDecode(payloadStr));
    const payload = JSON.parse(decodedPayload);
    
    if (payload.exp && Math.floor(Date.now() / 1000) >= payload.exp) {
      return null; // Expired
    }
    
    return payload;
  } catch (error) {
    return null;
  }
}
