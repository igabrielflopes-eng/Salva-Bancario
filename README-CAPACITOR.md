# Salva Bancário - Guia de Deploy Mobile (Capacitor)

## Visão Geral
Este guia detalha como transformar o **Salva Bancário** em um aplicativo nativo para Android e iOS usando Capacitor. A integração está completa e pronta para publicação nas lojas de aplicativos.

## 📱 Recursos Nativos Implementados

### Plugins Capacitor Ativos
- **@capacitor/haptics** - Feedback tátil ao salvar simulações
- **@capacitor/share** - Compartilhamento nativo de simulações
- **@capacitor/status-bar** - Controle da barra de status
- **@capacitor/splash-screen** - Tela de abertura personalizada

### Experiência Mobile Aprimorada
✅ **Haptic Feedback**: Vibração suave ao salvar simulações para confirmação sensorial  
✅ **Compartilhamento Nativo**: Usa o menu de compartilhamento do sistema operacional (WhatsApp, email, etc.)  
✅ **Offline-First**: Funciona completamente sem internet após instalação  
✅ **PWA + Nativo**: Mantém compatibilidade web enquanto adiciona recursos móveis  
✅ **Tema Adaptativo**: Status bar se adapta automaticamente ao tema escuro/claro  

---

## 🛠️ Pré-requisitos

### Para Android
- **Android Studio** (latest stable version)
- **Java Development Kit (JDK)** 17 ou superior
- **Android SDK** (API Level 24 ou superior)
- **Gradle** (incluído no Android Studio)

### Para iOS (somente macOS)
- **Xcode** 14+ (via Mac App Store)
- **CocoaPods** (`sudo gem install cocoapods`)
- **Conta Apple Developer** ($99/ano para publicação)

---

## 📦 Estrutura do Projeto

```
salva-bancario/
├── android/                    # Projeto Android nativo (gerado)
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── assets/public/  # Assets web compilados
│   │   │   ├── res/            # Recursos Android (ícones, splash)
│   │   │   └── AndroidManifest.xml
│   │   └── build.gradle
│   └── build.gradle
├── ios/                        # Projeto iOS nativo (a ser gerado)
│   ├── App/
│   │   ├── App/
│   │   │   ├── Assets.xcassets
│   │   │   └── Info.plist
│   │   └── App.xcodeproj
├── dist/                       # Build web (Vite)
├── public/
│   ├── manifest.json           # Manifesto PWA
│   ├── icon-192x192.png        # Ícone 192x192
│   ├── icon-512x512.png        # Ícone 512x512
│   └── service-worker.js
├── capacitor.config.ts         # Configuração Capacitor
├── vite.config.ts              # Build otimizado para Capacitor
└── index.tsx                   # App React com plugins nativos
```

---

## 🚀 Guia de Deploy - Android

### Passo 1: Configurar Identidade do App
Edite `capacitor.config.ts` com suas informações:

```typescript
const config: CapacitorConfig = {
  appId: 'com.seubanco.salvabancario',  // Mude para seu domínio reverso
  appName: 'Salva Bancário',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#2563eb",
      showSpinner: false
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: "#2563eb"
    }
  }
};
```

### Passo 2: Build e Sincronização
```bash
npm run build
npx cap sync android
```

### Passo 3: Abrir no Android Studio
```bash
npx cap open android
```

### Passo 4: Configurar Assinatura do App
No Android Studio:

1. **Build > Generate Signed Bundle/APK**
2. **Escolha "Android App Bundle (.aab)"**
3. **Create new keystore** (primeira vez):
   - Key store path: `/caminho/seguro/salva-bancario.jks`
   - Password: (escolha uma senha forte)
   - Alias: `salva-bancario-release`
   - Validity: 25 anos
   - Certificate info: Preencha seus dados

4. **Guarde o keystore em local seguro** (você precisará dele para atualizações!)

### Passo 5: Gerar .aab para Google Play
1. **Build > Generate Signed Bundle/APK**
2. **Escolha "Android App Bundle"**
3. **Selecione seu keystore**
4. **Build variant: release**
5. **Aguarde compilação**
6. **Arquivo gerado em**: `android/app/build/outputs/bundle/release/app-release.aab`

