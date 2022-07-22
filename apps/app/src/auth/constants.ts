export const jwtConstants = {
  secret: '7HwO2pvCUb#app', // TODO: Manter chave protegida
  ignoreExpiration: false, // Indica se o token terá validade
  expiresIn: '7d', // Tempo de validade do token
  onlyOneSession: false, // Indica se é permitida apenas um sessão de login para o usuário
};
