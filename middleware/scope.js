function requireScope(scope) {
  return (req, res, next) => {
    const scopes = req.apiKey.scopes;
    if (!scopes.includes(scope)) {
      return res.status(403).json({ error: `Missing required scope: ${scope}` });
    }
    next();
  };
}

module.exports = { requireScope };