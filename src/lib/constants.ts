export const subdomainsThatAreNotAllowed = [
  // since we are using clerk, there are some configuration subdomains that
  // when used, will cause some issues
  "www",
  "api",
  "app",
  "accounts",
  "clerk",
  "clk._domainkey",
  "clk2._domainkey",
  "clkmail",
  "dashboard",
  "signin",
  "signup",
  "signout",
  "auth",
  "login",
  "logout",
  "register",
  "session",
  "sessions",
  "oauth",
  "authorize",
  "callback",
  "ishortn",
  "docs",
  "documentation",
  "support",
  "help",
  "status",
  "blog",
  "trail",
];

export const errorMessages = {
  GENERAL: "Something went wrong",
  UNSAFE: "The URL is not safe to shorten",
  DUPLICATE_ALIAS: "Alias already exists, please enter another one",
  NOT_FOUND: "Link not found",
  UNAUTHORIZED: "You are not authorized to perform this action",
} as const;
