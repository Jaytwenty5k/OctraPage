// Beispiel mit Express.js
app.post('/auth/oauth-login', async (req, res) => {
  const { provider, externalId } = req.body;

  // Prüfen, ob dieser externe Account bereits verknüpft ist
  const connection = await db.query(
    `SELECT users.* FROM user_connections
     JOIN users ON users.id = user_connections.user_id
     WHERE user_connections.provider = $1 AND user_connections.external_id = $2`,
    [provider, externalId]
  );

  if (connection.rowCount === 0) {
    return res.status(403).json({
      error: 'Kein Octra-Account verknüpft. Bitte zuerst im "Verbindungen"-Tab verknüpfen.',
    });
  }

  const user = connection.rows[0];

  // Hier kannst du z.B. eine Session erstellen oder ein JWT ausgeben
  const sessionToken = createSession(user.id); // eigene Funktion
  
  res.json({
    message: 'Login erfolgreich.',
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    token: sessionToken,
  });
});