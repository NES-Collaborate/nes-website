# Guia de Instalação e Execução da Nossa Aplicação

Este guia fornece instruções passo a passo sobre como configurar e executar tanto o backend quanto o frontend da nossa aplicação. Certifiquemo-nos de seguir cada etapa cuidadosamente, utilizando dois terminais separados para o backend e o frontend.

## Pré-requisitos

Antes de começarmos, precisamos ter instalado em nosso sistema:

- Python 3.12
- Node 21 ou superior

## Configuração do Ambiente

A nossa aplicação é dividida em duas partes principais: o backend, que é desenvolvido em Python, e o frontend, que utiliza Node. Vamos precisar de dois terminais separados para executar cada parte.

### Backend

No primeiro terminal, vamos configurar e iniciar o backend seguindo estes passos:

1. **Criação e ativação de um ambiente virtual (opcional):**

Para evitar conflitos entre as dependências do projeto e as do sistema, é recomendável criar um ambiente virtual. Podemos fazer isso com os comandos:

```bash
python3 -m venv venv
source venv/bin/activate
```

2. **Instalação das dependências do backend:**

Com o ambiente virtual ativado, vamos instalar as dependências necessárias para o backend:
```bash
cd backend
python3 -m pip install -r requirements.txt
```

3. **Execução do backend:**

Após instalar as dependências, podemos iniciar o backend com:

```bash
make run
```

Vamos manter este terminal aberto para o backend continuar rodando.

### Frontend
No segundo terminal, vamos configurar e iniciar o frontend com os seguintes passos:

1. **Instalação das dependências do frontend:**

Primeiro, vamos instalar as dependências necessárias para o frontend:

```bash
cd frontend
npm install
```

2. **Construção e inicialização do frontend:**

Em seguida, vamos construir e iniciar o frontend:

```bash
npm run build
npm run start
```
Assim como o backend, vamos manter este terminal aberto para o frontend continuar rodando.

