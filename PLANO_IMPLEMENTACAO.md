# RioClima Monitor — Status e Resumo do Projeto

## Onde está o plano salvo?
O plano de implementação original da sessão está salvo como artefato em:
`C:\Users\lucas\.gemini\antigravity-cli\brain\0440a8c3-d879-43db-a596-ce44ba2ece3c\plano-rioclima-monitor.md`

## O site já está pronto?
**Sim! O site foi completamente codificado, montado, testado e validado.**

### Recursos implementados:
1. **Landing Page Institucional** (`/`):
   - Hero Section, Seção Sobre o Projeto RioClima e Cards de Funcionalidades.
   - Design moderno dark navy (`#0a0f1a`) com destaques em lime-green (`#a3e635`).
2. **Dashboard Interativo** (`/dashboard`):
   - **Cards de Métricas:** Temperatura (°C), Umidade (%) e Poluição do Ar (%) com variação em relação à medição anterior.
   - **Gráficos em Área (Time Series):** Histórico temporal com gradiente suave.
   - **Gauges (Mostradores semicirculares):** Indicador visual com zonas de alerta para qualidade do ar (0–100%).
   - **Resumo Estatístico:** Tabela dinâmica com mínimas, máximas e médias calculadas.
   - **Status do Sensor:** Indicador pulsante em tempo real (Online / Atraso / Offline / Modo Demo).
   - **Exportação CSV:** Botão para download direto das leituras em planilha.
3. **Painel de Configuração Firebase**:
   - Drawer lateral para inserir `apiKey`, `databaseURL`, `projectId` e caminho (`/leituras`).
   - Salvo no `localStorage` do navegador.
   - Modo Demonstração (dados simulados caso o ESP-32 esteja desligado na hora da apresentação).

## Como rodar o projeto localmente:
Abra o terminal na pasta do projeto e execute:
```bash
npm run dev
```
O site estará acessível em: `http://localhost:5173`
