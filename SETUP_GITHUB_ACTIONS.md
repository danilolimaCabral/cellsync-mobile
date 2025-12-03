# 🚀 Configurar GitHub Actions - Passo a Passo

## ✅ Repositório Criado!

**Link:** https://github.com/danilolimaCabral/cellsync-mobile

---

## 📋 Configuração (5 minutos)

### Passo 1: Obter Token do Expo

1. Acesse: https://expo.dev/login
2. Faça login com sua conta Expo
3. Acesse: https://expo.dev/accounts/cellsync/settings/access-tokens
4. Clique em **"Create Token"**
5. Nome do token: `GitHub Actions`
6. **COPIE O TOKEN** (você não poderá vê-lo novamente!)

### Passo 2: Adicionar Secret no GitHub

1. Acesse: https://github.com/danilolimaCabral/cellsync-mobile/settings/secrets/actions
2. Clique em **"New repository secret"**
3. Preencha:
   - **Name:** `EXPO_TOKEN`
   - **Secret:** Cole o token do Expo que você copiou
4. Clique em **"Add secret"**

### Passo 3: Adicionar o Workflow

Vou adicionar o arquivo do workflow agora. Aguarde...

### Passo 4: Executar o Build

1. Acesse: https://github.com/danilolimaCabral/cellsync-mobile/actions
2. Clique no workflow **"Build Android APK"**
3. Clique em **"Run workflow"** → **"Run workflow"**
4. Aguarde ~15-20 minutos

### Passo 5: Baixar o APK

Quando o build finalizar:

1. Clique no workflow concluído
2. Role até **"Artifacts"**
3. Baixe o arquivo **"cellsync-mobile-xxx"**
4. Extraia o ZIP
5. **Instale o APK no seu celular!** 🎉

---

## 🎯 Builds Futuros

Após a configuração inicial, **toda vez que você fizer push** para o repositório, o GitHub Actions vai:

1. ✅ Buildar automaticamente
2. ✅ Gerar o APK
3. ✅ Disponibilizar para download

**100% GRATUITO e ILIMITADO!** 🚀

---

## 🐛 Problemas?

### "Secret EXPO_TOKEN not found"
- Certifique-se de adicionar o secret com o nome exato: `EXPO_TOKEN`

### "Build failed"
- Verifique os logs do GitHub Actions
- Geralmente é problema de configuração do Expo

### "Não consigo baixar o APK"
- O APK fica em "Artifacts" na página do workflow
- Você precisa estar logado no GitHub para baixar

---

## 💡 Dica Pro

Crie uma **Release** para facilitar o download:

1. Acesse: https://github.com/danilolimaCabral/cellsync-mobile/releases/new
2. Tag: `v1.0.0`
3. Title: `CellSync Mobile v1.0.0`
4. Anexe o APK manualmente
5. Publique!

Agora qualquer pessoa pode baixar direto da página de Releases! 🎉

---

**Pronto! Agora você tem builds gratuitos e ilimitados!** 🚀