### Passo 6: Publicar no Google Play
1. Acesse [Google Play Console](https://play.google.com/console)
2. Crie um novo app (taxa única de $25)
3. Preencha informações obrigatórias:
   - Nome do app: **Salva Bancário**
   - Descrição curta: _"Calculadora financeira completa para brasileiros"_
   - Descrição completa: (use o README.md como referência)
   - Categoria: **Finanças**
   - Screenshots: (mínimo 2, use Capacitor Screenshot API ou emulador)
   - Ícone: `public/icon-512x512.png`
4. Upload do .aab em **Produção > Criar nova versão**
5. Preencha formulários de privacidade e conteúdo
6. Envie para revisão (7-14 dias)

---

## 🍎 Guia de Deploy - iOS (macOS obrigatório)

### Passo 1: Adicionar Plataforma iOS
```bash
npx cap add ios
npx cap sync ios
```

### Passo 2: Instalar Dependências CocoaPods
```bash
cd ios/App
pod install
cd ../..
```

### Passo 3: Abrir no Xcode
```bash
npx cap open ios
```

### Passo 4: Configurar Identidade e Assinatura
No Xcode:

1. **Selecione "App" no Project Navigator**
2. **Aba "Signing & Capabilities"**
3. **Team**: Selecione seu Apple Developer Team
4. **Bundle Identifier**: `com.seubanco.salvabancario` (mesmo do capacitor.config.ts)
5. **Automatically manage signing**: Ativado

### Passo 5: Configurar Ícones e Splash Screen
1. **Assets.xcassets > AppIcon**
   - Crie versão 1024x1024 do ícone atual (redimensione `public/icon-512x512.png`)
   - Xcode gerará automaticamente todos os tamanhos

2. **LaunchScreen.storyboard**
   - Personalize cores (use #2563eb - azul do app)
   - Adicione logo se desejar

### Passo 6: Build para Dispositivo Real
1. **Conecte iPhone via USB**
2. **Selecione dispositivo no topo do Xcode**
3. **Product > Run** (⌘R)
4. **Confie no desenvolvedor**: Ajustes > Geral > VPN e Gerenciamento

### Passo 7: Arquivar para App Store
1. **Product > Archive**
2. **Window > Organizer**
3. **Selecione o archive > Distribute App**
4. **App Store Connect**
5. **Upload** (aguarde processamento ~10 min)

### Passo 8: Publicar na App Store
1. Acesse [App Store Connect](https://appstoreconnect.apple.com)
2. Crie novo app:
   - Nome: **Salva Bancário**
   - Bundle ID: `com.seubanco.salvabancario`
   - SKU: `salva-bancario-2025`
3. Preencha metadados:
   - Screenshots (obrigatório 3 tamanhos de tela)
   - Descrição (máx 4000 caracteres)
   - Keywords: "calculadora,financeira,investimento,empréstimo,CDI,SELIC"
   - Categoria primária: **Finanças**
   - Categoria secundária: **Produtividade**
4. **Pricing**: Gratuito (ou defina preço)
5. **Enviar para revisão** (3-5 dias úteis)

---

## 🔄 Workflow de Atualização

### Para Qualquer Plataforma
```bash
# 1. Faça mudanças no código React (index.tsx)
# 2. Build do projeto web
npm run build

# 3. Sincronize com plataformas nativas
npx cap sync

# 4. Atualize versões em capacitor.config.ts
# version: "1.0.1" → "1.0.2"

# 5. Android: Abra Android Studio e incremente versionCode
npx cap open android
# Em build.gradle (Module: app):
# versionCode 2
# versionName "1.0.2"

# 6. iOS: Abra Xcode e incremente versões
npx cap open ios
# Em Xcode > General:
# Version: 1.0.2
# Build: 2

# 7. Gere novo bundle/archive e faça upload
```

---

## 🎨 Customização de Ícones e Splash

### Gerando Todos os Tamanhos de Ícones
Use ferramentas online ou CLI:

**Option 1: PWA Asset Generator (recomendado)**
```bash
npx @capacitor/assets generate --iconBackgroundColor '#2563eb' --iconBackgroundColorDark '#1e40af' --splashBackgroundColor '#2563eb' --splashBackgroundColorDark '#1e40af'
```

**Option 2: Manual**
- Crie ícone 1024x1024 PNG (design limpo, sem transparência)
- Use [App Icon Generator](https://appicon.co) para gerar todos os tamanhos
- Substitua em `android/app/src/main/res/` e `ios/App/App/Assets.xcassets/`

### Customizando Splash Screen
Edite `capacitor.config.ts`:
```typescript
plugins: {
  SplashScreen: {
    launchShowDuration: 3000,
    backgroundColor: "#2563eb",  // Azul do app
    androidScaleType: "CENTER_CROP",
    showSpinner: true,
    spinnerColor: "#ffffff"
  }
}
```

---

## 🐛 Troubleshooting

### Android: "Keystore was tampered with"
**Problema**: Senha incorreta ou keystore corrompido  
**Solução**: Verifique senha ou gere novo keystore (perderá capacidade de atualizar app existente)

### Android: "Unoptimized APK"
**Problema**: Google Play requer .aab (App Bundle), não .apk  
**Solução**: Use **Android App Bundle** no Build > Generate Signed Bundle

### iOS: "Provisioning Profile doesn't match"
**Problema**: Bundle ID diferente entre Xcode e capacitor.config.ts  
**Solução**: Sincronize Bundle IDs, delete DerivedData (`rm -rf ~/Library/Developer/Xcode/DerivedData`)

### iOS: "Unable to install App"
**Problema**: Dispositivo não confia no desenvolvedor  
**Solução**: Ajustes > Geral > VPN e Gerenciamento > Confiar em "[seu email]"

### Build lento no Replit
**Problema**: `npm run build` demora >2 min  
**Solução**: Normal para bundle 1MB+. Use cache local: `npm run build -- --mode production`

### Capacitor Sync falha
**Problema**: `Error: No platforms found`  
**Solução**: 
```bash
npx cap add android  # ou ios
npx cap sync
```

---

## 📊 Estimativa de Tamanho do App

### Android (.aab)
- **App Bundle**: ~8-12 MB
- **Download usuário**: ~6-9 MB (Google otimiza por dispositivo)
- **Instalado**: ~15-20 MB

### iOS (.ipa)
- **Archive**: ~10-15 MB
- **Download usuário**: ~8-12 MB
- **Instalado**: ~20-25 MB

---

## 🎯 Roadmap de Funcionalidades Nativas

### Fase 1 (Implementado) ✅
- [x] Haptic feedback
- [x] Share nativo
- [x] Status bar adaptativa
- [x] Splash screen

### Fase 2 (Próximos passos)
- [ ] Push notifications (simulações agendadas)
- [ ] Biometric authentication (proteger histórico)
- [ ] File system (exportar PDFs diretamente)
- [ ] Camera (scan de documentos financeiros)
- [ ] Local notifications (lembretes de vencimento)

### Fase 3 (Monetização)
- [ ] In-App Purchases (recursos premium)
- [ ] AdMob integration (versão gratuita)
- [ ] Analytics (Firebase/Google Analytics)
- [ ] Crash reporting (Sentry/Firebase Crashlytics)

---

## 📚 Recursos Úteis

- [Documentação Capacitor](https://capacitorjs.com/docs)
- [Plugin APIs](https://capacitorjs.com/docs/apis)
- [Android Publishing Guide](https://developer.android.com/studio/publish)
- [iOS Publishing Guide](https://developer.apple.com/app-store/submissions/)
- [Capacitor Assets CLI](https://github.com/ionic-team/capacitor-assets)
- [App Store Screenshots Sizes](https://help.apple.com/app-store-connect/#/devd274dd925)

---

## 💡 Dicas Importantes

1. **Guarde o Keystore**: Sem ele, você não poderá atualizar o app Android
2. **Use Git**: Commit antes de mudanças grandes no código nativo
3. **Teste em Dispositivos Reais**: Emuladores não mostram todos os recursos (haptics, compartilhamento)
4. **Incremente Versões**: Sempre aumente versionCode (Android) e Build (iOS) antes de publicar atualizações
5. **Respeite Políticas**: Leia guidelines da Google Play e App Store (rejeição é comum em primeira tentativa)

---

## 🎉 Conclusão

Seu aplicativo **Salva Bancário** está pronto para conquistar usuários mobile! Com esta integração Capacitor, você mantém 100% do código React enquanto oferece experiência nativa de primeira classe.

**Próximos passos sugeridos:**
1. Gerar ícones profissionais (contratar designer ou usar IA)
2. Criar screenshots marketing (use Figma + mockups de celulares)
3. Escrever descrição otimizada para ASO (App Store Optimization)
4. Configurar analytics para entender comportamento dos usuários
5. Implementar sistema de feedback in-app

---

**Desenvolvido com ❤️ usando React + Vite + Capacitor**  
**Última atualização**: 20 de novembro de 2025
