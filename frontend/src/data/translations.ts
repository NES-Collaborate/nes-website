import { ExpenseLogType } from "@/types/finance"

/**
 * Translation for expense log types that will be used in API's queries.
 */
export const EXPENSE_LOG_QUERY_TYPES: Record<ExpenseLogType | "all", string> = {
  Deposit: "Entrada",
  Removal: "Saída",
  all: "Todos",
}

/**
 * Friendly Names for Breadcrumb Items
 */
export const BREADCRUMB_NAMES: Record<string, string> = {
  app: "Home",
  classrooms: "Turmas",
  admin: "Administração",
  lp: "Landing Page",
  notices: "Notícias",
  bens: "Bens",
  nes: "NES",
  auth: "Autenticação",
  login: "Login",
  about: "Sobre",
  "learn-more": "Saiba mais",
  contact: "Contatos",
  material: "Material Gratuito",
  subscription: "Processo Seletivo",
  schedule: "Cronograma",
  form: "Inscrição",
  results: "Resultados",
  program: "Ementa",
  users: "Usuários",
  "success-cases": "Casos de Sucesso",
  curriculum: "Grade Curricular",
  profile: "Perfil",
  classroom: "Turma",
  donate: "Doação",
  finance: "Financeiro",
  scholarshipValue: "Bolsas",
}

/**
 * Translatiosns of the `PostType`s
 */
export const POST_TYPE_TRANSLATIONS = {
  Notice: "Aviso",
  ClassMaterial: "Material de Aula",
  Test: "Prova",
  Activity: "Atividade",
}
