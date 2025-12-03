# 🚀 CellSync Mobile

Sistema de Gestão para Lojas de Celular - Versão Mobile

## 📱 Download do APK

O APK é gerado automaticamente via GitHub Actions sempre que há um push para o repositório.

### Como Baixar:

1. Acesse a aba **"Actions"** no GitHub
2. Clique no último workflow concluído
3. Baixe o arquivo **"cellsync-mobile-xxx"** nos Artifacts
4. Ou acesse a aba **"Releases"** e baixe o APK mais recente

## 🔧 Build Automático

Este projeto usa GitHub Actions para builds gratuitos e ilimitados!

### Configuração (Primeira Vez):

1. **Criar Token do Expo:**
   ```bash
   npx expo login
   npx expo whoami
   # Acesse: https://expo.dev/accounts/[seu-usuario]/settings/access-tokens
   # Crie um token e copie
   ```

2. **Adicionar Secret no GitHub:**
   - Vá em: Settings → Secrets and variables → Actions
   - Clique em "New repository secret"
   - Nome: `EXPO_TOKEN`
   - Valor: Cole o token do Expo
   - Clique em "Add secret"

3. **Fazer Push:**
   ```bash
   git add .
   git commit -m "Setup GitHub Actions"
   git push
   ```

4. **Aguardar Build:**
   - Acesse a aba "Actions"
   - Aguarde ~15 minutos
   - Baixe o APK quando concluir!

## 🎯 Como Funciona

1. Você faz push para o repositório
2. GitHub Actions inicia automaticamente
3. Instala dependências
4. Configura Android SDK
5. Roda `expo prebuild`
6. Compila o APK com Gradle
7. Disponibiliza o APK para download

## 💰 Custo

**ZERO!** GitHub Actions oferece:
- ✅ 2.000 minutos/mês grátis (conta pública)
- ✅ Builds ilimitados
- ✅ Sem necessidade de EAS Build pago

## 📦 Build Local (Alternativa)

Se preferir buildar localmente:

```bash
# Instalar dependências
npm install

# Gerar pasta android
npx expo prebuild --platform android

# Buildar APK
cd android
./gradlew assembleRelease

# APK estará em:
# android/app/build/outputs/apk/release/app-release.apk
```

## 🐛 Troubleshooting

### Erro: "EXPO_TOKEN not found"
- Certifique-se de adicionar o secret `EXPO_TOKEN` no GitHub

### Erro: "Gradle build failed"
- Verifique se o `app.json` está correto
- Certifique-se que todos os assets existem

### Build demora muito
- Primeira build: ~20 minutos (normal)
- Builds seguintes: ~10-15 minutos

## 📚 Documentação

- [Expo Documentation](https://docs.expo.dev/)
- [GitHub Actions](https://docs.github.com/actions)
- [React Native](https://reactnative.dev/)

## 🆘 Suporte

Se tiver problemas:
1. Verifique os logs do GitHub Actions
2. Consulte a documentação do Expo
3. Abra uma issue no repositório

---

**Desenvolvido com ❤️ para OkCells**
