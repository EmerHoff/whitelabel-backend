// Tipos de usuário
export enum UserType {
  ADMIN = 'ADMIN', // Usuário referente ao sistema de gestão (ADMIN)
  APP = 'APP', // Usuário referente ao aplication (APP)
}

// Status do usuário
export enum UserStatus {
  ACTIVE = 'ACTIVE', // Usuário ativo
  INACTIVE = 'INACTIVE', // Usuário desativo
  DELETED = 'DELETED', // Usuário deletado - Conta apagada
}

// Tipos de Logs de Email
export enum EmailLogType {
  RESET_PASSWORD = 'RESET_PASSWORD', // Log para requisição de alteração de senha
}

/**
 * Função que retorna o email mascarado
 * @param email Email que será mascarado
 * @returns Email mascarado
 */
export function hidingEmail(email: string) {
  if (!email || !email.includes('@')) return '';

  const split = email.split('@');
  return (
    email.substr(0, 3) +
    new Array(split[0].length - 3).fill('*').join('') +
    '@' +
    split[1]
  );
}

/**
 * Função que retorna o telefone mascarado
 * @param telephone Telefone que será mascarado
 * @returns Telefone mascarado
 */
export function hidingTelephone(telephone: string) {
  if (!telephone) return '';

  return telephone.replace(/\d{4}$/, '****');
}
