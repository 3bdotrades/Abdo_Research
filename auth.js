(function () {
  "use strict";

  var config = window.ABDO_AUTH_CONFIG || {};
  var placeholderUrl = !config.supabaseUrl || config.supabaseUrl.indexOf("YOUR_PROJECT_REF") !== -1;
  var placeholderKey = !config.supabaseAnonKey || config.supabaseAnonKey.indexOf("YOUR_SUPABASE_ANON_KEY") !== -1;
  var configured = Boolean(window.supabase && !placeholderUrl && !placeholderKey);
  var client = null;

  function dashboardUrl() {
    return new URL(config.dashboardPath || "/dashboard", window.location.origin).toString();
  }

  function loginUrl(message) {
    var url = new URL("/", window.location.origin);
    url.searchParams.set("auth", "login");
    if (message) url.searchParams.set("auth_message", message);
    return url.toString();
  }

  function getClient() {
    if (!configured) return null;
    if (!client) {
      client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
        auth: {
          autoRefreshToken: true,
          detectSessionInUrl: true,
          persistSession: true
        }
      });
    }
    return client;
  }

  function isConfigured() {
    return configured;
  }

  async function signUp(payload) {
    var supabaseClient = getClient();
    if (!supabaseClient) throw new Error("Supabase is not configured yet.");
    return supabaseClient.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        emailRedirectTo: dashboardUrl(),
        data: {
          full_name: payload.name || ""
        }
      }
    });
  }

  async function signIn(payload) {
    var supabaseClient = getClient();
    if (!supabaseClient) throw new Error("Supabase is not configured yet.");
    return supabaseClient.auth.signInWithPassword({
      email: payload.email,
      password: payload.password
    });
  }

  async function resendSignup(payload) {
    var supabaseClient = getClient();
    if (!supabaseClient) throw new Error("Supabase is not configured yet.");
    return supabaseClient.auth.resend({
      type: "signup",
      email: payload.email,
      options: {
        emailRedirectTo: dashboardUrl()
      }
    });
  }

  async function signOut() {
    var supabaseClient = getClient();
    if (!supabaseClient) return;
    await supabaseClient.auth.signOut();
    window.location.href = "/";
  }

  async function getSession() {
    var supabaseClient = getClient();
    if (!supabaseClient) return null;
    var result = await supabaseClient.auth.getSession();
    return result.data && result.data.session ? result.data.session : null;
  }

  async function requireSession() {
    if (!isConfigured()) {
      window.location.replace(loginUrl("config"));
      return null;
    }

    var session = await getSession();
    if (!session) {
      window.location.replace(loginUrl("signin"));
      return null;
    }

    return session;
  }

  window.AbdoAuth = {
    dashboardUrl: dashboardUrl,
    getClient: getClient,
    getSession: getSession,
    isConfigured: isConfigured,
    resendSignup: resendSignup,
    requireSession: requireSession,
    signIn: signIn,
    signOut: signOut,
    signUp: signUp
  };
})();
