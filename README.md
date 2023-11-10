# App

GymPass style app

## Rfs (Requisitos funcionais)

  [x] - Deve ser possível se cadastrar
  [ ] - Deve ser possível se autenticar
  [ ] - Deve ser possível obter o perfil de um usuário logado
  [ ] - Deve ser possível obter o número de check-ins realizados pelo usuário logado
  [ ] - Deve ser possível o usuário obter seu histórico de check-ins
  [ ] - Deve ser possível o usuário buscar academias próximas
  [ ] - Deve ser possível o usuário buscar uma academia pelo nome
  [ ] - Deve ser possível o usuário realizar check-in em uma academia
  [ ] - Deve ser possível validar o check-in de um usuário
  [ ] - Deve ser possível cadastrar uma academia  

# Rns (Regras de negocio)
  
  [x] - O usuario não deve poder se cadastrar com um email duplicado 
  [ ] - O usuario não pode fazer mais de um check-in no mesmo dia
  [ ] - O usuario não pode fazer check-in se não estiver perto (100m) da academia 
  [ ] - O check-in so pode ser validade até 20 minutos apos criado
  [ ] - O check-in so pode ser validado por Administradores
  [ ] - A academia so pode ser cadastrada por Administradores
  
## RNFs (Requisitos não funcionais)

  [x] - A senha do usuario precisa ser criptografada
  [ ] - Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
  [ ] - Todas listas de dados precisam estar paginadas com 20 items por pagina
  [ ] - O usuario deve ser identificado por um jwt (JSON Web Token)