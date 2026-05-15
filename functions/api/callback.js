export async function onRequestGet(context) {
  const { searchParams } = new URL(context.request.url);
  const code = searchParams.get('code');

  if (!code) {
    return new Response('Missing code parameter', { status: 400 });
  }

  const clientId = context.env.GITHUB_CLIENT_ID;
  const clientSecret = context.env.GITHUB_CLIENT_SECRET;

  // Exchange the authorization code for an access token
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    return new Response(`OAuth error: ${tokenData.error_description || tokenData.error}`, { status: 401 });
  }

  const token = tokenData.access_token;
  const provider = 'github';

  // Send the token back to the CMS popup window
  const html = `<!DOCTYPE html>
<html>
<head><title>Authorizing...</title></head>
<body>
<script>
(function() {
  function receiveMessage(e) {
    console.log("receiveMessage", e);
    window.opener.postMessage(
      'authorization:${provider}:success:${JSON.stringify({ token, provider })}',
      e.origin
    );
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:${provider}", "*");
})();
</script>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html;charset=UTF-8' },
  });
}
